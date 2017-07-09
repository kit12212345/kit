<style media="screen">
  #box{
    /*box-shadow: 5px 3px 4px 2px #000;*/
  }
</style>


<div id="box" style="width: 200px; height: 200px; margin: auto; border: 1px solid #ccc; background: #eee; margin-top: 200px;"></div>


<div style="margin-top: 100px;">
  <div style="display: inline-block;">Смещение по ширине: <input oninput="box_shadow_edit.set_shadow()" type="number" id="b_s_xofst" name="" value="0"></div>
  <div style="display: inline-block;">Смещение по высоте: <input oninput="box_shadow_edit.set_shadow()" type="number" id="b_s_yofst" name="" value="0"></div>
  <div style="display: inline-block;">Радиус размытия: <input oninput="box_shadow_edit.set_shadow()" type="number" id="b_s_rds" name="" value="0"></div>
  <div style="display: inline-block;">Растяжение: <input oninput="box_shadow_edit.set_shadow()" type="number" id="b_s_stch" name="" value="0"></div>
  <div style="display: inline-block;">Внутреняя тень: <input onchange="box_shadow_edit.set_shadow(this.checked)" type="checkbox" id="b_s_inset"></div>
</div>

<script type="text/javascript">
  var box = document.getElementById('box');

  var box_shadow_edit = {
    get_value: function() {
      return {
        xofst: document.getElementById('b_s_xofst').value,
        yofst: document.getElementById('b_s_yofst').value,
        rds: document.getElementById('b_s_rds').value,
        stch: document.getElementById('b_s_stch').value,
        inset: document.getElementById('b_s_inset').checked
      }
    },
    set_shadow: function(change_inset) {
      var val_obj = this.get_value();
      if(change_inset === true || val_obj.inset === true){
        box.style.boxShadow = val_obj.xofst + 'px ' +  val_obj.yofst + 'px '
         + val_obj.rds + 'px ' + val_obj.stch + 'px #000 inset';
      } else{
        box.style.boxShadow = val_obj.xofst + 'px ' +  val_obj.yofst + 'px '
         + val_obj.rds + 'px ' + val_obj.stch + 'px #000';
      }
    }
  }


</script>
