<link rel="stylesheet" href="/css/owner_styles.css">
<style media="screen">
.modal_text_shadow{
  background: #eee;
  padding: 10px;
  border-radius: 3px;
  width: 200px;
  top: 8px;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  height: 200px;
}
.editor_text_shadow{
  width: 80px;
  height: 80px;
  border: 1px solid #ccc;
  border-radius: 2px;
}
.e_sh__x, .e_sh__y{
  background: #d4d4d4;
}
.e_sh__x{
  width: 100%;
  left: 0;
  height: 1px;
  top: 0px;
  bottom: 0px;
  margin: auto;
}
.e_sh__y{
  height: 100%;
  width: 1px;
  top: 0px;
  left: 0px;
  right: 0px;
  margin: auto;
}
.line_edit_t_sh{
  background: #000;
  margin: auto;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: 1px;
  height: 1px;
}
#arc{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 10px;
  height: 10px;
  background:#0501ea;
  box-shadow: 1px 1px 3px 1px #0501ea;
  border-radius: 50%;
}
body{
  background: #fff;
}
</style>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <script src="/js/core/dom.js" charset="utf-8"></script>
    <script src="/js/main.js" charset="utf-8"></script>
  </head>
  <body>
    <div id="test_text" style="width: 100px; margin: auto; margin-bottom: 50px; margin-top: 20px;">
      ASDASDASDSD
    </div>
    <div class="absolute modal_text_shadow">
    <div id="canv" class="relative editor_text_shadow">
      <span class="absolute e_sh__x"></span>
      <span class="absolute e_sh__y"></span>
      <canvas id="canvas" width="80" height="80"></canvas>
      <div id="arc"></div>
    </div>
  </div>
  <div class="">
    PosX = <input type="number" class="t_sh_i_change" id="pos_x" name="" value="0">
    PosY = <input type="number" class="t_sh_i_change" id="pos_y" name="" value="0">
  </div>
  <!--
    <div id="canv" style="position: relative; display: block; margin: auto; width: 200px; height: 200px; margin-top: 50px;">
      <canvas id="canvas" width="300" height="300"></canvas>
      <div id="arc" style="position: absolute; top: 0px; left: 0px; width: 20px; height: 20px; background:#0501ea; border-radius: 50%;"></div>
    </div>
  -->
    <script type="text/javascript">

    function change_text_shadow(x,y){
        document.getElementById('test_text').style.textShadow = x + 'px ' + y + 'px ' + '2px #ccc';
    }

    for (var i = 0; i < document.getElementsByClassName('t_sh_i_change').length; i++) {
      _e.addEvent(document.getElementsByClassName('t_sh_i_change')[i],'input',function(e){

        var canv_parent = document.getElementById('canv');
        var i_pos_x = parseInt(document.getElementById('pos_x').value) + 33;
        var i_pos_y = parseInt(document.getElementById('pos_y').value) + 33;
        var arc = document.getElementById('arc');

        i_pos_x = i_pos_x >= canv_parent.offsetWidth - arc.offsetWidth ? canv_parent.offsetWidth - arc.offsetWidth : i_pos_x;
        i_pos_y = i_pos_y >= canv_parent.offsetHeight - arc.offsetHeight ? canv_parent.offsetHeight - arc.offsetHeight : i_pos_y;

        if(i_pos_x <= 0) i_pos_x = 0;
        if(i_pos_y <= 0) i_pos_y = 0;


        arc_pos.x = i_pos_x;
        arc_pos.y = i_pos_y;

        arc.style.left = arc_pos.x;
        arc.style.top = arc_pos.y;

        change_text_shadow(arc_pos.x - 33,arc_pos.y - 33);
        draw_line(arc_pos.x + 5,arc_pos.y + 5,true);

      });
    }

    var arc_pos = {
      x: 0,
      y: 0
    }

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
    var element = document.getElementById('arc');

    var move_block = {
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

        var new_x = delta_x + x;
        var new_y = delta_y + y;
        var parent_block = document.getElementById('canv');
        if(new_x >= 0 && new_x <= parent_block.offsetWidth - element.offsetWidth){
          element.style.left = new_x + "px";
          arc_pos.x = new_x;
        }
        if(new_y >= 0 && new_y <= parent_block.offsetHeight - element.offsetHeight){
          element.style.top = new_y + "px";
          arc_pos.y = new_y;
        }

        document.getElementById('pos_x').value = arc_pos.x - 33;
        document.getElementById('pos_y').value = arc_pos.y - 33;
        change_text_shadow(arc_pos.x - 33,arc_pos.y - 33);
        draw_line(arc_pos.x + 5,arc_pos.y + 5,true);
      }
    };

    _e.addEvent(element,'mousemove',function(e){
      move_block.init(e);
    });


      var draw = document.getElementById('canvas');
      if(draw.getContext){
        var context = draw.getContext('2d');

        context.beginPath();


        function draw_line(x,y,_clear){
          if(_clear === true){
          }
          context.beginPath();
          context.strokeStyle = '#000000';
          context.moveTo(39,39);
          context.clearRect(0,0,80,80);
          context.lineTo(x,y);
          context.stroke();
        }
        draw_line(5,5);
        context.stroke();
      }
    </script>

  </body>
</html>
