<?php
header('Content-Type: application/json');
session_start();
$LOGGED_USER=$_SESSION['logged_user'];
session_write_close();
$root_dir = $_SERVER['DOCUMENT_ROOT'];
include_once($root_dir.'/db_connect.php');

if($_GET['action'] == 'show_animations'){
  $q_anims = sprintf("SELECT * FROM `animations` WHERE `animations`.`enabled`='1'");
  $r_anims = mysql_query($q_anims) or die("cant execute query");
  $n_anims = mysql_numrows($r_anims); // or die("cant get numrows query");
  if ($n_anims > 0){
    for ($i = 0; $i < $n_anims; $i++) {
      $anim_id = htmlspecialchars(mysql_result($r_anims, $i, "animations.id"));
      $anim_name = htmlspecialchars(mysql_result($r_anims, $i, "animations.name"));
      $anim_class = htmlspecialchars(mysql_result($r_anims, $i, "animations.css_class"));

      $anim_class = str_replace(array("\n","\r","\t"),'',$anim_class);

      $html .= '<div class="i_block relative anim__item">';
      $html .= '<div class="full_w anim_name">'.$anim_name.'</div>';
        $html .= '<img class="img__animate" src="/images/template_images/img_4.jpg" data-anim="'.$anim_name.'" alt="animate">';
      $html .= '<div class="full_w text_center btn btn_select_img select_animate" onclick="_animate.select_animate(\''.$anim_name.'\')">Выбрать анимацию</div>';
      $html .= '</div>';
    }
  }
  echo json_encode(array('result' => 'true','html' => $html));
}





?>
