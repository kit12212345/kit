<?php
//header("content-type: text/html; charset=UTF-8");
header('Content-Type: application/json');
$root_dir = $_SERVER['DOCUMENT_ROOT'];
$arr_nodes = $_POST['arr_nodes'];
$arr_links = $_POST['arr_links'];
$arr_print_nodes = $_POST['print_nodes'];
$var_body_styles = $_POST['body_styles'];


/*SQL CODE*/
$var_user_site_path = 'us_1';
/*END SQL CODE*/
$default_styles = '';

$default_styles .= "body{\n";
$arr_styles = explode(';',$var_body_styles);
for($c = 0; $c < count($arr_styles) - 1; $c++){
  $default_styles .= "\n\t".trim($arr_styles[$c].";");
}
$default_styles .= "}\n";

$default_styles .= "*{\n";
$default_styles .= "\t-webkit-box-sizing: border-box;\n";
$default_styles .= "\t-moz-box-sizing: border-box;\n";
$default_styles .= "\tbox-sizing: border-box;\n";
$default_styles .= "}\n";

$default_styles .= "*{\n";
$default_styles .= "\tmargin: 0;\n";
$default_styles .= "\tpadding: 0;\n";
$default_styles .= "}\n";

$default_styles .= "img{\n";
$default_styles .= "\twidth:100%;\n";
$default_styles .= "\theight:100%;\n";
$default_styles .= "}\n";

$class_list .= $default_styles;

for($i = 0; $i < count($arr_nodes); $i++) {
  $styles = '';
  $arr_styles = explode(';',$arr_nodes[$i][1]);
  for($c = 0; $c < count($arr_styles) - 1; $c++){
    $styles .= "\n\t".trim($arr_styles[$c].";");
  }
  $class_list .= ".".$arr_nodes[$i][2]."{".$styles."\n}\n";
}
$file_name = $root_dir.'/sites/'.$var_user_site_path.'/css/styles.css';
$fd = fopen($file_name, 'w');
$str = $class_list;
fwrite($fd, $str);
fclose($fd);

$var_html .= '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
$var_html .= '<html lang="ru">';
$var_html .= '<head>';
$var_html .= '<meta http-equiv="Content-type" content="text/html; charset=utf-8">';
$var_html .= '<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">';
$var_html .= '<link rel="stylesheet" href="css/styles.css">';
for ($i = 0; $i < count($arr_links); $i++) {
  $var_html .= '<link rel="stylesheet" href="'.$arr_links[$i].'" type="text/css" media="screen">';
}
$var_html .= '</head>';
$var_html .= '<body>';
$var_html .= $arr_print_nodes;
$var_html .= '</body>';
$var_html .= '</html>';



$file_name = $root_dir.'/sites/'.$var_user_site_path.'/index.php';
$fd = fopen($file_name, 'w');
fwrite($fd, $var_html);
fclose($fd);

echo json_encode(array('error' => 0,'fileName' => $file_name));


?>
