
<style media="screen">
#block_text{
  background: #fff;
  border:1px solid #ccc;
  padding: 10px;
}
.icon_edit_text{
  width: 14px;
  height: 14px;
}
.icon_text_left{
  background-position: -263px -48px;
}
.icon_text_center{
  background-position: -288px -48px;
}
.icon_text_right{
  background-position: -313px -48px;
}
.icon_text_strong{
  background-position: -145px -48px;
}
.icon_text_underline{
  background-position: -167px -48px;
}
.icon_text_curs{
  background-position: -191px -48px;
}
.t_ed__item{
  padding: 2px;
  width: 24px;
  text-align: center;
  border-radius: 2px;
  border: 1px solid #4b5b6b;
  background: #3B556E;
  background: -moz-linear-gradient(top, #46637e 0%, #3B556E 40%, #344a5f 100%);
  background: -webkit-linear-gradient(top, #46637e 0%,#3B556E 40%,#344a5f 100%);
  background: linear-gradient(to bottom, #46637e 0%,#3B556E 40%,#344a5f 100%);
}
.active_t_ed__item{
  box-shadow: 0 0 1px rgba(0,0,0,.5) inset, 0 2px 3px rgba(0,0,0,.5) inset, 0 1px 1px rgba(255,255,255,.1);
}
.modal_text_shadow{
  background: #eee;
  padding: 10px;
  border-radius: 3px;
  width: 234px;
  /*top: 8px;*/
    /*top: 131px;
    */
    margin-top: 10px;
  height: 120px;
}
.editor_text_shadow{
  width: 70px;
  height: 70px;
  border: 1px solid #ccc;
  border-radius: 2px;
}
.e_sh__x, .e_sh__y{
  background: #000;
  opacity: 0.05;
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
  top: 29px;
  left: 29px;
  width: 10px;
  height: 10px;
  background:#0501ea;
  box-shadow: 0px 0px 3px 1px #0501ea;
  border-radius: 50%;
}
.r_menu_t_sh{
  width: 125px;
  margin-left: 5px;
}
.r_menu_t_sh .r_menu_t__item:not(:first-child){
  margin-top: 5px;
}
.m_change_font_size{
  display: none;
  padding:6px;
  background:#eee;
  top: -40px;
  left: 25px;
  width: 100px;
  height: 62px;
  border-radius: 2px;
}
</style>
<div class="pm_grid">
  <div class="w_item full_w">
    <div class="w_i_title">Добавление текста</div>
    <div>
      <div data-font="strong" class="i_block edit_font t_ed__item">
        <div class="m_sprite icon_edit_text icon_text_strong"></div>
      </div>
      <div data-font="underline" class="i_block edit_font t_ed__item">
        <div class="m_sprite icon_edit_text icon_text_underline"></div>
      </div>
      <div data-font="curs" class="i_block edit_font t_ed__item" style="margin-right: 5px;">
        <div class="m_sprite icon_edit_text icon_text_curs"></div>
      </div>

      <div data-aling="left" class="i_block edit_align t_ed__item active_t_ed__item">
        <div class="m_sprite icon_edit_text icon_text_left"></div>
      </div>
      <div data-aling="center" class="i_block edit_align t_ed__item">
        <div class="m_sprite icon_edit_text icon_text_center"></div>
      </div>
      <div data-aling="right" class="i_block edit_align t_ed__item" style="margin-right: 5px;">
        <div class="m_sprite icon_edit_text icon_text_right"></div>
      </div>

      <div id="open_text_shadow_edit" class="i_block relative t_ed__item">
        <div class="m_sprite icon_edit_text icon_text_right" style="background-position: -240px -48px;"></div>
      </div>
      <div id="open_color_edit" class="i_block relative t_ed__item">
        <div class="m_sprite icon_edit_text icon_text_right" style="background-position: -72px -72px"></div>
      </div>
      <div class="i_block relative relative t_ed__item">
        <div id="open_font_size_edit">
          <div class="m_sprite icon_edit_text icon_text_right" style="background-position: -216px -48px;"></div>
        </div>
        <div class="absolute text_left m_change_font_size" id="m_change_font_size">
          <div class="i_block">
            <div class="r_menu_t__item">
              <div>Шрифт</div>
               <input type="number" class="t_sh_i_change" id="c_font_size" name="" value="0"> px
            </div>
          </div>
        </div>
      </div>
    </div>
    <div contenteditable="true" id="block_text" name="name" class="full_w"></div>
    <div class="modal_text_shadow" id="modal_text_shadow" style="display: none;">
      <div id="canv" class="relative editor_text_shadow i_block">
        <span class="absolute e_sh__x"></span>
        <span class="absolute e_sh__y"></span>
        <canvas id="canvas" width="70" height="70"></canvas>
        <div id="arc"></div>
      </div>
      <div class="i_block r_menu_t_sh">
        <div class="r_menu_t__item">
          <span>Ось X :</span> <input type="number" class="t_sh_i_change" id="pos_x" name="" value="0">
        </div>
        <div class="r_menu_t__item">
          <span>Ось Y :</span> <input type="number" class="t_sh_i_change" id="pos_y" name="" value="0">
        </div>
      </div>
      <div style="margin-top: 5px;">
        <span>Размытие:</span>
        <input type="number" id="i_bloor" name="" value="0">
        <div name="textShadow" class="i_block t_middle el_background color_el" id="change_t_shadow_color"></div>
      </div>
    </div>
  </div>
</div>
