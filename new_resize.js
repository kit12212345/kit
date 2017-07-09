"use strict";

  var check_move_block = false;
  var ie = 0;
  var op = 0;
  var ff = 0;
  var block;
  var direct;
  var delta_w = 0;
  var delta_h = 0;
  var delta_x = 0;
  var delta_y = 0;

  function Action_block(element){
    this.move_block = {
      delta_x: 0,
      delta_y: 0,
      init: function(){
        var obj = this;
        _e.addEvent(element,'mousedown',function(e){
          e = e ? e : window.event;
          var el_down = e.target ? e.target : e.srcElement;
          if(element.id == 'modal_color_pic'){
            if(el_down.id == 'modal_color_pic') return obj.saveXY(e);
          } else{
            if(el_down.nodeName != "DIV") return true;
            if(el_down.id == 'block_text') return;
            return obj.saveXY(e);
          }
        });

        _e.addEvent(element,'mouseup',function (e){
          return obj.clearXY(e);
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


        delta_x = x_block - x;
        delta_y = y_block - y;

        _e.addEvent(document,'mousemove',obj.move);

      },
      clearXY:function() {
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

        if(search_class(element,'w_panel')){
          if(gId('modal_color_pic').style.display == 'block'){
            picker.set_styles();
          }
        }


        var new_x = delta_x + x;
        var new_y = delta_y + y;
        element.style.top = new_y + "px";
        element.style.left = new_x + "px";

      }
    }; // END MOVE
    this.resize_block = {
      block_min_width: null,
      block_min_height: null,
      init: function(top,left,bottom,right,block_min_width,block_min_height) {
          e = e ? e : window.event;
          var hover_element = e.target ? e.target : e.srcElement;

          this.block_min_width = block_min_width;
          this.block_min_height = block_min_height;

          if(element != hover_element && !search_class(hover_element,'_head')){
            element.style.cursor = 'default';
            return false;
          }


          var element_width = element.offsetWidth;
          var element_height = element.offsetHeight;
          var size_move = 5;
          if(!check_move_block){
            if(e.offsetX >= 0 && e.offsetX <= size_move && e.offsetY >= 0 && e.offsetY <= size_move){
              if(!top || !left || !bottom || !right) return false;
              element.style.cursor = 'nw-resize';
              this.add('nw');
            } else if(e.offsetX >= 0 && e.offsetX <= size_move && e.offsetY >= element_height - size_move && e.offsetY <= element_height){
              if(!top || !left || !bottom || !right) return false;
              element.style.cursor = 'sw-resize';
              this.add('sw');
            } else if(e.offsetX >= element_width - size_move && e.offsetX <= element_width && e.offsetY >= 0 && e.offsetY <= size_move){
              if(!top || !left || !bottom || !right) return false;
              element.style.cursor = 'ne-resize';
              this.add('ne');
            } else if(e.offsetX >= element_width - size_move && e.offsetX <= element_width && e.offsetY >= element_height - size_move && e.offsetY <= element_height){
              if(!top || !left || !bottom || !right) return false;
              element.style.cursor = 'se-resize';
              this.add('se');
            } else if(e.offsetX >= 0 && e.offsetX <= size_move){
              if(!left) return false;
              element.style.cursor = 'w-resize';
              this.add('left');
            } else if(e.offsetX >= element_width - size_move && e.offsetX <= element_width){
              if(!right) return false;
              element.style.cursor = 'e-resize';
              this.add('right');
            } else if(e.offsetY >= 0 && e.offsetY <= size_move){
              if(!top) return false;
              element.style.cursor = 'n-resize';
              this.add('top');
            } else if(e.offsetY >= element_height - size_move && e.offsetY <= element_height){
              if(!bottom) return false;
              element.style.cursor = 's-resize';
              this.add('bottom');
            } else{
              element.style.cursor = 'default';
              direct = '';
            }
          }
      },
      getXY: function(e){
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
        return new Array(x, y);
      },
      add: function(obj_direct){
        direct = obj_direct;
        var obj = this;

        element.onmouseup = function(event){
            obj.clear(event);
        }
        document.onmouseup = function(event){
            obj.clear(event);
        }
        element.onmousedown = function(event){
          obj.down_resize(event);
        }
      },
      down_resize: function(e){
        check_move_block = true;
        var point = this.getXY(e);
        var w_block = element.clientWidth;
        var h_block = element.clientHeight;

        if(direct == 'nw'){
          delta_w = point[0] + w_block;
          delta_h = point[1] + h_block;
        } else if(direct == 'sw'){
          delta_w = point[0] + w_block;
          delta_h = point[1] - h_block;
        } else if(direct == 'ne'){
          delta_w = point[0] - w_block;
          delta_h = point[1] + h_block;
        } else if(direct == 'se'){
          delta_w = point[0] - w_block;
          delta_h = point[1] - h_block;
        } else if(direct == 'left'){
          delta_w = point[0] + w_block;
        } else if(direct == 'right'){
          delta_w = point[0] - w_block;
        } else if(direct == 'top'){
          delta_h = point[1] + h_block;
        } else if(direct == 'bottom'){
          delta_h = point[1] - h_block;
        }
        var obj = this;

        document.onmousemove = function(event){
            obj.resize_block(obj,event);
        }

      },
      resize_block: function(obj,e){
        var point = obj.getXY(e);

        var block_min_width = this.block_min_width;
        var block_min_height = this.block_min_height;

        if(typeof getComputedStyle !== 'undefined'){
          var block_left = parseInt(getComputedStyle(element).left);
          var block_top = parseInt(getComputedStyle(element).top);
        } else{
          var block_left = parseInt(element.currentStyle['left']);
          var block_top = parseInt(element.currentStyle['top']);
        }


        var block_width = element.offsetWidth;
        var block_height = element.offsetHeight;

        if(direct == 'nw'){
          var new_w = delta_w - point[0];
          var left = block_left + (block_width - new_w);
          var new_h = delta_h - point[1];
          var top = block_top + (block_height - new_h);


          if(block_width > block_min_width){
            element.style.left = left + "px";
            element.style.width = new_w + "px";
          } else{
            if(point[0] <= block_left){
              element.style.left = left + "px";
              element.style.width = new_w + "px";
            }
          }

          if(block_height > block_min_height){
            element.style.top = top + 'px';
            element.style.height = new_h + "px";
          } else{
            block_top = element.offsetTop;
            if(point[1] <= block_top){
              element.style.top = top + 'px';
              element.style.height = new_h + "px";
            }
          }



        } else if(direct == 'sw'){
          var new_w = delta_w - point[0];
          var new_h = point[1] - delta_h;
          var left = block_left + (block_width - new_w);

          if(block_width > block_min_width){
            element.style.left = left + "px";
            element.style.width = new_w + "px";
          } else{
            if(point[0] <= block_left){
              element.style.left = left + "px";
              element.style.width = new_w + "px";
            }
          }

          if(block_height > block_min_height){
            var new_h = point[1] - delta_h;
            element.style.height = new_h + "px";
          } else{
            block_top = element.offsetTop;
            if(point[1] >= block_top + block_height){
              var new_h = point[1] - delta_h;
              element.style.height = new_h + "px";
            }
          }


        } else if(direct == 'ne'){
          var new_w = point[0] - delta_w;
          var new_h = delta_h - point[1];
          var top = block_top + (block_height - new_h);

          if(block_height > block_min_height){
            element.style.top = top + 'px';
            element.style.height = new_h + "px";
          } else{
            block_top = element.offsetTop;
            if(point[1] <= block_top){
              element.style.top = top + 'px';
              element.style.height = new_h + "px";
            }
          }

          if(block_width > block_min_width){
            element.style.width = new_w + "px";
          } else{
            if(point[0] > block_left + block_width){
              element.style.width = new_w + "px";
            }
          }


        } else if(direct == 'se'){
          var new_w = point[0] - delta_w;
          var new_h = point[1] - delta_h;

          if(block_width > block_min_width){
            element.style.width = new_w + "px";
          } else{
            if(point[0] > block_left + block_width){
              element.style.width = new_w + "px";
            }
          }

          if(block_height > block_min_height){
            var new_h = point[1] - delta_h;
            element.style.height = new_h + "px";
          } else{
            block_top = element.offsetTop;
            if(point[1] >= block_top + block_height){
              var new_h = point[1] - delta_h;
              element.style.height = new_h + "px";
            }
          }


        } else if(direct == 'left'){
          var new_w = delta_w - point[0];
          var left = block_left + (block_width - new_w);

          if(block_width > block_min_width){
            element.style.left = left + "px";
            element.style.width = new_w + "px";
          } else{
            if(point[0] <= block_left){
              element.style.left = left + "px";
              element.style.width = new_w + "px";
            }
          }
        } else if(direct == 'right'){
          var new_w = point[0] - delta_w;

          if(block_width > block_min_width){
            element.style.width = new_w + "px";
          } else{
            if(point[0] > block_left + block_width){
              element.style.width = new_w + "px";
            }
          }
        } else if(direct == 'top'){
          var new_h = delta_h - point[1];
          var top = block_top + (block_height - new_h);
          if(block_height > block_min_height){
            element.style.top = top + 'px';
            element.style.height = new_h + "px";
          } else{
            block_top = element.offsetTop;
            if(point[1] <= block_top){
              element.style.top = top + 'px';
              element.style.height = new_h + "px";
            }
          }
        } else if(direct == 'bottom'){
          if(block_height > block_min_height){
            var new_h = point[1] - delta_h;
            element.style.height = new_h + "px";
          } else{
            block_top = element.offsetTop;
            if(point[1] > block_top + block_height){
              var new_h = point[1] - delta_h;
              element.style.height = new_h + "px";
            }
          }
        }
      },
      clear: function(element){
        check_move_block = false;
        direct = '';
        document.onmousemove = null;
      }
    }
  }
