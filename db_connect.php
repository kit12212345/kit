<?php
$db_hostname="localhost";
$db_name="a0146200_desing";
$db_username="a0146200_desing";
$db_password="kit123";
//текущее время
$now=time();

//error_reporting(E_ALL);
//ini_set('display_errors', 1);


$link = mysql_connect($db_hostname, $db_username, $db_password);
if (!$link) {
    die('Ошибка соединения: ' . mysql_error());
}
//подключение к базе данных
$db=@mysql_connect($db_hostname,$db_username,$db_password);
if($db!=FALSE)
    $tabledb=mysql_select_db($db_name) or die("Can't select database");
else{
    echo "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=windows-1251\">";
    echo "<LINK href=\"style.css\" rel=\"stylesheet\" type=\"text/css\">";
    echo "<h3>Ошибка!</h3>";
    echo "<p>Невозможно подключиться к базе данных. Пожалуйста повторите попыку позже.</p>";
//    die();
    }
mysql_query("SET NAMES 'utf8'");
mysql_query("SET CHARACTER SET 'utf8'");
mysql_query("SET SESSION collation_connection = 'utf8_general_ci'");

$DB_CONNECTED = true;

function generate_exception($string){
  echo json_encode(array('result' => 'false','string' => $string));
  exit;
}

//$q_check_user = sprintf("SELECT users.first_name, users.last_name,users.avatar FROM `users` WHERE `users`.`id`='".$to_user_id."'");
//$r_check_user = mysql_query($q_check_user) or die("cant execute query");
//$n_check_user = mysql_numrows($r_check_user); // or die("cant get numrows query");
//if ($n_check_user > 0){
//$to_user_first_name = htmlspecialchars(mysql_result($r_check_user, 0, "users.first_name"));


//$q_set_deleted = sprintf("UPDATE messages SET messages.deleted='".$var_deleted."'".",messages.date_deleted='".$var_date_deleted."'"." WHERE messages.user_id='".$var_user_id."'"." AND messages.message_id='".$var_message_id."'");
//mysql_query($q_set_deleted) or die("cant execute update set_deleted");

/*
$q_insert_from = sprintf("INSERT INTO messages (
    date_create,
    date_deleted
  ) values(
    '".$var_date_create."',
    '".$var_user_id."'
    '".")");
  mysql_query($q_insert_from) or die('{"result":"false"}');
*/
