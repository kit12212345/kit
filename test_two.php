<?php
session_start();
if(!$_SESSION['logged_user']['user_id']){
  $_SESSION['logged_user']['user_id'] = 1;
}
$root_dir = $_SERVER['DOCUMENT_ROOT'];
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
  <meta http-equiv="Content-type" content="text/html; charset=utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <script src="/new_resize.js?ver=<?=rand(1,19999);?>" charset="utf-8"></script>
  <link href='/fonts/fonts.css?family=Roboto:400,300,500' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="/css/template.css?ver=<?=rand(1,10000);?>" type="text/css" media="screen">
  <link rel="stylesheet" href="/css/owner_styles.css?ver=<?=rand(1,1000);?>">
  <link rel="stylesheet" type="text/css" href="/color_picker/style.css?ver=<?=rand(1,19999);?>">
  <link rel="stylesheet" href="/css/svg_icons.css?ver=<?=rand(1,1000);?>">
  <link rel="stylesheet" href="/css/styles.css?ver=<?=rand(1,19999);?>">
  <script src="/new_js/create_element.js?ver=<?=rand(1,19999);?>" charset="utf-8"></script>
  <script src="/js/core/events.js" charset="utf-8"></script>
  <script src="/js/core/functions.js?ver=<?=rand(1,19999);?>" charset="utf-8"></script>
  <script src="/js/core/crossbrowser.js" charset="utf-8"></script>
  <script src="/js/core/dom.js" charset="utf-8"></script>
  <script src="/js/core/ajax.js" charset="utf-8"></script>
  <script src="/js/animate.js" charset="utf-8"></script>
  <script src="/js/main.js?ver=<?php echo rand(1,100000); ?>" charset="utf-8"></script>
  <script src="/js/edit_body.js?ver=<?php echo rand(1,100000); ?>" charset="utf-8"></script>
  <script src="/js/view_site.js?ver=<?php echo rand(1,100000); ?>" charset="utf-8"></script>
  <script src="/js/tree_elements.js?ver=<?php echo rand(1,100000); ?>" charset="utf-8"></script>
  <script src="/js/script_styles.js?ver=<?php echo rand(1,100000); ?>" charset="utf-8"></script>
  <script src="/js/styles/text_edit.js?ver=<?php echo rand(1,100000); ?>" charset="utf-8"></script>
  <script src="/components/uploader/upload.js?ver=<?php echo rand(1,100000); ?>" charset="utf-8"></script>
  <style media="screen">
    .li_common{
      position: absolute;
    }
  </style>
</head>
  <body>
    <div class="modal_body" id="modal_body">
      <div class="modal" id="m__modal">
        <div class="modal_head">
          Выберите изображение
        </div>
        <div class="m_sprite modal_close" onclick="element_select_image.close_modal()"></div>
        <div class="relative modal_content" id="modal_content">
        </div>
      </div>
      <div class="fixed m_view_image" id="m_view_image">
        <div id="b__image"></div>
        <div class="m_sprite modal_close close_view_img" id="close_view_img"></div>
      </div>
      <div class="body_upload_image" id="body_upload_image" style="display: none;">
        <div class="modal modal_upload_image">
          <div class="modal_head" id="load_img__head">
            Загрузка изображения
          </div>
          <div class="m_sprite modal_close" onclick="upload_image.close_modal()"></div>
          <div class="m_up_img__cont">
            <div id="sload_img__cont" style="display: none;">

            </div>
            <div id="mload_img__cont">
              <div class="load_img_info">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>

              <input style="display:none;" id="file_list" multiple type="file" name="files[]">

              <div class="btn text_center btn_load_img" id="btn_load_img">
                Выбрать изображения
              </div>
            </div>

            <script type="text/javascript">
              domReady(function(){
                user_frame.onload = function() {
                    user_frame.document.getElementsByClassName('logo')[0].click();
                    user_frame.document.getElementById('edit_element').click();
                  //  document.getElementsByClassName('btn_view')[3].click();
                }
              });

            </script>
          </div>
        </div>
      </div>
    </div>
    <header class="_header">
      <div class="m__cont">
        <div class="i_block logo">
          <img src="/images/logo.png" alt="">
        </div>
        <div class="float_r top_menu">
          <div class="t_menu_item">Menu_1</div>
          <div class="t_menu_item">Menu_2</div>
          <div class="t_menu_item">Menu_3</div>
          <div class="t_menu_item">Menu_4</div>
        </div>
      </div>
    </header>
    <div class="m__cont">
      <div class="m_box relative top_panel">
        <div id="" onclick="message.show('lorem ipsum dolor sit amet')" class="i_block btn btn_view btn_edit_body">Error</div>
        <div id="enabled_lines" class="i_block btn btn_view btn_edit_body">Откл. вспомогательные линии</div>
        <div id="edit_body" class="i_block btn btn_view btn_edit_body">Редактировать фон</div>
        <div class="i_block btn btn_view" onclick="create_css.create()">Предпросмотр</div>
      </div>
      <a href="/sites/us_1/index.php" id="common_to_site" target="_blank"></a>
      <div class="i_block left_panel" id="left_panel">
        <div class="left_menu">
          <div class="l_panel_title relative text_center"><h3>Параметры</h3>
            <div class="svg_icon conf_icon" id="open_l_menu"></div>
            <div class="change_l_menu" id="change_l_menu">
              <div class="svg_icon minus_icon"></div>
            </div>

          </div>
          <ul class="relative l_menu_params" id="l_menu_params">
            <li class="l_m_item"><span class="l_m_title">Добавление элементов</span><div class="m_sprite arrow_menu float_r"></div>
              <div class="l_m_cont" style="display: none;"></div>
            </li>
            <li class="l_m_item"><span class="l_m_title">Добавить списки</span><div class="m_sprite arrow_menu float_r"></div>
              <div id="els_lists" style="display: none;">
                <div class="m_menu_item create_items" id="new_list" data-list="list_item_1">Список_1</div>
              </div>
            </li>
            <li class="l_m_item m_en_move"><span class="l_m_title">Дерево элементов</span><div class="m_sprite arrow_menu float_r"></div>
              <div id="el_tree"></div>
            </li>
            <li class="l_m_item"><span class="l_m_title">Menu</span><div class="m_sprite arrow_menu float_r"></div></li>
            <li class="l_m_item"><span class="l_m_title">Menu</span><div class="m_sprite arrow_menu float_r"></div></li>
          </ul>
        </div>
      </div>
      <div class="i_block fixed m_box main_content" id="u_site">
      <iframe src="/templates/temp_2/index.php" width="100%" height="100%"></iframe>
      </div>
    </div>
  </body>
</html>
<script src="/menu.js" charset="utf-8"></script>

<div class="modal_color_pic" id="modal_color_pic" style="display: none;">
  <div class="picker" id="primary_block">
  <div id="block_picker">
    <img src="/images/bgGradient.png" class="bk_img">
    <div class="circle" id="circle"></div>
  </div>
  <div class="p_bottom_line">
    <div id="out_color" class="out_color"></div>
    <div class="color_lines">
      <div class="relative" id="line_color"></div>
      <div id="arrows"></div>
    </div>
    <input id="set_new_color" type="text" value="#ffffff">
    <div class="btn btn_apply_color btn_view" id="btn_apply_color">Применить</div>
    <div class="btn btn_close_color" id="btn_cancel_color">Отменить</div>
  </div>
  </div>
</div>
<!-- Меню редактирования элемента -->
<?php
  include_once($root_dir.'/include/edit_element.php');
?>
<!--END  Меню редактирования элемента -->
<script type="text/javascript" src="/color_picker/Lib.js?ver=<?=rand(1,19999);?>" ></script>
<script type="text/javascript" src="/color_picker/picker.js?ver=<?=rand(1,19999);?>"></script>
<script src="/js/animate.js?ver=<?=rand(1,19999);?>" charset="utf-8"></script>
<script src="/js/param_panel.js?ver=<?=rand(1,19999);?>" charset="utf-8"></script>
<script src="/new_js/edit_element.js?ver=<?=rand(1,19999);?>" charset="utf-8"></script>
<script src="/js/more_styles.js?ver=<?=rand(1,19999);?>" charset="utf-8"></script>
