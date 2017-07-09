"use strict";

  var check_move_block = false;
  var ie = 0;
  var op = 0;
  var ff = 0;
  var block;
  var direct;
  var delta_w = 0;
  var delta_h = 0;

  function init_block(element,e){
    this.move_block = {
      delta_x: 0,
      delta_y: 0,
      init: function(){
        var ie = 0;
        var op = 0;
        var ff = 0;
        var browser = navigator.userAgent;
        if (browser.indexOf("Opera") != -1) op = 1;
        else {
          if (browser.indexOf("MSIE") != -1) ie = 1;
          else {
            if (browser.indexOf("Firefox") != -1) ff = 1;
          }
        }
        var obj = this;

        element.onmousedown= function(e){
          obj.saveXY(e);
        };

        element.onmouseup = function(e){
          obj.clearXY(e);
        }
      },
      saveXY: function(e) {
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
          var x_block = parseInt(getComputedStyle(element).marginLeft);
          var y_block = parseInt(getComputedStyle(element).marginTop);
        } else{
          var x_block = parseInt(element.currentStyle['left']);
          var y_block = parseInt(element.currentStyle['top']);
        }


        this.delta_x = x_block - x;
        this.delta_y = y_block - y;
        document.onmousemove = function(e) {
          obj.move(e);
        };
        if (op || ff) document.addEventListener("onmousemove", this.move, false);
      },
      clearXY:function() {
        document.onmousemove = null;
      },
      move: function(e){
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

        var new_x = this.delta_x + x;
        var new_y = this.delta_y + y;
        element.style.marginTop = new_y + "px";
        element.style.marginLeft = new_x + "px";
      }
    }; // END MOVE
    this.resize_block = {
      init: function() {
          e = e ? e : window.event;

          var element_width = element.offsetWidth;
          var element_height = element.offsetHeight;
          var size_move = 5;
          if(!check_move_block){
            if(e.offsetX >= 0 && e.offsetX <= size_move && e.offsetY >= 0 && e.offsetY <= size_move){
              element.style.cursor = 'nw-resize';
              this.add('nw');
            } else if(e.offsetX >= 0 && e.offsetX <= size_move && e.offsetY >= element_height - size_move && e.offsetY <= element_height){
              element.style.cursor = 'sw-resize';
              this.add('sw');
            } else if(e.offsetX >= element_width - size_move && e.offsetX <= element_width && e.offsetY >= 0 && e.offsetY <= size_move){
              element.style.cursor = 'ne-resize';
              this.add('ne');
            } else if(e.offsetX >= element_width - size_move && e.offsetX <= element_width && e.offsetY >= element_height - size_move && e.offsetY <= element_height){
              element.style.cursor = 'se-resize';
              this.add('se');
            } else if(e.offsetX >= 0 && e.offsetX <= size_move){
              element.style.cursor = 'w-resize';
              this.add('left');
            } else if(e.offsetX >= element_width - size_move && e.offsetX <= element_width){
              element.style.cursor = 'e-resize';
              this.add('right');
            } else if(e.offsetY >= 0 && e.offsetY <= size_move){
              element.style.cursor = 'n-resize';
              this.add('top');
            } else if(e.offsetY >= element_height - size_move && e.offsetY <= element_height){
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

        if(typeof getComputedStyle !== 'undefined'){
          var block_left = parseInt(getComputedStyle(element).left);
          var block_top = parseInt(getComputedStyle(element).top);
        } else{
          var block_left = parseInt(element.currentStyle['left']);
          var block_top = parseInt(element.currentStyle['top']);
        }


        var block_width = element.offsetWidth;
        var block_height = element.offsetHeight;
        var block_min_width = 50;
        var block_min_height = 50;
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
            element.setAttribute('style','width: 400px; height: 400px; position: relative; background: blue; left: ' + left + "px;");
            element.style.width = new_w + "px";
          } else{
            if(point[0] <= block_left){
              element.setAttribute('style','width: 400px; height: 400px; position: relative; background: blue; left: ' + left + "px;");
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
