<?php
$root_dir = $_SERVER['DOCUMENT_ROOT'];
include_once($root_dir.'/db_connect.php');


if($_GET['action'] == 'add'){
  $var_id = (int)$_GET['id'];
  $var_anim_name = $_GET['anim_name'];
  $var_anim_name = mysql_real_escape_string($var_anim_name);
  $var_css_class = '.'.$var_anim_name;
  $var_create_date = (int)time();
  $status = 1;

  $q_set_deleted = sprintf("UPDATE `animations` SET `animations`.`enabled`='".$status."'"." WHERE `animations`.`id`='".$var_id."'");
  mysql_query($q_set_deleted) or die("cant execute update set_deleted");

  echo 'ture';
  exit();
}


?>
<script src="/js/core/ajax.js" charset="utf-8"></script>
<link rel="stylesheet" href="/css/animations/new_anim.css">
<style media="screen">
  .cont{
    width: 90%;
    margin: auto;
    border:1px solid #ccc;
  }
  .item{
    position: relative;
    width: 300px;
    height: 300px;
    margin-left: 10px;
    margin-top: 10px;
    display: inline-block;
    border: 1px solid #ddd;
  }
  .block{
    width: 70%;
    height: 70%;
    background: green;
    margin: auto;
    opacity: 0;
  }
  .anim_name{
    position: absolute;
    font-size: 16px;
    font-weight: bold;
    top: 0px;
    left: 0px;
    background: #fff;
  }
  .animated{
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    opacity: 1!important;
  }
</style>

<?php
echo '<div class="cont">';
$q_anim = sprintf("SELECT * FROM `animations` WHERE `animations`.`enabled`='1'");
$r_anim = mysql_query($q_anim) or die("cant execute query");
$n_anim = mysql_numrows($r_anim); // or die("cant get numrows query");
if ($n_anim > 0){
  for ($i=0; $i < $n_anim; $i++) {
    $anim_id = htmlspecialchars(mysql_result($r_anim, $i, "animations.id"));
    $anim_name = htmlspecialchars(mysql_result($r_anim, $i, "animations.name"));
    $anim_class = htmlspecialchars(mysql_result($r_anim, $i, "animations.css_class"));

    $anim_class = str_replace(array("\n","\r","\t"),'',$anim_class);

    echo '<div class="item" data-amin="'.$anim_class.'">';
    echo '<div class="anim_name"><input type="checkbox" data-animname="'.$anim_class.'" class="check_anim" id="'.$anim_id.'">'.$anim_name.'</div>';
    echo '<div class="block"></div>';
    echo '</div>';
/*
    $class .= $anim_class."{\n";
    $class .= "\t-webkit-animation-name:".$anim_name.";\n";
    $class .= "\tanimation-name:".$anim_name.";\n";
    $class .= "}\n";*/

  }
/*
  $file_name = $root_dir.'/css/animations/anim_classes.css';
  $fd = fopen($file_name, 'w');
  $str = $class;
  fwrite($fd, $str);
  fclose($fd);*/
}
echo '</div>';
?>
<script type="text/javascript">
  window.onload = function(){
    for (var i = 0; i < document.getElementsByClassName('item').length; i++) {
      document.getElementsByClassName('item')[i].onmouseover = function(){
        var anim_class = this.getAttribute('data-amin').split('.')[1].toString();
        this.children[1].classList.add('animated');
        this.children[1].classList.add(anim_class);
      }

      document.getElementsByClassName('item')[i].onmouseout = function(){
        var anim_class = this.getAttribute('data-amin').split('.')[1].toString();
        this.children[1].classList.remove('animated');
        this.children[1].classList.remove(anim_class);
      }
    }

    for (var i = 0; i < document.getElementsByClassName('check_anim').length; i++) {
      document.getElementsByClassName('check_anim')[i].onclick = function() {
        var id = this.id;
        var anim_name = this.getAttribute('data-animname');
        ajx({
          url: '/include/parse_animate.php?action=add&id=' + id + '&anim_name=' + anim_name,
          method : 'get',
          success: function(data){
            console.log(data);
          }
        });
      }
    }

  }
</script>
<?php
/*
$var_file = fopen($_SERVER['DOCUMENT_ROOT']."/css/animations/new_anim.css",'r');
if($var_file){
  $var_create_date = (int)time();
  while (($buffer = fgets($var_file,4096)) !== false) {
    $var_selector = explode('@-webkit-keyframes', $buffer);
    if($var_selector[1]){
      $selector = $var_selector[1];
      $selector = str_replace('{','',$selector);
      $selector = str_replace(' ','',$selector);
      $selector = str_replace(array("\n","\r","\t"),'',$selector);

      $css_class = '.'.$selector;

      $q_insert_from = sprintf("INSERT INTO `animations` (
          `name`,
          `css_class`,
          `create_date`
        ) values(
          '".$selector."',
          '".$css_class."',
          '".$var_create_date."'
          ".")");
        mysql_query($q_insert_from) or die('{"result":"false"}');

    }
  }

}
fclose($var_file);
*/


?>
