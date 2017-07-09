<?php
session_start();
$LOGGED_USER=$_SESSION['logged_user'];
session_write_close();
header('Content-Type: application/json');
set_time_limit(0);
$root_dit = $_SERVER['DOCUMENT_ROOT'];
$var_user_id = (int)$LOGGED_USER['user_id'];
if($var_user_id == 0) generate_exception('Вы не авторизированы');

include_once($root_dit.'/db_connect.php');

if($_GET['action'] == 'show_modal'){
  $var_type_view = $_POST['type'];
  //sql ???

  $html .= '<div class="s_menu_img">';
  $html .= '<div class="i_block btn list_img_item active_list" onclick="element_select_image.switch_menu(this);" id="m_defaul_img">Стандартные</div>';
  $html .= '<div class="i_block btn list_img_item" onclick="element_select_image.switch_menu(this);" id="m_my_img">Мои изображения</div>';
  $html .= '<div class="i_block btn list_img_item" onclick="element_select_image.switch_menu(this);" id="m_users_img">Изображения пользователей???</div>';
  $html .= '</div>';
  $html .= '<div class="s_menu_img text_right">';
  $html .= '<div class="i_block btn list_img_item" onclick="upload_image.show_modal()">Загрузить изображение</div>';
  $html .= '</div>';
  $html .= '<div class="relative" id="m__s_images">';
  $html .= '<div class="cont__images" id="cont__img_default"></div>';
  $html .= '<div class="cont__images" id="cont__img_my"></div>';
  $html .= '<div class="cont__images" id="cont__img_users"></div>';
  $html .= '</div>';
  $html .= '<div class="relative body_load_gif" id="body_load_gif">';
  $html .= '</div>';

  echo json_encode(array('result' => 'true','html' => $html));

} else if($_GET['action'] == 'show_default_iamges'){
  $var_type_view = $_POST['type'];
  if($var_type_view == 'background_images'){
    for ($i=1; $i < 15; $i++) {
      $html .= '<div class="my_item">';
      $html .= '<img class="m__img_item" src="/images/template_images/img_'.$i.'.jpg" alt="">';
      $html .= '<div class="m_img_menu">';
      $html .= '<div class="btn btn_view_img" data-img="/images/template_images/img_'.$i.'.jpg">Показать</div>';
      $html .= '<div class="btn btn_select_img" data-img="/images/template_images/img_'.$i.'.jpg">Выбрать изображение</div>';
      $html .= '</div>';
      $html .= '</div>';
    }
  } else if($var_type_view == 'src_images'){
    for ($i=1; $i < 15; $i++) {
      $html .= '<div class="my_item">';
      $html .= '<img class="m__img_item" src="/images/template_images/img_'.$i.'.jpg" alt="">';
      $html .= '<div class="m_img_menu">';
      $html .= '<div class="btn btn_view_img" data-img="/images/template_images/img_'.$i.'.jpg">Показать</div>';
      $html .= '<div class="btn btn_select_img" data-img="/images/template_images/img_'.$i.'.jpg">Выбрать изображение</div>';
      $html .= '</div>';
      $html .= '</div>';
    }
  }
  echo json_encode(array('result' => 'true','html' => $html));
} else if($_GET['action'] == 'show_my_images'){

  $empty = 0;
  $var_type_view = $_POST['type'];
  $image_path = '/images/user_images/thumbnail_480/';
  $image_path_big = '/images/user_images/';

  $q_images = sprintf("SELECT * FROM `user_images` WHERE `user_images`.`user_id` = '".$var_user_id."'");
  $r_images = mysql_query($q_images) or die(generate_exception('error'));
  $n_images = mysql_numrows($r_images); // or die("cant get numrows query");
  if($n_images > 0){
    for ($i = 0; $i < $n_images; $i++) {
      $image_name = htmlspecialchars(mysql_result($r_images, $i, "user_images.name"));

      if($var_type_view == 'background_images'){
        $html .= '<div class="my_item">';
        $html .= '<img class="m__img_item" src="'.$image_path.$image_name.'" alt="">';
        $html .= '<div class="m_img_menu">';
        $html .= '<div class="btn btn_view_img" data-img="'.$image_path_big.$image_name.'">Показать</div>';
        $html .= '<div class="btn btn_select_img" data-img="'.$image_path_big.$image_name.'">Выбрать изображение</div>';
        $html .= '</div>';
        $html .= '</div>';
      } else if($var_type_view == 'src_images'){
        $html .= '<div class="my_item">';
        $html .= '<img class="m__img_item" src="'.$image_path.$image_name.'" alt="">';
        $html .= '<div class="m_img_menu">';
        $html .= '<div class="btn btn_view_img" data-img="'.$image_path_big.$image_name.'">Показать</div>';
        $html .= '<div class="btn btn_select_img" data-img="'.$image_path_big.$image_name.'">Выбрать изображение</div>';
        $html .= '</div>';
        $html .= '</div>';
      }
    }
  } else{
    $empty = 1;
    $html = '<div class="not_user_images" id="not_user_images">Изображений не найдено, вы можете загрузить их.</div>';
  }

  echo json_encode(array('result' => 'true','html' => $html,'empty' => $empty));
} else if($_GET['action'] == 'show_user_iamges'){
  $var_type_view = $_POST['type'];
  if($var_type_view == 'background_images'){
    for ($i=1; $i < 15; $i++) {
      $html .= '<div class="my_item">';
      $html .= '<img class="m__img_item" src="/images/template_images/img_'.$i.'.jpg" alt="">';
      $html .= '<div class="m_img_menu">';
      $html .= '<div class="btn btn_view_img" data-img="/images/template_images/img_'.$i.'.jpg">Показать</div>';
      $html .= '<div class="btn btn_select_img" data-img="/images/template_images/img_'.$i.'.jpg">Выбрать изображение</div>';
      $html .= '</div>';
      $html .= '</div>';
    }
  } else if($var_type_view == 'src_images'){
    for ($i=1; $i < 15; $i++) {
      $html .= '<div class="my_item">';
      $html .= '<img class="m__img_item" src="/images/template_images/img_'.$i.'.jpg" alt="">';
      $html .= '<div class="m_img_menu">';
      $html .= '<div class="btn btn_view_img" data-img="/images/template_images/img_'.$i.'.jpg">Показать</div>';
      $html .= '<div class="btn btn_select_img" data-img="/images/template_images/img_'.$i.'.jpg">Выбрать изображение</div>';
      $html .= '</div>';
      $html .= '</div>';
    }
  }
  echo json_encode(array('result' => 'true','html' => $html));
}






?>
