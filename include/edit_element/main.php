<div class="pm_grid">
  <div class="w_item">
    <div class="w_i_title">Ширина</div>
    <div>
      <input type="number" value="0" id="ch_el_width" oninput="edit_element.change_width(this)">
      <select class="" onchange="edit_element.change_width(document.getElementById('ch_el_width'),this.value)" id="ch_type_width">
        <option value="px">px</option>
        <option value="prc">%</option>
      </select>
    </div>
  </div>
  <div class="w_item">
    <div class="w_i_title">Высота</div>
    <div>
      <input type="number" value="0" oninput="edit_element.change_height(this)" id="ch_el_height">
      <select class="" onchange="edit_element.change_height(document.getElementById('ch_el_height'),this.value)" id="ch_type_height">
        <option value="px">px</option>
        <option value="prc">%</option>
      </select>
    </div>
  </div>
</div>
<div class="pm_grid">
<div class="w_item relative full_w">
  <div id="m_border_style" class="i_block t_middle">
    <div class="w_i_title">Обводка:</div>
    <input data-style="border" type="number" id="ch_el_border" oninput="edit_element.change_border(this)" name="" value="">
    <select onchange="edit_element.change_border(this.previousElementSibling,this.value)" id="ch_type_border">
      <option value="solid">solid</option>
      <option value="dotted">dotted</option>
      <option value="dashed">dashed</option>
      <option value="double">double</option>
      <option value="groove">groove</option>
      <option value="ridge">ridge</option>
      <option value="inset">inset</option>
      <option value="outset">outset</option>
    </select>
    <div data-border-color="borderColor" name="borderColor" class="i_block t_middle el_background color_el" id="el_border_color" onclick="edit_element.change_border_color(this);"></div>
  </div>
  <div id="border_m_styles" class="i_block" style="display:none;">
    <div class="w_i_title">Вверх:</div>
    <input data-style="borderTop" type="number" id="ch_el_border_top" oninput="edit_element.change_border(this)" name="" value="">
    <select onchange="edit_element.change_border(this.previousElementSibling,this.value)" id="ch_type_border_top">
      <option value="solid">solid</option>
      <option value="dotted">dotted</option>
      <option value="dashed">dashed</option>
      <option value="double">double</option>
      <option value="groove">groove</option>
      <option value="ridge">ridge</option>
      <option value="inset">inset</option>
      <option value="outset">outset</option>
    </select>
    <div data-border-color="borderTopColor" name="borderTopColor" class="i_block t_middle el_background color_el" id="el_border_color_top" onclick="edit_element.change_border_color(this);"></div>

    <div class="w_i_title">Низ:</div>
    <input data-style="borderBottom" type="number" id="ch_el_border_bottom" oninput="edit_element.change_border(this)" name="" value="">
    <select onchange="edit_element.change_border(this.previousElementSibling,this.value)" id="ch_type_border_bottom">
      <option value="solid">solid</option>
      <option value="dotted">dotted</option>
      <option value="dashed">dashed</option>
      <option value="double">double</option>
      <option value="groove">groove</option>
      <option value="ridge">ridge</option>
      <option value="inset">inset</option>
      <option value="outset">outset</option>
    </select>
    <div data-border-color="borderBottomColor" name="borderBottomColor" class="i_block t_middle el_background color_el" id="el_border_color_bottom" onclick="edit_element.change_border_color(this);"></div>


    <div class="w_i_title">Лево:</div>
    <input data-style="borderLeft" type="number" id="ch_el_border_left" oninput="edit_element.change_border(this)" name="" value="">
    <select onchange="edit_element.change_border(this.previousElementSibling,this.value)" id="ch_type_border_left">
      <option value="solid">solid</option>
      <option value="dotted">dotted</option>
      <option value="dashed">dashed</option>
      <option value="double">double</option>
      <option value="groove">groove</option>
      <option value="ridge">ridge</option>
      <option value="inset">inset</option>
      <option value="outset">outset</option>
    </select>
    <div data-border-color="borderLeftColor" name="borderLeftColor" class="i_block t_middle el_background color_el" id="el_border_color_left" onclick="edit_element.change_border_color(this);"></div>

    <div class="w_i_title">Право:</div>
    <input data-style="borderRight" type="number" id="ch_el_border_right" oninput="edit_element.change_border(this)" name="" value="">
    <select onchange="edit_element.change_border(this.previousElementSibling,this.value)" id="ch_type_border_right">
      <option value="solid">solid</option>
      <option value="dotted">dotted</option>
      <option value="dashed">dashed</option>
      <option value="double">double</option>
      <option value="groove">groove</option>
      <option value="ridge">ridge</option>
      <option value="inset">inset</option>
      <option value="outset">outset</option>
    </select>
    <div data-border-color="borderRightColor" name="borderRightColor" class="i_block t_middle el_background color_el" id="el_border_color_right" onclick="edit_element.change_border_color(this);"></div>
  </div>
  <div data-more="border" class="absolute btn_more_style btn_open_b_s" id="more_border_style">
    <div class="m_sprite arrow_menu i_block t_middle e_more_style"></div>
  </div>
</div>
</div>
<div class="pm_grid">
  <div class="w_item">
    <div class="w_i_title">Фоновое изображение</div>
    <div>
      <div class="btn btn_view" onclick="element_select_image.show_modal('backgroundImage');">
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
<div class="pm_grid">
<div class="w_item relative full_w">
  <div class="w_i_title title_b_s" id="b_s_title">Тень элемента</div>
  <div id="b_s_content" style="display: none;">
    <div class="w_i_title item_b_shadow">Смещение по ширине: <input type="number" id="b_s_xofst" oninput="edit_element.change_box_shadow()" value="0" class="float_r"></div><div class="clear"></div>
    <div class="w_i_title item_b_shadow">Смещение по высоте: <input type="number" id="b_s_yofst" oninput="edit_element.change_box_shadow()" value="0" class="float_r"></div><div class="clear"></div>
    <div class="w_i_title item_b_shadow">Радиус размытия: <input type="number" id="b_s_rds" oninput="edit_element.change_box_shadow()" value="0" class="float_r"></div><div class="clear"></div>
    <div class="w_i_title item_b_shadow">Растяжение: <input type="number" id="b_s_stch" oninput="edit_element.change_box_shadow()" value="0" class="float_r"></div><div class="clear"></div>
    <div class="w_i_title item_b_shadow">Внутреняя тень? <input type="checkbox" id="b_s_inset" onchange="edit_element.change_box_shadow(this.checked)" class="float_r"></div><div class="clear"></div>
  </div>
  <div class="absolute btn_more_style btn_open_b_s" id="set_shadow">
    <div class="m_sprite arrow_menu i_block t_middle e_more_style"></div>
  </div>
</div>
</div>
<div class="pm_grid">
<div class="w_item relative full_w">
  <div id="m_border_radius_style" class="i_block t_middle">
    <div class="w_i_title">Скругление углов:</div>
    <input data-style="borderRadius" class="full_w" type="number" id="ch_el_border_radius" oninput="edit_element.change_border_radius(this)" name="" value="">
  </div>
  <div id="border_radius_m_style" class="i_block t_middle" style="display: none;">
    <div class="w_i_title">Скругление вверх-лево:</div>
    <input data-style="borderTopLeftRadius" class="full_w" type="number" id="ch_el_border_top_left_radius" oninput="edit_element.change_border_radius(this)" name="" value="">

    <div class="w_i_title">Скругление вверх-право:</div>
    <input data-style="borderTopRightRadius" class="full_w" type="number" id="ch_el_border_top_right_radius" oninput="edit_element.change_border_radius(this)" name="" value="">

    <div class="w_i_title">Скругление низ-лево:</div>
    <input data-style="borderBottomLeftRadius" class="full_w" type="number" id="ch_el_border_bottom_left_radius" oninput="edit_element.change_border_radius(this)" name="" value="">

    <div class="w_i_title">Скругление низ-право:</div>
    <input data-style="borderBottomRightRadius" class="full_w" type="number" id="ch_el_border_bottom_right_radius" oninput="edit_element.change_border_radius(this)" name="" value="">
  </div>
  <div data-more="border" class="absolute btn_more_style btn_open_b_s" id="more_border_radius_styles">
    <div class="m_sprite arrow_menu i_block t_middle e_more_style"></div>
  </div>
</div>
</div>
<div class="w_item">
<div class="w_i_title">Выровнить по центру:</div>
<input type="checkbox" id="ch_el_center_align" onchange="edit_element.align_center(this)">
</div>
