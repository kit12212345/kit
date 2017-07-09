"use strict";
var active_element;

function get_random_color() {
  var r_col = "#" + ((1 << 24) * Math.random() | 0).toString(16);
  return r_col;
}

function init_create_els() {
  for (var i = 0; i < document.getElementsByClassName('create_items').length; i++) {
    _e.addEvent(document.getElementsByClassName('create_items')[i], 'mousedown', function(e) {
      create_element.create_mini_el(e);
    });
  }
}

var create_element = {
  small_element: null,
  data_element: {
    element: null,
    type_element: null,
    list_class: null
  },
  getXY: function(e) {
    var posx = 0;
    var posy = 0;
    if (!e) var e = window.event;
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft +
        document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    return {
      x: posx,
      y: posy
    }
  },
  create_mini_el: function(e) {
    e = e ? e : window.event;
    var element = e.target ? e.target : e.srcElement;
    var mouse_pos = this.getXY(e);
    var text_create_element = document.createTextNode('Перетащите элемент на сайт');

    if (typeof element.getAttribute('data-list') !== 'undefined') {
      this.data_element.list_class = element.getAttribute('data-list');
    }
    this.small_element = document.createElement('div');
    this.small_element.appendChild(text_create_element);
    this.data_element.element = element.id.split('_')[1];
    if (element.id.split('_')[1] == 'input') {
      this.data_element.type_element = element.getAttribute('type-input');
    } else if (element.id.split('_')[1] == 'group') {
      this.data_element.element = element.id.split('_')[1] + '_' + element.id.split('_')[2];
    }
    this.small_element.setAttribute('class', 'small_element');
    document.body.appendChild(this.small_element);
    this.small_element.style.top = mouse_pos.y + this.small_element.offsetHeight / 2;
    this.small_element.style.left = mouse_pos.x - this.small_element.offsetWidth / 2;
    addClass(document.body, 'cursor_grabbing');

    _e.addEvent(document, 'mousemove', create_element.move_element);
    _e.addEvent(user_frame.document, 'mousemove', create_element.move_element);

    _e.addEvent(document, 'mouseup', create_element.clear_move);
    _e.addEvent(user_frame.document, 'mouseup', create_element.clear_move);

  },
  create: function(){
    var existing_nodes = ['img','div','input','textarea','span','small'];
    var tag_name = this.data_element.element;
    if(existing_nodes.indexOf(tag_name) >= 0){
      var element = document.createElement(tag_name);

      if(tag_name == 'input'){
        element.type = this.data_element.type_element;
      }
      if(tag_name == 'img'){
        element.src = '/images/main.jpg';
      }

      this.set_attr(element, 'd_element new_' + this.data_element.element);
      if(tag_name == 'div') element.style.backgroundColor = get_random_color();
    } else{
      if(tag_name == 'line'){
        element = document.createElement('div');
        element.setAttribute('style', 'width: 100%; border: 1px solid #000;');
        element.setAttribute('class', 'd_element new_line');
      }
    }



    var set_in_el = user_frame.document.getElementsByClassName('set_in_el')[0];
    if (!set_in_el) return false;


    element_set_default_data(element); // Установка стилей по умолчанию, типо тип бордера и т.п

    set_in_el.appendChild(element);

    var parent_id = 0;
    for (var i = 0; i < treeNodes.length; i++) {
      if (treeNodes[i].element == set_in_el) parent_id = i;
    }
    treeNodes.push({
      'node_name': element.nodeName,
      'element': element,
      'parent_id': parent_id,
      'node_id': treeNodes.length
    });

    init_elements.init();

    element.click();




    return;


    try {





      var element = document.createElement(this.data_element.element);
      if (this.data_element.element == 'input' || this.data_element.element == 'textarea') {
        element = document.createElement('div');
        var input = document.createElement(this.data_element.element);
        if (this.data_element.element != 'textarea') input.type = this.data_element.type_element;
        element.appendChild(input);
      } else if (this.data_element.element == 'line') {
        element = document.createElement('div');
        element.setAttribute('style', 'width: 100%; border: 1px solid #000;');
      } else if (this.data_element.element == 'group_radio') {
        element = document.createElement('div');
        var group_name = document.getElementsByClassName('new_group_radio').length;
        for (var i = 0; i < 2; i++) {
          var item_id = i + 1;
          var radio_text = document.createTextNode('item_' + item_id);
          var input = document.createElement('input');
          var div_text = document.createElement('div');
          var label = document.createElement('label');
          label.setAttribute('class', 'd_element mn_label');
          input.type = 'radio';
          input.name = 'r_group_' + group_name;
          if (!i) input.setAttribute('checked', 'checked');
          div_text.appendChild(radio_text);
          label.appendChild(div_text);
          label.appendChild(input);
          element.appendChild(label);
        }
      } else if (this.data_element.element == 'img') {
        element = document.createElement('div');
        var img = document.createElement(this.data_element.element);
        img.src = '/images/asd.jpg';
        element.appendChild(img);
      } else if (this.data_element.element == 'div') {
        element.setAttribute('style', 'width: 100px; height: 100px;');
      } else if (this.data_element.element == 'list') {
        var element = document.createElement('ul');
        for (var i = 1; i <= 4; i++) {
          var li = document.createElement('li');
          var text = document.createTextNode('Меню_' + i);
          li.appendChild(text);
          element.appendChild(li);
        }
      }
      this.set_attr(element, 'd_element new_' + this.data_element.element);
      if (this.data_element.element == 'div') element.style.backgroundColor = get_random_color();


      var set_in_el = user_frame.document.getElementsByClassName('set_in_el')[0];
      if (!set_in_el) return false;


      element_set_default_data(element); // Установка стилей по умолчанию, типо тип бордера и т.п

      if (set_in_el.nodeName !== 'INPUT' && set_in_el.nodeName !== 'TEXTAREA') {
        if (set_in_el.nodeName === 'IMG') {
          set_in_el.parentNode.parentNode.appendChild(element);
        } else {
          set_in_el.appendChild(element);
        }
      }

      var parent_id = 0;
      for (var i = 0; i < treeNodes.length; i++) {
        if (treeNodes[i].element == set_in_el) parent_id = i;
      }
      treeNodes.push({
        'node_name': element.nodeName,
        'element': element,
        'parent_id': parent_id,
        'node_id': treeNodes.length
      });

      init_elements.init();

      if (this.data_element.element == 'input' || this.data_element.element == 'textarea' || this.data_element.element == 'group_radio') {
        input.click();
      } else if (this.data_element.element == 'img') {
        img.click();
      } else {
        element.click();
      }
    } catch (e) {
      console.log(e);
    }

  },
  set_attr: function(element, e_class, e_id) {
    if (e_class) element.setAttribute('class', e_class);
    if (e_id) element.id = e_id;
    return element;
  },
  move_element: function(e) {
    create_element.getXY(e);
    var mouseX = create_element.getXY(e).x;
    var mouseY = create_element.getXY(e).y;


    var posX = mouseX - create_element.small_element.offsetWidth / 2;
    var posY = mouseY + create_element.small_element.offsetHeight / 2;

    if (e.view == user_frame) {
      posX += document.getElementById('u_site').offsetLeft;
      posY += document.getElementById('u_site').offsetTop - user_frame.document.body.scrollTop;
    }

    create_element.small_element.style.left = posX + 'px';
    create_element.small_element.style.top = posY + 'px';

    e = e ? e : window.event;

    var hover_element = e.target ? e.target : e.srcElement;

    for (var i = 0; i < user_frame.document.getElementsByClassName('set_in_el').length; i++) {
      user_frame.document.getElementsByClassName('set_in_el')[i].classList.remove('set_in_el');
    }

    if ((contains(user_frame.document.body, hover_element) || user_frame.document.body == hover_element)
     && !search_class(hover_element, 'txt')) {
      addClass(hover_element, 'set_in_el');
    }

  },
  clear_move: function() {
    removeClass(document.body, 'cursor_grabbing');
    _e.removeEvent(document, 'mousemove', create_element.move_element);
    _e.removeEvent(user_frame.document, 'mousemove', create_element.move_element);
    if (!create_element.small_element) return false;
    removeElement(create_element.small_element);
    create_element.small_element = null;
    create_element.create();
    if (user_frame.document.getElementsByClassName('set_in_el')[0]) removeClass(user_frame.document.getElementsByClassName('set_in_el')[0], 'set_in_el');
  }
};


var init_elements = {
  current_element_width: 0,
  current_element_height: 0,
  check_event: false,
  init: function() {
    for (var i = 0; i < user_frame.document.getElementsByClassName('d_element').length; i++) {
      _e.addEvent(user_frame.document.getElementsByClassName('d_element')[i], 'click', this._click);
    }
  },
  get_element: function(el) {
    if (!search_class(el, 'd_element')) return this.get_element(el.parentNode);
    return el;
  },
  _click: function(e) {
    e = _e.getEvent(e);
    var el = init_elements.get_element(_e.getTarget(e));
    if (el.nodeName == 'LABEL') {
      active_element = el;
      return init_elements.create_edit(e, el.parentNode);
    } else {
      for (var i = 0; i < el.childNodes.length; i++) {
        if (special_nodes.indexOf(el.childNodes[i].nodeName) >= 0) {
          active_element = el;
          return init_elements.create_edit(e, el);
        }
      }
    }
    active_element = el;

    tree_nodes.show_tree();

    init_elements.create_lines();

    init_elements.current_element_width = active_element.offsetWidth;
    init_elements.current_element_height = active_element.offsetHeight;

    init_elements.listen_resize_block();

    e.stopPropagation();

    return init_elements.create_edit(e);
  },
  get_pos_block_edit:function() {
    var top = active_element.getBoundingClientRect().top,
    left = active_element.getBoundingClientRect().left + active_element.offsetWidth;

    var block_edit_el = document.createElement('div');
    block_edit_el.setAttribute('class', 'move_block_edit');
    block_edit_el.id = 'block_edit';
    var icon_edit = document.createElement('div');
    icon_edit.setAttribute('class', 'el_icon_e el_edit_icon');
    icon_edit.id = 'edit_element';
    var icon_delete = document.createElement('div');
    icon_delete.setAttribute('class', 'el_icon_e el_delete_icon');
    icon_delete.id = 'delete_element';
    block_edit_el.appendChild(icon_edit);
    block_edit_el.appendChild(icon_delete);

    top -= 22;
    left -= 60;
    if(top < 0){
      top += 24;
      top += active_element.offsetHeight;
    //  removeClass(block_edit_el,'bl_edit_top');
    //  addClass(block_edit_el,'bl_edit_bottom');
    } else{
    //  removeClass(block_edit_el,'bl_edit_bottom');
    //  addClass(block_edit_el,'bl_edit_top');
    }
    block_edit_el.style.position = 'fixed';
    block_edit_el.style.width = '60px';
    block_edit_el.style.top = top + 'px';
    block_edit_el.style.left = left + 'px';

    user_frame.document.body.appendChild(block_edit_el);
  },
  create_edit: function(e, is_input) {
    var element;
    e = _e.getEvent(e);
    if (!is_input) element = init_elements.get_element(_e.getTarget(e));
    else element = is_input;

    init_elements._close();

    var element_parent_id = '';
    if (is_input) {
      var el = e.target ? e.target : e.srcElement;
      if (el.parentNode) {
        element_parent_id = el.parentNode.id;
      }
    } else {
      if (element.parentNode) {
        element_parent_id = element.parentNode.id;
      }
    }


    if (element.id == 'block_edit' || element_parent_id == 'block_edit') return false;
    if (user_frame.document.getElementById('block_edit')) removeElement(user_frame.document.getElementById('block_edit'));


    this.get_pos_block_edit();

    _e.addEvent(user_frame.document.getElementById('edit_element'), 'click', this._edit_element);
    _e.addEvent(user_frame.document.getElementById('delete_element'), 'click', this._remove_element);
  },
  _edit_element:function(e) {
    e = _e.getEvent();
    var element_name = active_element.nodeName; // WORK
    element_name = element_name.toLowerCase();
    if(!edit_menus[element_name]){
      ajx({
        url : '/include/ajax/ajax_show_menu.php?action=show_' + element_name,
        method: 'post',
        dataType: 'json',
        success: function(data){
          if(data.result == 'true'){
            edit_menus[element_name] = data.html;
            document.getElementById('w_panel').innerHTML = data.html;
            param_panel.clear_events();
            param_panel.switch_menu();
            more_styles.clear_events();
            more_styles.init();
            init_elements.set_styles(active_element);

            document.getElementById('w_panel').style.display = 'block';

            var ActionBlock = new Action_block(document.getElementById('w_panel'));
            ActionBlock.move_block.init();
          }
        }
      });
    } else{
      document.getElementById('w_panel').innerHTML = edit_menus[element_name];
      param_panel.clear_events();
      param_panel.switch_menu();
      more_styles.clear_events();
      more_styles.init();
      init_elements.set_styles(active_element);
      document.getElementById('w_panel').style.display = 'block';

      var ActionBlock = new Action_block(document.getElementById('w_panel'));
      ActionBlock.move_block.init();
    }

    return;



  //  e.stopPropagation();
  },
  _remove_element: function(e){
    _e.removeEvent(user_frame.document.getElementById('edit_element'), 'click', init_elements._edit_element);
    _e.removeEvent(user_frame.document.getElementById('delete_element'), 'click', init_elements._remove_element);

    tree_nodes.remove_element(active_element);
    removeElement(active_element);
    removeElement(user_frame.document.getElementById('block_edit'));
    var lines_length = user_frame.document.getElementsByClassName('c_line').length;
    for(var i = 0; i < lines_length; i++) {
      removeElement(user_frame.document.getElementsByClassName('c_line')[0]);
    }
  },
  listen_resize_block: function(){
    clearInterval(listen_resize_block);
    listen_resize_block = setInterval(function(){
      var _this = init_elements;
      if(_this.current_element_width != active_element.offsetWidth
      || _this.current_element_height != active_element.offsetHeight){
        _this.init_scroll_lines();
        _this.current_element_width = active_element.offsetWidth;
        _this.current_element_height = active_element.offsetHeight;
      }
    },50);
  },
  _close: function() {
    _e.addEvent(document, 'click', function(e) {
      var block_edit = document.getElementById('w_panel');
      e = _e.getEvent(e);
      var element = _e.getTarget(e);
      if (!contains(block_edit, element) && element != active_element) {
        //  if(user_frame.document.getElementById('block_edit')) removeElement(user_frame.document.getElementById('block_edit')); // ХРЕНЬ НЕЗАКОНЧЕНАЯ
        //  active_element = null;
        //  block_edit.style.display = 'none';
      }
    });


    _e.addEvent(user_frame.document, 'click', function(e) {
      var block_edit = document.getElementById('w_panel');
      e = _e.getEvent(e);
      var element = _e.getTarget(e);
      if (!contains(block_edit, element) && element != active_element) {
        //  if(user_frame.document.getElementById('block_edit')) removeElement(user_frame.document.getElementById('block_edit')); // ХРЕНЬ НЕЗАКОНЧЕНАЯ
        //  active_element = null;
        //  block_edit.style.display = 'none';
      }
    });
  },
  get_offset_lines: function() {
    return {
      'top': active_element.getBoundingClientRect().top,
      'left': active_element.getBoundingClientRect().left,
      'bottom': active_element.getBoundingClientRect().top + active_element.offsetHeight - 2,
      'right': active_element.getBoundingClientRect().left + active_element.offsetWidth - 2,
    }
  },
  create_lines: function(){
    _e.addEvent(user_frame.document,'scroll',this.init_scroll_lines); // Удалить при потере фокуса
    if(set_help_lines == 'false') return false;
  //  addClass(active_element, 'act_element');
    var lines_length = user_frame.document.getElementsByClassName('c_line').length;
    var act_length = user_frame.document.getElementsByClassName('act_element').length;

    for (var i = 0; i < lines_length; i++){
      removeElement(user_frame.document.getElementsByClassName('c_line')[0]);
    }

    for (var i = 0; i < act_length; i++){
      if(user_frame.document.getElementsByClassName('act_element')[i])
        removeClass(user_frame.document.getElementsByClassName('act_element')[i],'act_element');
    }

    var line_offset = this.get_offset_lines();

    var line_left = document.createElement('div');
    addClass(line_left,'c_line');
    addClass(line_left,'c_left_line');
    line_left.style.left = line_offset.left + 'px';
    user_frame.document.body.appendChild(line_left);


    var line_right = document.createElement('div');
    addClass(line_right,'c_line');
    addClass(line_right,'c_right_line');
    line_right.style.left = line_offset.right + 'px';
    user_frame.document.body.appendChild(line_right);

    var line_top = document.createElement('div');
    addClass(line_top,'c_line');
    addClass(line_top,'c_top_line');
    line_top.style.top = line_offset.top + 'px';
    user_frame.document.body.appendChild(line_top);

    var line_bottom = document.createElement('div');
    addClass(line_bottom,'c_line');
    addClass(line_bottom,'c_bottom_line');
    line_bottom.style.top = line_offset.bottom + 'px';
    user_frame.document.body.appendChild(line_bottom);

  },
  init_scroll_lines: function(){
    var line_offset = init_elements.get_offset_lines();

    if(user_frame.document.getElementsByClassName('c_line')[0]){
      var line_left = user_frame.document.getElementsByClassName('c_left_line')[0];
      line_left.style.left = line_offset.left + 'px';

      var line_right = user_frame.document.getElementsByClassName('c_right_line')[0];
      line_right.style.left = line_offset.right + 'px';

      var line_top = user_frame.document.getElementsByClassName('c_top_line')[0];
      line_top.style.top = line_offset.top + 'px';

      var line_bottom = user_frame.document.getElementsByClassName('c_bottom_line')[0];
      line_bottom.style.top = line_offset.bottom + 'px';

    }
    var block_edit = user_frame.document.getElementById('block_edit');
    if(block_edit){
      line_offset.top -= 22;
      if(line_offset.top < 0){
        line_offset.top += 24;
        line_offset.top += active_element.offsetHeight;
      }
      line_offset.right -= 58;
      block_edit.style.top = line_offset.top + 'px';
      block_edit.style.left = line_offset.right + 'px';
    }
  },
  set_styles: function() {
    var element = active_element;

    if (typeof getComputedStyle !== 'undefined') {
      var width = this.get_offset(element.style.width ? element.style.width : getComputedStyle(element).width);
      var height = this.get_offset(element.style.height ? element.style.height : getComputedStyle(element).height);
      var border = this.get_border(element.style.border ? element.style.border : getComputedStyle(element).border);
      var background = element.style.background ? element.style.background : getComputedStyle(element).backgroundColor;
      var color = element.style.color ? element.style.color : getComputedStyle(element).color;
      var border_radius = parseInt(element.style.borderRadius ? element.style.borderRadius : getComputedStyle(element).borderRadius);

      var margin_top = parseInt(element.style.marginTop ? element.style.marginTop : getComputedStyle(element).marginTop);
      var margin_left = parseInt(element.style.marginLeft ? element.style.marginLeft : getComputedStyle(element).marginLeft);
      var margin_right = parseInt(element.style.marginRight ? element.style.marginRight : getComputedStyle(element).marginRight);
      var margin_bottom = parseInt(element.style.marginBottom ? element.style.marginBottom : getComputedStyle(element).marginBottom);

      var padding_top = parseInt(element.style.paddingTop ? element.style.paddingTop : getComputedStyle(element).paddingTop);
      var padding_left = parseInt(element.style.paddingLeft ? element.style.paddingLeft : getComputedStyle(element).paddingLeft);
      var padding_right = parseInt(element.style.paddingRight ? element.style.paddingRight : getComputedStyle(element).paddingRight);
      var padding_bottom = parseInt(element.style.paddingBottom ? element.style.paddingBottom : getComputedStyle(element).paddingBottom);

      if(this.getId('ch_el_width')) this.getId('ch_el_width').value = width.value;
      if(this.getId('ch_type_width')) this.getId('ch_type_width').value = width.type;
      if(this.getId('ch_el_height')) this.getId('ch_el_height').value = height.value;
      if(this.getId('ch_type_height')) this.getId('ch_type_height').value = height.type;
      if(this.getId('ch_el_border')) this.getId('ch_el_border').value = border.pix;
      if(this.getId('ch_type_border')) this.getId('ch_type_border').value = border.type;
      if(this.getId('el_border_color')) this.getId('el_border_color').style.backgroundColor = border.color;
      if(this.getId('el_background')) this.getId('el_background').style.backgroundColor = background;
      if(this.getId('el_color')) this.getId('el_color').style.color = color;
      if(this.getId('ch_el_border_radius')) this.getId('ch_el_border_radius').value = border_radius;

      this.set_indents('el_mrg_top', margin_top);
      this.set_indents('el_mrg_bottom', margin_bottom);
      this.set_indents('el_mrg_left', margin_left);
      this.set_indents('el_mrg_right', margin_right);

      this.set_indents('el_pdg_top', padding_top);
      this.set_indents('el_pdg_bottom', padding_bottom);
      this.set_indents('el_pdg_left', padding_left);
      this.set_indents('el_pdg_right', padding_right);


      /*TEXT*/
      if(active_element.nodeName != 'IMG' && active_element.nodeName != 'BODY'){
        document.getElementById('block_text').innerHTML = '';

        IS_FALSE_EVENT = true;
        for (var i = 0; i < element.getElementsByClassName('txt').length; i++) {
          var element_clone = element.getElementsByClassName('txt')[i].cloneNode(true);
          document.getElementById('block_text').appendChild(element_clone);
        }
        IS_FALSE_EVENT = false;
        init_text_edit();
      }
      /*END TEXT*/

      /*ANIMATE*/
      if(active_element.nodeName != 'BODY'){
        if (search_class(element, 'is_anim')) {
          var speed_anim = 0;
          var now_anim = element.getAttribute('data-anim');
          if (typeof getComputedStyle !== 'undefined') {
            speed_anim = element.style.animationDuration ? parseFloat(element.style.animationDuration) : parseFloat(getComputedStyle(element).animationDuration);
          } else {
            speed_anim = element.style.animationDuration ? parseFloat(element.style.animationDuration) : parseFloat(element.currentStyle.animationDuration);
          }
          speed_anim *= 1000;
          document.getElementById('ch_speed_anim').value = speed_anim;
          document.getElementById('p_now_anim').setAttribute('data-anim', now_anim);
          document.getElementById('anim__edit').style.display = 'block';
        } else {
          document.getElementById('anim__edit').style.display = 'none';
        }
      }
      /*END ANIMATE*/


    } else {

    }
  },
  set_indents: function(classNode, value) {
    for (var i = 0; i < document.getElementsByClassName(classNode).length; i++) {
      document.getElementsByClassName(classNode)[i].value = value;
    }
  },
  get_offset: function(value) {
    return value.substr(-1) == '%' ? {
      'value': parseInt(value),
      'type': 'prc'
    } : {
      'value': parseInt(value),
      'type': 'px'
    };
  },
  get_border: function(value) {
    var color;
    var pix = parseInt(value.split(' ')[0]),
      type = value.split(' ')[1] == 'none' ? 'solid' : value.split(' ')[1];
    if (typeof value.split('rgb')[1] !== 'undefined') color = 'rgb' + value.split('rgb')[1];
    else if (typeof value.split('#')[1] !== 'undefined') color = '#' + value.split('#')[1];
    else color = value.split(' ')[2];
    return {
      'pix': pix,
      'type': type,
      'color': color
    };
  },
  getId: function(id) {
    return document.getElementById(id);
  }
}
