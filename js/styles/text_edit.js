function init_text_edit(){
  var modal_tSh_width = 225;
  var modal_tSh_height = 120;
  var check_move_block = false;
  var ie = 0;
  var op = 0;
  var ff = 0;
  var arc_delta_x = 0;
  var arc_delta_y = 0;
  var arc_pos = {
    x: 0,
    y: 0
  }
  var element = document.getElementById('arc');

  var block = document.getElementById('block_text');

  var now_align = 'left';

  _e.addEvent(document.getElementById('open_font_size_edit'),'click',function(e) {
    var modal = document.getElementById('m_change_font_size');
    if(modal.style.display == 'block'){
      modal.style.display = 'none';
    } else{
      if(typeof getComputedStyle !== 'undefined'){
        var fontSize = parseInt(active_element.style.fontSize) ? parseInt(active_element.style.fontSize) : parseInt(getComputedStyle(active_element).fontSize);
      } else{
        var fontSize = parseInt(active_element.style.fontSize) ? parseInt(active_element.style.fontSize) : parseInt(active_element.currentStyle['fontSize']);
      }
      document.getElementById('c_font_size').value = fontSize;
      modal.style.display = 'block';
    }
  });


  _e.addEvent(document.getElementById('open_color_edit'),'click',function(e){
    document.getElementById('modal_color_pic').style.display = 'block';
    var color = active_element.style.color ? active_element.style.color : getComputedStyle(active_element).color;
    picker.init(active_element,'color',color);
  });

  _e.addEvent(document.getElementById('change_t_shadow_color'),'click',function(){
    document.getElementById('modal_color_pic').style.display = 'block';
    var text_shadow = block.getElementsByTagName('*')[0].style.textShadow ? block.getElementsByTagName('*')[0].style.textShadow : getComputedStyle(block.getElementsByTagName('*')[0]).textShadow;
    if(text_shadow == 'none'){
      var colorTextShadow = 'rgb(0,0,0)';
    } else {
      var ts = text_shadow.split(' ');
      var colorTextShadow = ts[0] + ts[1] + ts[2];
    }
    picker.init(document.getElementById('block_text'),'textShadow',colorTextShadow);
  });

  var ts = 'rgb(249, 227, 227) 0px 0px 0px'.split(' ');

  function change_text_shadow(x,y,bloor){
    try {
      var text_shadow = block.getElementsByTagName('*')[0].style.textShadow ? block.getElementsByTagName('*')[0].style.textShadow : getComputedStyle(block.getElementsByTagName('*')[0]).textShadow;
      if(text_shadow == 'none'){
        var colorTextShadow = 'rgb(0,0,0)';
      } else {
        var ts = text_shadow.split(' ');
        var colorTextShadow = ts[0] + ts[1] + ts[2];
      }
      for (var i = 0; i < document.getElementById('block_text').getElementsByTagName('*').length; i++) {
        document.getElementById('block_text').getElementsByTagName('*')[i].style.textShadow = x + 'px ' + y + 'px ' + bloor + 'px ' + colorTextShadow;
      }

      text_edit.change_shadow();

    } catch (e) {
      console.log('select error');
    }
  }

  _e.addEvent(document.getElementById('open_text_shadow_edit'),'click',function(e){
    var modal = document.getElementById('modal_text_shadow');
    if(modal.style.display == 'block'){
      modal.style.display = 'none';
      removeClass(this,'active_t_ed__item');
    } else{
      modal.style.display = 'block';
      addClass(this,'active_t_ed__item');
    }
  });

  _e.addEvent(document.getElementById('i_bloor'),'input',function(e){
    change_text_shadow(arc_pos.x - 29,arc_pos.y - 29,this.value);
  });

  for (var i = 0; i < document.getElementsByClassName('t_sh_i_change').length; i++) {
    _e.addEvent(document.getElementsByClassName('t_sh_i_change')[i],'input',function(e){

      var canv_parent = document.getElementById('canv');
      var i_pos_x = parseInt(document.getElementById('pos_x').value) + 29;
      var i_pos_y = parseInt(document.getElementById('pos_y').value) + 29;
      var i_bloor = parseInt(document.getElementById('i_bloor').value);
      var arc = document.getElementById('arc');

      i_pos_x = i_pos_x >= canv_parent.offsetWidth - arc.offsetWidth ? canv_parent.offsetWidth - arc.offsetWidth : i_pos_x;
      i_pos_y = i_pos_y >= canv_parent.offsetHeight - arc.offsetHeight ? canv_parent.offsetHeight - arc.offsetHeight : i_pos_y;

      if(i_pos_x <= 0) i_pos_x = 0;
      if(i_pos_y <= 0) i_pos_y = 0;



      arc_pos.x = i_pos_x;
      arc_pos.y = i_pos_y;


      arc.style.left = arc_pos.x + 'px';
      arc.style.top = arc_pos.y + 'px';

      if(document.getElementById('block_text').innerHTML == '') return false;
      change_text_shadow(arc_pos.x - 29,arc_pos.y - 29,i_bloor);
      draw_line(arc_pos.x + 5,arc_pos.y + 5,true);

    });
  }


  var move_arc_shadow = {
    delta_x: 0,
    delta_y: 0,
    init: function(){
      var obj = this;

      _e.addEvent(element,'mousedown',function (e){
        e = e ? e : window.event;
        var el_down = e.target ? e.target : e.srcElement;
        obj.saveXY(e);
      });

      _e.addEvent(document,'mouseup',function (e){
        obj.clearXY(e);
      });
    },
    saveXY: function(e) {

      var browser = navigator.userAgent;
      if (browser.indexOf("Opera") != -1) op = 1;
      else {
        if (browser.indexOf("MSIE") != -1) ie = 1;
        else {
          if (browser.indexOf("Firefox") != -1) ff = 1;
        }
      }

      if (e) {
        var x = e.pageX;
        var y = e.pageY;
      }
      else {
        var x = window.event.clientX;
        var y = window.event.clientY;
        if (ie) {
          y -= 2;
          x -= 2;
        }
      }

      var obj = this;


      if(typeof getComputedStyle !== 'undefined'){
        var x_block = parseInt(getComputedStyle(element).left);
        var y_block = parseInt(getComputedStyle(element).top);
      } else{
        var x_block = parseInt(element.currentStyle['left']);
        var y_block = parseInt(element.currentStyle['top']);
      }


      arc_delta_x = x_block - x;
      arc_delta_y = y_block - y;

      _e.addEvent(document,'mousemove',obj.move);

    },
    clearXY:function(){
      _e.removeEvent(document,'mousemove',this.move);
    },
    move: function(e){

      var browser = navigator.userAgent;
      if (browser.indexOf("Opera") != -1) op = 1;
      else {
        if (browser.indexOf("MSIE") != -1) ie = 1;
        else {
          if (browser.indexOf("Firefox") != -1) ff = 1;
        }
      }

      if(check_move_block) return false;
      if (e) {
        var x = e.pageX;
        var y = e.pageY;
      }
      else {
        var x = window.event.clientX;
        var y = window.event.clientY;
        if (ie) {
          y -= 2;
          x -= 2;
        }
      }
      if(document.getElementById('block_text').innerHTML == '') return false;


      var new_x = arc_delta_x + x;
      var new_y = arc_delta_y + y;
      var parent_block = document.getElementById('canv');
      if(new_x >= 0 && new_x <= parent_block.offsetWidth - element.offsetWidth - 2){
        element.style.left = new_x + "px";
        arc_pos.x = new_x;
      }
      if(new_y >= 0 && new_y <= parent_block.offsetHeight - element.offsetHeight - 2){
        element.style.top = new_y + "px";
        arc_pos.y = new_y;
      }

      document.getElementById('pos_x').value = arc_pos.x - 29;
      document.getElementById('pos_y').value = arc_pos.y - 29;
      var i_bloor = parseInt(document.getElementById('i_bloor').value);
      document.getElementById('block_text').blur();


      change_text_shadow(arc_pos.x - 29,arc_pos.y - 29,i_bloor);
      draw_line(arc_pos.x + 5,arc_pos.y + 5,true);
    }
  };

  move_arc_shadow.init();


  var draw = document.getElementById('canvas');
  if(draw.getContext){
    var context = draw.getContext('2d');

    context.beginPath();


    function draw_line(x,y,_clear){
      context.beginPath();
      context.strokeStyle = '#000000';
      context.moveTo(34,34);
      context.clearRect(0,0,70,70);
      context.lineTo(x,y);
      context.stroke();
    }
    draw_line(31,31);
    context.stroke();
  }

  _e.addEvent(block,'focus',function(){
    text_edit.init();
  });

  var text_edit = {
    change_shadow: function() {
      try {
        var value = block.innerHTML;
        if(value == '') return false;
        if(block.childNodes.length){
          if(block.childNodes[0].nodeName == '#text'){
            var t_val = document.createTextNode(block.childNodes[0].nodeValue);
            var div = document.createElement('div');
            div.appendChild(t_val);
            block.innerHTML = '';
            block.appendChild(div);
            block.focus();
          }
        }
        for (var i = 0; i < block.getElementsByTagName('*').length; i++) {
          if(!search_class(block.getElementsByTagName('*')[i],'txt')){
            addClass(block.getElementsByTagName('*')[i],'txt');
          }
        }
        console.log(value);
        active_element.innerHTML = value;

      } catch (e) {
        console.log(e);
        //alert("Не выбран эленмент");
      }
    },
    init: function(){
      _e.addEvent(block,'DOMSubtreeModified',function(e){
        if(IS_FALSE_EVENT === true) return false;
        e = _e.getEvent(e);
        text_edit.change_shadow();
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      });

      for(var i = 0; i < document.getElementsByClassName('edit_align').length; i++){
        _e.addEvent(document.getElementsByClassName('edit_align')[i],'click',function(e){
          var align = this.getAttribute('data-aling');
          document.execCommand('justify' + align,false,null);
          for (var i = 0; i < document.getElementsByClassName('edit_align').length; i++) {
            removeClass(document.getElementsByClassName('edit_align')[i],'active_t_ed__item');
          }
          addClass(this,'active_t_ed__item');
        });
      }

      for (var i = 0; i < document.getElementsByClassName('edit_font').length; i++) {
        _e.addEvent(document.getElementsByClassName('edit_font')[i],'click',function(e){
          var font = this.getAttribute('data-font');
          block.focus();
          switch(font){
            case 'strong':
            addClass(this,'active_t_ed__item');
            document.execCommand('bold',false,null);
            break;
            case 'underline':
            addClass(this,'active_t_ed__item');
            document.execCommand('underline',false,null);
            break;
            case 'curs':
            addClass(this,'active_t_ed__item');
            document.execCommand('italic',false,null);
            break;
          }
        });
      }
    },
    change_size: function(){
      var value = this.value;
      active_element.style.fontSize = value + 'px';
    }
  }
  _e.addEvent(document.getElementById('c_font_size'),'input',text_edit.change_size);
}
