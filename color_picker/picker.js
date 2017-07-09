var picker_active_element = null;
var picker_type_style = null;
var picker_element_background = null;


function toR(h) {
  return parseInt((cutHex(h)).substring(0, 2), 16)
}

function toG(h) {
  return parseInt((cutHex(h)).substring(2, 4), 16)
}

function toB(h) {
  return parseInt((cutHex(h)).substring(4, 6), 16)
}

function cutHex(h) {
  return (h.charAt(0) == "#") ? h.substring(1, 7) : h
}

function changecolor() {
  var h = document.getElementById('h').value;
  document.getElementById('r').value = toR(h);
  document.getElementById('g').value = toG(h);
  document.getElementById('b').value = toB(h);
}

//RGB to HEX
function toHEX(r, g, b) {
  return '#' + ((b | g << 8 | r << 16) | 1 << 24).toString(16).slice(1);
}

function changecolor1(rgb) {
  var r = rgb.split('(')[1].split(',')[0];
  var g = rgb.split('(')[1].split(',')[1].split(',')[0];
  var b = rgb.split('(')[1].split(',')[2].split(')')[0];


  return toHEX(r, g, b);
}


function getColor(tag) {
  var toHex = function(color) {
    var hex = function(str) {
      result = parseInt(str).toString(16);
      if (result.length < 2)
        result = '0' + result;
      return result;
    }

    rgb = color.match(/^rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)$/);
    if (!rgb)
      return color;
    return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
  }

  var style = window.getComputedStyle(tag);
  return toHex(style.backgroundColor);
}



var picker = {
  V: 100,
  S: 100,
  status: false,
  element_parent: null,
  init: function(active_element, type_style, org_background,element_parent){
    picker_active_element = active_element;
    picker_type_style = type_style;
    picker_element_background = org_background;
    picker.element_parent = element_parent;

    var id_elements = {
      primary: "primary_block",
      arrows: "arrows",
      block: "block_picker",
      circle: "circle",
      line: "line_color"
    };

    var s = {
      h: 180,
      w: 20,
      th: id_elements.arrows,
      bk: id_elements.block,
      line: id_elements.line
    };
    /*
    Параметры передаваемые через обьект "s" обьекту "Line"
    h - высота линни Hue
    w- ширина линни Hue
    th  - id для елмента в котором находяться стрелки || ползунок для управление шкалой Hue
    bk - id блока главного блока с изображение и изменяемым фоном
    */
    Line.init(s); //отрисовка линий hue и привязка событий

    var b = {
      block: id_elements.block,
      circle: id_elements.circle
    };
    /*
    Параметры передаваемые через обьект "b" обьекту "Block"
    id - id блока выбора цвета (основной блок)
    c - круг для перемещения по основнoму блоку(для выбора цвета)
    */
    Block.init(b); // привязка событий к блоку и кругу для управления

    picker.out_color = document.getElementById("out_color");

  },
  set_styles: function(element){
    element = typeof element === 'undefined' ? picker.element_parent : element;
    var pic_width = 180,
    pic_height = 300,
    offset = 15,
    element_offset = element.getBoundingClientRect(),
    element_width = element.offsetWidth,
    element_height = element.offsetHeight,
    css_class,top,left;
    if(element_offset.top > pic_height){
      top = element_offset.top - pic_height;
      if(element_offset.right > pic_width){ //bottom
        left = element_offset.left - pic_width + element_height;
        css_class = 'pic_arrow_bottom_right';
      } else{
        left = element_offset.left;
        css_class = 'pic_arrow_bottom_left';
      }
    } else{
      top = element_offset.top + element_height + offset;
      if(element_offset.right > pic_width){
        css_class = 'pic_arrow_top_right';
        left = element_offset.left - pic_width + element_height;
      } else{
        css_class = 'pic_arrow_top_left';
        left = element_offset.left;
      }
    }
    document.getElementById('modal_color_pic').style.top = top + 'px';
    document.getElementById('modal_color_pic').style.left = left + 'px';
    document.getElementById('modal_color_pic').setAttribute('class','modal_color_pic ' + css_class);
  },
  _show:function(element){
    picker.set_styles(element);
    document.getElementById('modal_color_pic').style.display = 'block';
  }
};

var Line = {

  Hue: 0,

  init: function(elem) {
    if (document.getElementById('canva_color')) document.getElementById('canva_color').remove();

    var canvaLine, cAr, pst, bk, t = 0;;

    elem.w = 120;
    elem.h = 10;

    canvaLine = Line.create(elem.h, elem.w, elem.line, "cLine");

    cAr = document.getElementById(elem.th);
    bk = document.getElementById(elem.bk);

    Line.posit = function(e) {
      var top, rgb;

      top = mouse.pageX(e) - pst;
      top = (top < 0) ? 0 : top;
      top = (top > elem.w) ? elem.w : top;

      cAr.style.left = (top - 8) + "px";
      t = Math.round(top / (elem.w / 360));
      t = Math.abs(t - 360);
      t = (t == 360) ? 0 : t;

      Line.Hue = t;

      bk.style.backgroundColor = "rgb(" + convert.hsv_rgb(t, 100, 100) + ")";
      picker.out_color.style.backgroundColor = "rgb(" + convert.hsv_rgb(t, picker.S, picker.V) + ")";
      var rgb = "rgb(" + convert.hsv_rgb(t, picker.S, picker.V) + ")";
      var Hex_color = changecolor1(rgb);
      document.getElementById('set_new_color').value = Hex_color;
      if (picker_type_style == 'textShadow') {
        var textShadow = picker_active_element.getElementsByTagName('*')[0].style.textShadow ? picker_active_element.getElementsByTagName('*')[0].style.textShadow : getComputedStyle(picker_active_element.getElementsByTagName('*')[0]).textShadow;
        if (textShadow == 'none') {
          for (var i = 0; i < picker_active_element.getElementsByTagName('*').length; i++) {
            picker_active_element.getElementsByTagName('*')[i].style.textShadow = '0px 0px 0px ' + Hex_color;
          }
        } else {
          var ts = textShadow.split(' ');
          var TextShadow = ts[3] + ' ' + ts[4] + ' ' + ts[5] + ' ';
          for (var i = 0; i < picker_active_element.getElementsByTagName('*').length; i++) {
            picker_active_element.getElementsByTagName('*')[i].style.textShadow = TextShadow + Hex_color;
          }
        }
        text_edit.change_shadow();
      } else {
        picker_active_element.style[picker_type_style] = Hex_color;
      }

    }

    // события перемещения по линии
    cAr.onmousedown = function() {

      pst = Obj.positX(canvaLine);

      document.onmousemove = function(e) {
        Line.posit(e);
      }
    }

    cAr.onclick = Line.posit;

    canvaLine.onclick = function(e) {
      Line.posit(e)
    };

    canvaLine.onmousedown = function() {

      pst = Obj.positX(canvaLine);

      document.onmousemove = function(e) {
        Line.posit(e);
      }
    }
    document.onmouseup = function() {
      document.onmousemove = null;
      cAr.onmousemove = null;

    }

    document.getElementById('btn_apply_color').onclick = this.apply_select_color;
    document.getElementById('btn_cancel_color').onclick = this.cancel_select_color;
  },
  cancel_select_color: function() {
    if (picker_type_style == 'textShadow') {
      var textShadow = picker_active_element.getElementsByTagName('*')[0].style.textShadow ? picker_active_element.getElementsByTagName('*')[0].style.textShadow : getComputedStyle(picker_active_element.getElementsByTagName('*')[0]).textShadow;
      if (textShadow == 'none') {
        for (var i = 0; i < picker_active_element.getElementsByTagName('*').length; i++) {
          picker_active_element.getElementsByTagName('*')[i].style.textShadow = '0px 0px 0px ' + picker_element_background;
        }
      } else {
        var ts = textShadow.split(' ');
        var TextShadow = ts[3] + ' ' + ts[4] + ' ' + ts[5] + ' ';
        for (var i = 0; i < picker_active_element.getElementsByTagName('*').length; i++) {
          picker_active_element.getElementsByTagName('*')[i].style.textShadow = TextShadow + picker_element_background;
        }
      }
      text_edit.change_shadow();
    } else {
      picker_active_element.style[picker_type_style] = picker_element_background;
    }
    document.getElementById('modal_color_pic').style.display = 'none';
  },
  apply_select_color: function() {
    if (typeof getComputedStyle !== 'undefined') {
      document.getElementsByName(picker_type_style)[0].style.background = getComputedStyle(document.getElementById('out_color')).backgroundColor;
    } else {
      document.getElementsByName(picker_type_style)[0].style.background = document.getElementById('out_color').currentStyle['backgroundColor'];
    }
    document.getElementById('modal_color_pic').style.display = 'none';
  },

  create: function(height, width, line, cN) {
    var canvas = document.createElement("canvas");

    canvas.width = width;
    canvas.height = height;
    canvas.className = cN;
    canvas.id = 'canva_color';

    document.getElementById(line).appendChild(canvas);

    Line.grd(canvas, height, width);

    return canvas;
  },

  grd: function(canva, h, w) {
    var gradient, hue, color, canva, gradient1;

    canva = canva.getContext("2d");

    gradient = canva.createLinearGradient(0, 0, w, 0);


    hue = [
      [255, 0, 0],
      [255, 0, 255],
      [0, 0, 255],
      [0, 255, 255],
      [0, 255, 0],
      [255, 255, 0],
      [255, 0, 0]
    ];

    for (var i = 0; i <= 6; i++) {

      color = 'rgb(' + hue[i][0] + ',' + hue[i][1] + ',' + hue[i][2] + ')';

      gradient.addColorStop(i * 1 / 6, color);

    };
    canva.fillStyle = gradient;
    canva.fillRect(0, 0, w, h);
  }
};

var Block = {

  init: function(elem) {

    if(picker_type_style == 'background') picker_type_style = 'backgroundColor';
    var element_style = active_element.style[picker_type_style] ? active_element.style[picker_type_style]
    : getComputedStyle(active_element)[picker_type_style];

    gId('set_new_color').value = changecolor1(element_style);

    var circle, block, colorO, bPstX, bPstY, bWi, bHe, cW, cH, pxY, pxX;

    circle = document.getElementById(elem.circle);
    block = document.getElementById(elem.block);
    cW = circle.offsetWidth;
    cH = circle.offsetHeight;
    bWi = block.offsetWidth - cW;
    bHe = block.offsetHeight - cH;

    pxY = bHe / 100;
    pxX = bWi / 100;

    Block.cPos = function(e) {

      var top, left, S, V;

      document.ondragstart = function() {
        return false;
      }

      document.body.onselectstart = function() {
        return false;
      }

      left = mouse.pageX(e) - bPstX - cW / 2;
      left = (left < 0) ? 0 : left;
      left = (left > bWi) ? bWi : left;


      circle.style.left = left + "px";

      S = Math.ceil(left / pxX);

      top = mouse.pageY(e) - bPstY - cH / 2;
      top = (top > bHe) ? bHe : top;

      top = (top < 0) ? 0 : top;

      circle.style.top = top + "px";

      V = Math.ceil(Math.abs(top / pxY - 100));

      if (V < 50) circle.style.borderColor = "#ffffff";

      else circle.style.borderColor = "#000000";

      picker.S = S;

      picker.V = V;

      picker.out_color.style.backgroundColor = "rgb(" + convert.hsv_rgb(Line.Hue, S, V) + ")";
      var rgb = "rgb(" + convert.hsv_rgb(Line.Hue, S, V) + ")";
      var Hex_color = changecolor1(rgb);
      document.getElementById('set_new_color').value = Hex_color;
      if (picker_type_style == 'textShadow') {
        var textShadow = picker_active_element.getElementsByTagName('*')[0].style.textShadow ? picker_active_element.getElementsByTagName('*')[0].style.textShadow : getComputedStyle(picker_active_element.getElementsByTagName('*')[0]).textShadow;
        if (textShadow == 'none') {
          for (var i = 0; i < picker_active_element.getElementsByTagName('*').length; i++) {
            picker_active_element.getElementsByTagName('*')[i].style.textShadow = '0px 0px 0px ' + Hex_color;
          }
        } else {
          var ts = textShadow.split(' ');
          var TextShadow = ts[3] + ' ' + ts[4] + ' ' + ts[5] + ' ';
          for (var i = 0; i < picker_active_element.getElementsByTagName('*').length; i++) {
            picker_active_element.getElementsByTagName('*')[i].style.textShadow = TextShadow + Hex_color;
          }
        }
        text_edit.change_shadow();
      } else {
        picker_active_element.style[picker_type_style] = Hex_color;
      }

      // window.frames[0].window.ed_element.element.style.background = Hex_color;

      var _res = convert.hsv_rgb(Line.Hue, S, V);
      _res = _res[0].toString(16) + "" + _res[1].toString(16) + "" + _res[2].toString(16);
    }

    block.onclick = function(e) {
      bPstX = Obj.positX(block);
      bPstY = Obj.positY(block);
      Block.cPos(e);
    }
    block.onmousedown = function() {
      document.onmousemove = function(e) {
        bPstX = Obj.positX(block);
        bPstY = Obj.positY(block);
        Block.cPos(e);
      }
    }

    document.onmouseup = function() {
      document.onmousemove = null;
    }
  }

};

var convert = {

  hsv_rgb: function(H, S, V) {

    var f, p, q, t, lH;

    S /= 100;
    V /= 100;

    lH = Math.floor(H / 60);

    f = H / 60 - lH;
    p = V * (1 - S);
    q = V * (1 - S * f);
    t = V * (1 - (1 - f) * S);

    switch (lH) {

      case 0:
        R = V;
        G = t;
        B = p;
        break;
      case 1:
        R = q;
        G = V;
        B = p;
        break;
      case 2:
        R = p;
        G = V;
        B = t;
        break;
      case 3:
        R = p;
        G = q;
        B = V;
        break;
      case 4:
        R = t;
        G = p;
        B = V;
        break;
      case 5:
        R = V;
        G = p;
        B = q;
        break;
    }

    return [parseInt(R * 255), parseInt(G * 255), parseInt(B * 255)];
  }

};
