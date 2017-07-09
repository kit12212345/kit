<link rel="stylesheet" href="/css/animations/new_anim.css">

<script type="text/javascript">
  var $init = new init_block(document.getElementById('w_panel'));
  $init.move_block.init();
</script>
<div class="pm_grid">
  <div class="w_item">
    <div class="w_i_title">Анимация</div>
    <div>
      <div class="btn btn_view" onclick="_animate.show_modal();">
        Выбрать анимацию
      </div>
    </div>
  </div>
</div>
<div id="anim__edit" style="display: none;">
  <div class="pm_grid">
    <div class="w_item">
      <div class="w_i_title">Скорость анимации:</div>
      <input class="full_w" type="number" id="ch_speed_anim" oninput="_animate.change_speed(this)" value="1000">
    </div>
  </div>

  <div class="pm_grid">
    <div class="w_item">
      <div class="w_i_title">Текщая анимация</div>
      <div>
        <div class="btn btn_view" onclick="_animate.show_animate();">
          Показать анимацию
        </div>
        <div class="anim_in_panel" id="p_now_anim" data-anim="rollIn">
          <img src="/images/template_images/img_9.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
</div>
