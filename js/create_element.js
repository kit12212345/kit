  "use strict";

var create_element = {
  last_pos_mouse: {
    x: 0,
    y: 0
  },
  scroll_top : 0,
  check_move : false,
  init: function() {
    window.frames[0].create_new_element = false;
    var obj = this;
    for (var i = 0; i < document.getElementsByClassName('create_element').length; i++) {
      document.getElementsByClassName('create_element')[i].onmousedown = function(e){
        obj.listen_move(e);
      }
    }
  },
  getXY: function(e){
    var posx = 0;
    var posy = 0;
    if (!e) var e = window.event;
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    }
    else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft
        + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop
        + document.documentElement.scrollTop;
    }
    return {
      x: posx,
      y: posy
    }
  },
  listen_move: function(e){ // НЕ ЗАКОНЧЕНО ДВИЖЕНИЕ СО СКРОЛОМ
    var obj = this;
    var small_element = document.createElement('div');
    small_element.id = 'small_element';
    small_element.setAttribute('class','small_element');
    document.body.appendChild(small_element);
    window.frames[0].create_new_element = small_element;

    document.onmousemove = function(e){
      obj.check_move = true;
      obj.move(e,small_element);
    }
    window.onscroll = function(e){
      if(obj.check_move) return false;
      obj.scroll_top = document.body.scrollTop;
      var new_pos = obj.scroll_top + obj.last_pos_mouse.y;
      small_element.style.top = new_pos + 'px';
    }
    document.onmouseup = obj.clear;
    window.frames[0].document.onmouseup = obj.clear;
  },
  move: function(e,small_element){

    var frame = document.getElementById('frame');
    var frame_offset_left = frame.offsetLeft;
    var frame_offset_top = frame.offsetTop;
    var frame_width = frame.offsetWidth;
    var frame_height = frame.offsetHeight;


    this.getXY(e);
    var mouseX = this.getXY(e).x;
    var mouseY = this.getXY(e).y;

    var posX = mouseX - small_element.offsetWidth / 2;
    var posY = mouseY - small_element.offsetHeight / 2;

    this.last_pos_mouse.x = posX;
    this.last_pos_mouse.y = posY;

    small_element.style.left = posX + 'px';
    small_element.style.top = posY + 'px';
    this.check_move = false;


    if(posX > frame_offset_left && posX < frame_offset_left + frame_width
    && posY > frame_offset_top && posY < frame_offset_top + frame_height){
      document.onmousemove = null;
    }
  },
  create: function(){
    var element = this.div('new_element el_move','new_element');
    return element;
  },
  set: function() {
    if(window.frames[0].create_new_element !== false){
      var element = create_element.create();
      if(window.frames[0].document.getElementsByClassName('set_element')[0]){
        window.frames[0].document.getElementsByClassName('set_element')[0].appendChild(element);
        window.frames[0].document.getElementsByClassName('set_element')[0].classList.remove('set_element');
      } else{
        window.frames[0].document.body.appendChild(element);
      }
      window.frames[0].init_elements();
    }
  },
  clear: function(e){
    create_element.set();
    document.onmousemove = null;
    window.frames[0].create_new_element = false;
    if(document.getElementById('small_element')) document.getElementById('small_element').remove();
  },
  div: function(e_class,e_id){
    return this.set_attr(document.createElement('div'),e_class,e_id);
  },
  set_attr: function(element,e_class,e_id){
    if(e_class) element.setAttribute('class',e_class);
    if(e_id) element.id = e_id;
    return element;
  }
};
