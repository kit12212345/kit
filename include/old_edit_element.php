<div class="w_panel" id="w_panel" style="display: none; height: 300px;">
  <div class="w_panel__cont">
    <div class="w_panel__head">
      <div class="w_menu active_menu" id="p_main">Основные</div>
      <div class="w_menu" id="p_indents">Отступы</div>
      <div class="w_menu">Текст</div>
      <div id="show_type_panel" class="show_type_panel">H</div>
      <div class="m_select_view_panel" id="m_s_view_panel">
        <div class="m_s_item v_modal" id="v_modal"></div>
        <div class="m_s_item v_bottom" id="v_bottom"></div>
        <div class="m_s_item v_right" id="v_right"></div>
      </div>
    </div>
    <div class="clear"></div>
    <div class="w_panel_cont" id="c_main">
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
      <div class="clear" style="margin-top: 50px;"></div>
    <div class="w_item">
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
      <div data-more="border" class="i_block btn_more_style">
        <div class="m_sprite arrow_menu i_block t_middle e_more_style"></div>
      </div>
    </div>
    <div class="clear" style="margin-bottom: 50px;"></div>
    <div class="w_item">
      <div class="i_block t_middle w_i_title">Цвет фона:</div>
      <div class="i_block t_middle el_background color_el" id="el_background" name="background" onclick="edit_element.change_background(this);"></div>
    </div>
    <div class="w_item">
      <div class="i_block t_middle w_i_title">Цвет текста:</div>
      <div class="i_block t_middle el_background color_el" id="el_color" name="color" onclick="edit_element.change_color(this);"></div>
    </div>
    <div class="w_item">
      <div class="w_i_title">Скругление углов:</div>
      <input type="number" id="ch_el_border_radius" oninput="edit_element.change_border_radius(this)" name="" value="">
    </div>
    <div class="w_item">
      <div class="w_i_title">Выровнить по центру:</div>
      <input type="checkbox" id="ch_el_center_align" onchange="edit_element.align_center(this)">
    </div>
    </div>
    <div class="w_panel_cont" id="c_indents" style="display: none;">
      <div style="display: inline-block;">
        <div>Внешние отступы: </div>
        <div><div class="item_title">Общий отступ:</div> <input data-type="" class="i_range el_mrg" oninput="edit_element.change_margin(this)" type="range" min="-1000" max="1000" step="1" value="0"><input data-type="" oninput="edit_element.change_margin(this)" class="el_mrg" type="number"> px</div>
        <div><div class="item_title">Отступ сверху:</div> <input data-type="top" class="i_range el_mrg_top" oninput="edit_element.change_margin(this)" type="range" min="-1000" max="1000" step="1" value="0"><input data-type="top" oninput="edit_element.change_margin(this)" class="el_mrg_top" type="number"> px</div>
        <div><div class="item_title">Отступ снизу:</div> <input data-type="bottom" class="i_range el_mrg_bottom" oninput="edit_element.change_margin(this)" type="range" min="-1000" max="1000" step="1" value="0"><input data-type="bottom" oninput="edit_element.change_margin(this)" class="el_mrg_bottom" type="number"> px</div>
        <div><div class="item_title">Отступ слева:</div> <input data-type="left" class="i_range el_mrg_left" oninput="edit_element.change_margin(this)" type="range" min="-1000" max="1000" step="1" value="0"><input data-type="left" oninput="edit_element.change_margin(this)" class="el_mrg_left" type="number"> px</div>
        <div><div class="item_title">Отступ справа:</div> <input data-type="right" class="i_range el_mrg_right" oninput="edit_element.change_margin(this)" type="range" min="-1000" max="1000" step="1" value="0"><input data-type="right" oninput="edit_element.change_margin(this)" class="el_mrg_right" type="number"> px</div>
      </div>
      <div style="display: inline-block;">
        <div>Внутренние отступы: </div>
        <div><div class="item_title">Отступ сверху:</div> <input data-type="top" class="i_range el_pdg_top" oninput="edit_element.change_padding(this)" type="range" min="-1000" max="1000" step="1" value="0"><input data-type="top" oninput="edit_element.change_padding(this)" class="el_pdg_top" type="number"> px</div>
        <div><div class="item_title">Отступ снизу:</div> <input data-type="bottom" class="i_range el_pdg_bottom" oninput="edit_element.change_padding(this)" type="range" min="-1000" max="1000" step="1" value="0"><input data-type="bottom" oninput="edit_element.change_padding(this)" class="el_pdg_bottom" type="number"> px</div>
        <div><div class="item_title">Отступ слева:</div> <input data-type="left" class="i_range el_pdg_left" oninput="edit_element.change_padding(this)" type="range" min="-1000" max="1000" step="1" value="0"><input data-type="left" oninput="edit_element.change_padding(this)" class="el_pdg_left" type="number"> px</div>
        <div><div class="item_title">Отступ справа:</div> <input data-type="right" class="i_range el_pdg_right" oninput="edit_element.change_padding(this)" type="range" min="-1000" max="1000" step="1" value="0"><input data-type="right" oninput="edit_element.change_padding(this)" class="el_pdg_right" type="number"> px</div>
      </div>
    </div>
  </div>
</div>
