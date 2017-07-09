
<div class="pm_grid">
  <div class="w_item relative">
    <div id="m_margin_style" class="i_block t_middle">
      <div class="w_i_title">Внешние отступы:</div>
      <input data-style="margin" class="i_range el_mrg" oninput="edit_element.change_margin(this)" type="range" min="-1000" max="1000" step="1" value="0">
      <input data-style="margin" oninput="edit_element.change_margin(this)" class="el_mrg i_mrg_text" type="number">
      <select class="" onchange="edit_element.change_margin(this.previousElementSibling,this.value)">
        <option value="px">px</option>
        <option value="prc">%</option>
      </select>
    </div>
    <div id="m_margin_m_style" class="i_block t_middle" style="display: none;">
      <div class="w_i_title w_title_mrg">Внешний отступ сверху:</div>
      <input data-style="marginTop" class="i_range el_mrg" oninput="edit_element.change_margin(this)" type="range" min="-1000" max="1000" step="1" value="0">
      <input data-style="marginTop" oninput="edit_element.change_margin(this)" class="el_mrg i_mrg_text" type="number">
      <select class="" onchange="edit_element.change_margin(this.previousElementSibling,this.value)">
        <option value="px">px</option>
        <option value="prc">%</option>
      </select>


      <div class="w_i_title w_title_mrg">Внешний отступ слево:</div>
      <input data-style="marginLeft" class="i_range el_mrg" oninput="edit_element.change_margin(this)" type="range" min="-1000" max="1000" step="1" value="0">
      <input data-style="marginLeft" oninput="edit_element.change_margin(this)" class="el_mrg i_mrg_text" type="number">
      <select class="" onchange="edit_element.change_margin(this.previousElementSibling,this.value)">
        <option value="px">px</option>
        <option value="prc">%</option>
      </select>


      <div class="w_i_title w_title_mrg">Внешний отступ снизу:</div>
      <input data-style="marginBottom" class="i_range el_mrg" oninput="edit_element.change_margin(this)" type="range" min="-1000" max="1000" step="1" value="0">
      <input data-style="marginBottom" oninput="edit_element.change_margin(this)" class="el_mrg i_mrg_text" type="number">
      <select class="" onchange="edit_element.change_margin(this.previousElementSibling,this.value)">
        <option value="px">px</option>
        <option value="prc">%</option>
      </select>


      <div class="w_i_title w_title_mrg">Внешний отступ справа:</div>
      <input data-style="marginRight" class="i_range el_mrg" oninput="edit_element.change_margin(this)" type="range" min="-1000" max="1000" step="1" value="0">
      <input data-style="marginRight" oninput="edit_element.change_margin(this)" class="el_mrg i_mrg_text" type="number">
      <select class="" onchange="edit_element.change_margin(this.previousElementSibling,this.value)">
        <option value="px">px</option>
        <option value="prc">%</option>
      </select>
    </div>
    <div data-more="border" class="absolute btn_more_style btn_open_b_s" id="more_margin_styles">
      <div class="m_sprite arrow_menu i_block t_middle e_more_style"></div>
    </div>
  </div>
</div>


<div class="pm_grid">
  <div class="w_item relative">
    <div id="m_padding_style" class="i_block t_middle">
      <div class="w_i_title">Внутренние отступы:</div>
      <input data-style="padding" class="i_range el_mrg" oninput="edit_element.change_padding(this)" type="range" min="-1000" max="1000" step="1" value="0">
      <input data-style="padding" oninput="edit_element.change_padding(this)" class="el_mrg i_mrg_text" type="number">
      <select class="" onchange="edit_element.change_padding(this.previousElementSibling,this.value)">
        <option value="px">px</option>
        <option value="prc">%</option>
      </select>
    </div>
    <div id="m_padding_m_style" class="i_block t_middle" style="display: none;">
      <div class="w_i_title w_title_mrg">Внутренний отступ сверху:</div>
      <input data-style="paddingTop" class="i_range el_mrg" oninput="edit_element.change_padding(this)" type="range" min="-1000" max="1000" step="1" value="0">
      <input data-style="paddingTop" oninput="edit_element.change_padding(this)" class="el_mrg i_mrg_text" type="number">
      <select class="" onchange="edit_element.change_padding(this.previousElementSibling,this.value)">
        <option value="px">px</option>
        <option value="prc">%</option>
      </select>


      <div class="w_i_title w_title_mrg">Внутренний отступ слево:</div>
      <input data-style="paddingLeft" class="i_range el_mrg" oninput="edit_element.change_padding(this)" type="range" min="-1000" max="1000" step="1" value="0">
      <input data-style="paddingLeft" oninput="edit_element.change_padding(this)" class="el_mrg i_mrg_text" type="number">
      <select class="" onchange="edit_element.change_padding(this.previousElementSibling,this.value)">
        <option value="px">px</option>
        <option value="prc">%</option>
      </select>


      <div class="w_i_title w_title_mrg">Внутренний отступ снизу:</div>
      <input data-style="paddingBottom" class="i_range el_mrg" oninput="edit_element.change_padding(this)" type="range" min="-1000" max="1000" step="1" value="0">
      <input data-style="paddingBottom" oninput="edit_element.change_padding(this)" class="el_mrg i_mrg_text" type="number">
      <select class="" onchange="edit_element.change_padding(this.previousElementSibling,this.value)">
        <option value="px">px</option>
        <option value="prc">%</option>
      </select>


      <div class="w_i_title w_title_mrg">Внутренний отступ справа:</div>
      <input data-style="paddingRight" class="i_range el_mrg" oninput="edit_element.change_padding(this)" type="range" min="-1000" max="1000" step="1" value="0">
      <input data-style="paddingRight" oninput="edit_element.change_padding(this)" class="el_mrg i_mrg_text" type="number">
      <select class="" onchange="edit_element.change_padding(this.previousElementSibling,this.value)">
        <option value="px">px</option>
        <option value="prc">%</option>
      </select>
    </div>
    <div data-more="border" class="absolute btn_more_style btn_open_b_s" id="more_padding_styles">
      <div class="m_sprite arrow_menu i_block t_middle e_more_style"></div>
    </div>
  </div>
</div>


<!--
<div style="display: inline-block;">
  <div>Внешние отступы: </div>
  <div><div class="item_title">Общий отступ:</div> <input data-type="" class="i_range el_mrg" oninput="edit_element.change_margin(this)" type="range" min="-1000" max="1000" step="1" value="0"><input data-type="" oninput="edit_element.change_margin(this)" class="el_mrg" type="number"> px</div>
  <div><div class="item_title">Отступ сверху:</div> <input data-style="top" class="i_range el_mrg_top" oninput="edit_element.change_margin(this)" type="range" min="-1000" max="1000" step="1" value="0"><input data-type="top" oninput="edit_element.change_margin(this)" class="el_mrg_top" type="number"> px</div>
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
-->
