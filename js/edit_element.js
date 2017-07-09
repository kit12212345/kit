"use strict";

var edit_element = {
  init: function() {
    var obj = this;
    document.getElementById('edit_element').onclick = function(){
      window.ed_element = {
        element : this.parentNode.parentNode,
        background : getComputedStyle(this.parentNode.parentNode).backgroundColor
      };

      window.parent.document.getElementById('select_background').style.background = window.ed_element.background;
      obj.show_modal();
    };
    document.getElementById('delete_element').onclick = function() {
      obj.delete_element(this.parentNode.parentNode);
    };

    window.parent.document.getElementById('select_background').onclick = function() {
      window.parent.document.getElementById('modal_color_pic').style.display = 'block';
      window.parent.picker.init();
    };
  },
  delete_element:function(element){
    element.remove();
  },
  show_modal: function() {
    window.parent.document.getElementById('modal_edit_element').style.display = 'block';
    window.parent.document.getElementById('modal_edit_head').onmousemove = function(e){
      e = e || window.event;
      var $ini_block = new init_block(e,this,true,true);
      $ini_block.move_block.init();
    }
  }
};
