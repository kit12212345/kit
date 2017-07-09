<?php
session_start();
$LOGGED_USER=$_SESSION['logged_user'];
session_write_close();
header('Content-Type: application/json');
set_time_limit(0);
error_reporting(E_ERROR);

$var_user_id = (int)$LOGGED_USER['id'];

if (isset($var_user_id)) {

} else {
  exit;
}

$root_dir = $_SERVER['DOCUMENT_ROOT'];
if (!$DB_CONNECTED) {
  include($root_dir.'/db_connect.php');
}

$allowed_file_size = 10000000;
$allowed_File_Types = array("image/png", "image/jpeg", "image/pjpeg");
$allowed_Exts = array("jpg", "jpeg", "png");
$upload_dir_img_src='/temp_images/';
$upload_dir=$root_dir.$upload_dir_img_src;


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
//    return $folder_output.'/'.$src_image;
    $out['width'] = $newwidth;
    $out['height'] = $newheight;
    return $out;

}

function resizeThumbnailImage($thumb_image_name, $image, $width, $height, $start_width, $start_height, $scale){
	list($imagewidth, $imageheight, $imageType) = getimagesize($image);
	$imageType = image_type_to_mime_type($imageType);

	$newImageWidth = ceil($width * $scale);
	$newImageHeight = ceil($height * $scale);
	$newImage = imagecreatetruecolor($newImageWidth,$newImageHeight);
	switch($imageType) {
		case "image/gif":
			$source=imagecreatefromgif($image);
			break;
	    case "image/pjpeg":
		case "image/jpeg":
		case "image/jpg":
			$source=imagecreatefromjpeg($image);
			break;
	    case "image/png":
		case "image/x-png":
			$source=imagecreatefrompng($image);
			break;
  	}
	imagecopyresampled($newImage,$source,0,0,$start_width,$start_height,$newImageWidth,$newImageHeight,$width,$height);
	switch($imageType) {
		case "image/gif":
	  		imagegif($newImage,$thumb_image_name);
			break;
      	case "image/pjpeg":
		case "image/jpeg":
		case "image/jpg":
	  		imagejpeg($newImage,$thumb_image_name,90);
			break;
		case "image/png":
		case "image/x-png":
			imagepng($newImage,$thumb_image_name);
			break;
    }
	chmod($thumb_image_name, 0777);
	return $thumb_image_name;
}


if ($_GET['action']=='create_thumb'){
  $x1 = $_POST["x1"];
	$y1 = $_POST["y1"];
	$x2 = $_POST["x2"];
	$y2 = $_POST["y2"];
	$w = $_POST["w"];
	$h = $_POST["h"];
  $file_name = $_POST["file_name"];
	//Scale the image to the thumb_width set above
	//$scale = $thumb_width/$w;
  $scale = 1;

  $large_image_location=$root_dir.'/temp_images/'.$file_name;

  $thumb_image_location=$root_dir.'/user_images/avatar/'.$file_name;

  $cropped = resizeThumbnailImage($thumb_image_location, $large_image_location,$w,$h,$x1,$y1,$scale);
  //echo json_encode(array("image_block" => $image_str, "width" => $size['width'], "height" => $size['height'], "file_name" => $var_new_file_name,  "error" => 0));


  $image_str='<img src="/user_images/avatar/'.$file_name.'" alt="" />';


  if ((@is_array(getimagesize($thumb_image_location))) && (file_exists($thumb_image_location))) {

    $q_update_user_avatar = sprintf("UPDATE users SET users.avatar='".$file_name."'"." WHERE users.id='".$var_user_id."'");
    mysql_query($q_update_user_avatar) or die("cant execute update update_user_avatar");

    echo json_encode(array("image_block" => $image_str));
    exit;
  }
}


if ($_GET['action']=='upload_file'){
//  $var_uniq_hash=mysql_real_escape_string($_GET['hash']);
//  if ($var_uniq_hash=='') exit;
  $error_code=0;
  $error_string='';
  $file_size=$_FILES["files"]["size"];
  $file_name=$_FILES["files"]["name"];
  $file_type=$_FILES["files"]["type"];
  $file_error=$_FILES["files"]["error"];
  $file_tmp_name=$_FILES["files"]["tmp_name"];

  if ($file_error > 0){
    generate_exception($file_error,'Ошибка загрузки файла: '.$file_error);
  }

  $exploded_arr=explode(".", $file_name);

  $extension = end($exploded_arr);

  $extension = strtolower($extension);

  if (($file_size < $allowed_file_size)
  && (in_array($file_type, $allowed_File_Types))
  && (in_array($extension, $allowed_Exts))){

      $root_dir = $_SERVER['DOCUMENT_ROOT'];

      $temporary_dir=$root_dir.'/temp/';

      $var_create_date=time();

      $var_new_file_name=$var_create_date.'_'.md5(uniqid($var_user_id, true)).'.'.$extension;

      $copy_result=move_uploaded_file($file_tmp_name,$temporary_dir.$var_new_file_name);


      if ($copy_result==false) {
        $error_string=$copy_result.'  ---  '.$temporary_dir.$var_new_file_name;
        generate_exception('464','Ошибка директории: '.$error_string);
      }



    $size=create_thumb($temporary_dir.$var_new_file_name,$upload_dir,1024,1024,'jpg');
    create_thumb($temporary_dir.$var_new_file_name,$upload_dir.'thumbnail_140',140,140,'jpg');
    create_thumb($temporary_dir.$var_new_file_name,$upload_dir.'thumbnail_480',480,480,'jpg');



      unlink($temporary_dir.$var_new_file_name);


      if ($is_files!=true){
        $var_new_file_name=replace_extension($var_new_file_name,'jpg');
      }

      $image_str='<img id="photo" src="'.$upload_dir_img_src.$var_new_file_name.'?rnd='.rand(0,100000).'" alt="" />';

    if ($error_code!=0) {
      generate_exception($error_code,$error_string);
    } else {
      echo json_encode(array("image_block" => $image_str, "width" => $size['width'], "height" => $size['height'], "file_name" => $var_new_file_name,  "error" => 0,'fi' => $_FILES));
    }
  }
  else
  {
    generate_exception('459','Некорректный файл');
  }
}




?>
