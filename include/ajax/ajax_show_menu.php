<?php
header('Content-Type: application/json');
session_start();
$LOGGED_USER=$_SESSION['logged_user'];
session_write_close();
$root_dir = $_SERVER['DOCUMENT_ROOT'];

function get_include($path){
  ob_start();
  include($path);
  $result = ob_get_contents();
  ob_end_clean();
  return $result;
}
if($_GET['action'] == 'show_body'){
  $html = get_include($root_dir.'/include/menu/edit_body.php');
  echo json_encode(array('result' => 'true','html' => $html));
} else if($_GET['action'] == 'show_div'){
  $html = get_include($root_dir.'/include/menu/edit_div.php');
  echo json_encode(array('result' => 'true','html' => $html));
} else if($_GET['action'] == 'show_img'){
  $html = get_include($root_dir.'/include/menu/edit_image.php');
  echo json_encode(array('result' => 'true','html' => $html));
}

?>
