var change_element_width;
var change_element_height;
var change_element_border = {
    border: 'solid',
    borderTop: 'solid',
    borderLeft: 'solid',
    borderBottom: 'solid',
    borderRight: 'solid'
};

var edit_element = {
  change_margin : function(element,type){
    var data_style = element.getAttribute('data-style');
    if(typeof type !== 'undefined') active_element.infoMargin[data_style] = type == 'prc' ? '%' : type;
    return (function() {
      active_element.style[data_style] = element.value + active_element.infoMargin[data_style];
      for (var i = 0; i < document.querySelectorAll('*[data-style="' + data_style + '"]').length; i++) {
        if(element !== document.querySelectorAll('*[data-style="' + data_style + '"]')[i])
         document.querySelectorAll('*[data-style="' + data_style + '"]')[i].value = element.value;
      }
      init_elements.init_scroll_lines(); // ДВижение линий и блока меню
    })();
  },
  change_padding : function(element,type){
    var data_style = element.getAttribute('data-style');
    if(typeof type !== 'undefined') active_element.infoPadding[data_style] = type == 'prc' ? '%' : type;
    return (function() {
      active_element.style[data_style] = element.value + active_element.infoPadding[data_style];
      for (var i = 0; i < document.querySelectorAll('*[data-style="' + data_style + '"]').length; i++) {
        if(element !== document.querySelectorAll('*[data-style="' + data_style + '"]')[i])
         document.querySelectorAll('*[data-style="' + data_style + '"]')[i].value = element.value;
      }
      init_elements.init_scroll_lines(); // ДВижение линий и блока меню
    })();
  },
  change_box_shadow: function(change_inset){
    function get_styles(){
      return {
        xofst: document.getElementById('b_s_xofst').value ? document.getElementById('b_s_xofst').value : 0,
        yofst: document.getElementById('b_s_yofst').value ? document.getElementById('b_s_yofst').value : 0,
        rds: document.getElementById('b_s_rds').value ? document.getElementById('b_s_rds').value : 0,
        stch: document.getElementById('b_s_stch').value ? document.getElementById('b_s_stch').value : 0,
        inset: document.getElementById('b_s_inset').checked
      }
    }
    var val_obj = get_styles();
    var change_element = active_element;

    if(change_inset === true || val_obj.inset === true){
      return change_element.style.boxShadow = val_obj.xofst + 'px ' +  val_obj.yofst + 'px '
       + val_obj.rds + 'px ' + val_obj.stch + 'px #ccc inset';
    } else{
      return change_element.style.boxShadow = val_obj.xofst + 'px ' +  val_obj.yofst + 'px '
       + val_obj.rds + 'px ' + val_obj.stch + 'px #ccc';
    }
  },
  change_width: function(element,type){
    if(typeof type !== 'undefined') active_element.infoWidth = type;
    var end = active_element.infoWidth == 'prc' ? '%' : 'px';
    return active_element.style.width = element.value + end;
  },
  change_height: function(element,type) {
    if(typeof type !== 'undefined') active_element.infoHeight = type;
    var end = active_element.infoHeight == 'prc' ? '%' : 'px';
    return active_element.style.height = element.value + end;
  },
  change_border: function(element,type){
    var data_style = element.getAttribute('data-style');
    if(typeof type !== 'undefined') active_element.infoBorder[data_style] = type;
    var border_color_name = data_style.split('border')[1] == '' ? 'borderColor' : data_style + 'Color';
    var border_color = active_element.style[border_color_name] ? active_element.style[border_color_name] : getComputedStyle(active_element)[border_color_name];
    return active_element.style[data_style] = element.value + 'px ' + active_element.infoBorder[data_style] + ' ' + border_color;
  },
  change_border_radius: function(element){
    var data_style = element.getAttribute('data-style');
    return active_element.style[data_style] = element.value + 'px';
  },
  change_border_color: function(element){
    var data_style = element.getAttribute('data-border-color');
    var borderColor = active_element.style[data_style] ? active_element.style[data_style] : getComputedStyle(active_element)[data_style];
    picker._show(element);
    return picker.init(active_element,data_style,borderColor,element);
  },
  change_background: function(element,transparent){
    var background;
    if(typeof transparent !== 'undefined'){
      if(transparent) return active_element.style.background = 'transparent';
      else return active_element.style.background = document.getElementById('el_background').style.backgroundColor;
    }
    if(document.getElementById('el_background_trans').checked) document.getElementById('el_background_trans').click();
    if(typeof getComputedStyle !== 'undefined'){
      background = getComputedStyle(active_element).backgroundColor;
    } else{
      background = active_element.currentStyle['backgroundColor'];
    }
    picker._show(element);
    return picker.init(active_element,'backgroundColor',background,element);

  },
  change_color: function(element) {
    var color;
    if(typeof getComputedStyle !== 'undefined'){
      color = getComputedStyle(active_element).color;
    } else{
      color = active_element.currentStyle['color'];
    }
    picker._show(element);
    return picker.init(active_element,'color',null,element);
  },
  align_center: function(element){
    if(element.checked){
      active_element.style.margin = 'auto';
    } else{
      active_element.style.margin = '';
    }
  }
}
