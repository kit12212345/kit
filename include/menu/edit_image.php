<?php
$root_dir = $_SERVER['DOCUMENT_ROOT'];
$var_path = $root_dir.'/include/edit_element/image';
?>

<div class="w_panel__cont">
  <div class="w_panel__head">
    <div class="w_menu active_menu" id="p_main">Основные</div>
    <div class="w_menu" id="p_indents">Отступы</div>
    <div class="w_menu" id="p_anim">Анимация</div>
    <div class="w_menu" id="p_events">События</div>
  </div>
  <div class="clear"></div>
  <div class="w_panel_cont" id="c_main" style="display: block;">
    <?php
    include($var_path.'/main.php'); /*Основные стили*/
    ?>
  </div>
  <div class="w_panel_cont" id="c_indents" style="display: none;">
    <?php
    include($var_path.'/indents.php'); /*Отступы*/
    ?>
  </div>
  <div class="w_panel_cont" id="c_anim" style="display: none;">
    <?php
    include($var_path.'/animation.php'); /*Анимации*/
    ?>
  </div>
  <div class="w_panel_cont" id="c_events" style="display: none;">
    <?php
    include($var_path.'/events.php'); /*СОбытия*/
    ?>
  </div>
</div>
