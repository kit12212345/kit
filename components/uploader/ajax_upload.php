<?php
session_start();
$LOGGED_USER=$_SESSION['logged_user'];
session_write_close();
header('Content-Type: application/json');
set_time_limit(0);
error_reporting(E_ERROR);
$root_dir = $_SERVER['DOCUMENT_ROOT'];
include_once($root_dir.'/db_connect.php');
$var_create_date=time();
$var_user_id = (int)$LOGGED_USER['user_id'];
if($var_user_id == 0) generate_exception('Вы не авторизированы');

$allowed_file_size = 10000000;
$allowed_File_Types = array("image/png", "image/jpeg", "image/pjpeg");
$allowed_Exts = array("jpg", "jpeg", "png");

function replace_extension($filename, $new_extension){
    $info = pathinfo($filename);
    return $info['filename'].'.'.$new_extension;
}

function create_thumb($src_image, $folder_output, $maxwidth, $maxheight, $new_extension = 'current', $resize_to_max_size = false)
{
    $arr_image_details = getimagesize($src_image);

    if ($arr_image_details[2] == 1) {
        $imgt = 'ImageGIF';
        $imgcreatefrom = 'ImageCreateFromGIF';
    }
    if ($arr_image_details[2] == 2) {
        $imgt = 'ImageJPEG';
        $imgcreatefrom = 'ImageCreateFromJPEG';
    }
    if ($arr_image_details[2] == 3) {
        $imgt = 'ImagePNG';
        $imgcreatefrom = 'ImageCreateFromPNG';
    }

    $img = $imgcreatefrom($src_image);
    $width = imagesx($img);
    $height = imagesy($img);

    if ($height > $width) {
        $ratio = $maxheight / $height;
        $newheight = $maxheight;
        $newwidth = $width * $ratio;
    } else {
        $ratio = $maxwidth / $width;
        $newwidth = $maxwidth;
        $newheight = $height * $ratio;
    }

    if (($ratio > 1) && ($resize_to_max_size==false)) {
        $newheight = $height;
        $newwidth = $width;
    }

    $newimg = imagecreatetruecolor($newwidth, $newheight);

    imageAlphaBlending($newimg, false);

    imageSaveAlpha($newimg, true);

    $palsize = ImageColorsTotal($img);

    for ($i = 0; $i < $palsize; ++$i) {
        $colors = ImageColorsForIndex($img, $i);
        ImageColorAllocate($newimg, $colors['red'], $colors['green'], $colors['blue']);
    }

    imagecopyresized($newimg, $img, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

    if (!file_exists($folder_output)) {
        mkdir($folder_output, 0777, true);
    }

    if (strtolower($new_extension) == 'jpg') {
        $src_image = replace_extension($src_image, 'jpg');
        ImageJPEG($newimg, $folder_output.'/'.$src_image, 100);
    } elseif (strtolower($new_extension) == 'png') {
        $src_image = replace_extension($src_image, 'png');
        ImagePNG($newimg, $folder_output.'/'.$src_image, 0);
    } elseif (strtolower($new_extension) == 'gif') {
        $src_image = replace_extension($src_image, 'gif');
        ImageGIF($newimg, $folder_output.'/'.$src_image, 100);
    } else {
        $imgt($newimg, $folder_output.'/'.$src_image);
    }
    $out['width'] = $newwidth;
    $out['height'] = $newheight;
    return $out;

}


if ($_GET['action']=='upload_files'){
  $arr_errors_files = array();
  $temporary_dir=$root_dir.'/images/user_images/';

    $error_code=0;
    $error_string='';

    $file_size=$_FILES["file"]["size"];
    $file_name=$_FILES["file"]["name"];
    $file_type=$_FILES["file"]["type"];
    $file_error=$_FILES["file"]["error"];
    $file_tmp_name=$_FILES["file"]["tmp_name"];

    if ($file_error > 0){
      generate_exception('Произошла ошибка при загрузке файла '.$file_name.', повторите попытку позже');
    }

    $exploded_arr=explode(".", $file_name);

    $extension = end($exploded_arr);

    $extension = strtolower($extension);


    if($file_size > $allowed_file_size){
      generate_exception('Ошибка: файл '.$file_name.' слишком большой');
    }
    if(!in_array($file_type, $allowed_File_Types)){
      generate_exception('Ошибка: файл '.$file_name.' имеет недопустимое формат');
    }
    if(!in_array($extension, $allowed_Exts)){
      generate_exception('Ошибка: файл '.$file_name.' имеет недопустимое формат');
    }

    $var_new_file_name=$var_create_date.'_'.md5(uniqid(rand(1,10000000), true)).'.'.$extension;

    $copy_result=move_uploaded_file($file_tmp_name,$temporary_dir.$var_new_file_name);

    if ($copy_result==false) {
      generate_exception('Произошла ошибка при загрузке файла '.$file_name.', повторите попытку позже');
    }

    create_thumb($temporary_dir.$var_new_file_name,$temporary_dir.'thumbnail_140',140,140,$extension);
    create_thumb($temporary_dir.$var_new_file_name,$temporary_dir.'thumbnail_480',480,480,$extension);
    create_thumb($temporary_dir.$var_new_file_name,$temporary_dir.'thumbnail_1024',1024,1024,$extension);


    $q_insert_from = sprintf("INSERT INTO `user_images` (
      `user_id`,
      `name`,
      `create_date`
    ) values(
      '".$var_user_id."',
      '".$var_new_file_name."',
      '".$var_create_date."'
      ".")");
    mysql_query($q_insert_from) or die(generate_exception('Произошла ошибка,повторите попытку позже'));

  echo json_encode(array('result' => 'true','image' => '/images/user_images/thumbnail_480/'.$var_new_file_name));

}







?>
