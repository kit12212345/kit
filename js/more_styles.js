
var more_styles = {
  init: function(){
    if(document.getElementById('more_border_style'))
      _e.addEvent(document.getElementById('more_border_style'),'click',more_styles.border);
    if(document.getElementById('more_border_radius_styles'))
      _e.addEvent(document.getElementById('more_border_radius_styles'),'click',more_styles.border_radius);
    if(document.getElementById('set_shadow'))
      _e.addEvent(document.getElementById('set_shadow'),'click',more_styles.box_shadow);
    if(document.getElementById('more_margin_styles'))
      _e.addEvent(document.getElementById('more_margin_styles'),'click',more_styles.margin);
    if(document.getElementById('more_padding_styles'))
    _e.addEvent(document.getElementById('more_padding_styles'),'click',more_styles.padding);
  },
  clear_events: function() {
    if(document.getElementById('more_border_style'))
      _e.removeEvent(document.getElementById('more_border_style'),'click',more_styles.border);
    if(document.getElementById('more_border_radius_styles'))
      _e.removeEvent(document.getElementById('more_border_radius_styles'),'click',more_styles.border_radius);
    if(document.getElementById('set_shadow'))
      _e.removeEvent(document.getElementById('set_shadow'),'click',more_styles.box_shadow);
    if(document.getElementById('more_margin_styles'))
      _e.removeEvent(document.getElementById('more_margin_styles'),'click',more_styles.margin);
    if(document.getElementById('more_padding_styles'))
    _e.removeEvent(document.getElementById('more_padding_styles'),'click',more_styles.padding);
  },
  border: function(){
    addClass(this,'v_align_top');
    var main_el = document.getElementById('m_border_style');
    var check_display = main_el.style.display ? main_el.style.display : getComputedStyle(main_el).display;
    if(check_display != 'none'){
      addClass(this.childNodes[1],'l_active_par');
      document.getElementById('m_border_style').style.display = 'none';
      document.getElementById('border_m_styles').style.display = 'inline-block';

      var borderTop = init_elements.get_border(active_element.style.borderTop ? active_element.style.borderTop : getComputedStyle(active_element).borderTop),
      borderBottom = init_elements.get_border(active_element.style.borderBottom ? active_element.style.borderBottom : getComputedStyle(active_element).borderBottom),
      borderLeft = init_elements.get_border(active_element.style.borderLeft ? active_element.style.borderLeft : getComputedStyle(active_element).borderLeft),
      borderRight = init_elements.get_border(active_element.style.borderRight ? active_element.style.borderRight : getComputedStyle(active_element).borderRight);

      if(typeof getComputedStyle !== 'undefined'){
        document.getElementById('ch_el_border_top').value = parseInt(borderTop.pix);
        document.getElementById('ch_el_border_bottom').value = parseInt(borderBottom.pix);
        document.getElementById('ch_el_border_left').value = parseInt(borderLeft.pix);
        document.getElementById('ch_el_border_right').value = parseInt(borderRight.pix);

        document.getElementById('ch_type_border_top').value = borderTop.type;
        document.getElementById('ch_type_border_bottom').value = borderBottom.type;
        document.getElementById('ch_type_border_left').value = borderLeft.type;
        document.getElementById('ch_type_border_right').value = borderRight.type;

        document.getElementById('ch_type_border_top').value = borderTop.type;
        document.getElementById('ch_type_border_bottom').value = borderBottom.type;
        document.getElementById('ch_type_border_left').value = borderLeft.type;
        document.getElementById('ch_type_border_right').value = borderRight.type;

        document.getElementById('el_border_color_top').style.background = borderTop.color;
        document.getElementById('el_border_color_bottom').style.background = borderBottom.color;
        document.getElementById('el_border_color_left').style.background = borderLeft.color;
        document.getElementById('el_border_color_right').style.background = borderRight.color;
      }
    } else{
      removeClass(this,'v_align_top');
      removeClass(this.childNodes[1],'l_active_par');
      document.getElementById('m_border_style').style.display = 'inline-block';
      document.getElementById('border_m_styles').style.display = 'none';
    }
  },
  border_radius: function(e){
    addClass(this,'v_align_top');
    var main_el = document.getElementById('m_border_radius_style');
    var check_display = main_el.style.display ? main_el.style.display : getComputedStyle(main_el).display;
    if(check_display != 'none'){
      addClass(this.childNodes[1],'l_active_par');
      main_el.style.display = 'none';
      document.getElementById('border_radius_m_style').style.display = 'inline-block';

      var borderTopLeftR = active_element.style.borderTopLeftRadius ? active_element.style.borderTopLeftRadius : getComputedStyle(active_element).borderTopLeftRadius,
      borderTopRightR = active_element.style.borderTopRightRadius ? active_element.style.borderTopRightRadius : getComputedStyle(active_element).borderTopRightRadius,
      borderBottomLeftR = active_element.style.borderBottomLeftRadius ? active_element.style.borderBottomLeftRadius : getComputedStyle(active_element).borderBottomLeftRadius,
      borderBottomRightR = active_element.style.borderBottomRightRadius ? active_element.style.borderBottomRightRadius : getComputedStyle(active_element).borderBottomRightRadius;

      if(typeof getComputedStyle !== 'undefined'){
        document.getElementById('ch_el_border_top_left_radius').value = parseInt(borderTopLeftR);
        document.getElementById('ch_el_border_top_right_radius').value = parseInt(borderTopRightR);
        document.getElementById('ch_el_border_bottom_left_radius').value = parseInt(borderBottomLeftR);
        document.getElementById('ch_el_border_bottom_right_radius').value = parseInt(borderBottomRightR);
      }

    } else{
      removeClass(this,'v_align_top');
      removeClass(this.childNodes[1],'l_active_par');
      main_el.style.display = 'inline-block';
      document.getElementById('border_radius_m_style').style.display = 'none';
    }
  },
  box_shadow: function(){
    var main_el = document.getElementById('b_s_content');
    var check_display = main_el.style.display ? main_el.style.display : getComputedStyle(main_el).display;
    if(check_display != 'none'){
      removeClass(this.childNodes[1],'l_active_par');
      removeClass(document.getElementById('b_s_title'),'b_s__cont');
      main_el.style.display = 'none';
    } else{
      addClass(this.childNodes[1],'l_active_par');
      main_el.style.display = 'block';
      addClass(document.getElementById('b_s_title'),'b_s__cont');
    }
  },
  margin: function(){
    var main_el = document.getElementById('m_margin_style');
    var check_display = main_el.style.display ? main_el.style.display : getComputedStyle(main_el).display;
    if(check_display != 'none'){
      addClass(this.childNodes[1],'l_active_par');
      main_el.style.display = 'none';
      document.getElementById('m_margin_m_style').style.display = 'block';
    } else{
      removeClass(this.childNodes[1],'l_active_par');
      main_el.style.display = 'block';
      document.getElementById('m_margin_m_style').style.display = 'none';
    }
  },
  padding: function(){
    var main_el = document.getElementById('m_padding_style');
    var check_display = main_el.style.display ? main_el.style.display : getComputedStyle(main_el).display;
    if(check_display != 'none'){
      addClass(this.childNodes[1],'l_active_par');
      main_el.style.display = 'none';
      document.getElementById('m_padding_m_style').style.display = 'block';
    } else{
      removeClass(this.childNodes[1],'l_active_par');
      main_el.style.display = 'block';
      document.getElementById('m_padding_m_style').style.display = 'none';
    }
  }
};
more_styles.init();
