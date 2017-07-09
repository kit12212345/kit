<div class="pm_grid">
  <div class="w_item">
    <div class="w_i_title">Фоновое изображение</div>
    <div>
      <div class="btn btn_view" onclick="select_background_iamge.show_modal();">
        Выбрать изображение
      </div>
    </div>
  </div>
</div>
<div class="pm_grid">
<div class="w_item">
  <div class="w_i_title">Фон:</div>
  <div class="i_block t_middle el_background color_el" id="el_background" name="background" onclick="edit_element.change_background(this);"></div>
  <label style="color: #fff;">Прозрачный&nbsp;&nbsp;<input id="el_background_trans" onchange="edit_element.change_background(this,this.checked);" type="checkbox" name="" class="t_middle" style="width: auto;" value=""></label>
</div>
<div class="w_item" style="display: none;">
  <div class="i_block t_middle w_i_title">Цвет текста:</div>
  <div class="i_block t_middle el_background color_el" id="el_color" name="color" onclick="edit_element.change_color(this);"></div>
</div>
</div>
