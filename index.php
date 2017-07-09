<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
  <meta http-equiv="Content-type" content="text/html; charset=utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <script src="/new_resize.js?ver=<?=rand(1,19999);?>" charset="utf-8"></script>
  <link rel="stylesheet" href="/css/template.css?ver=<?=rand(1,10000);?>" type="text/css" media="screen">
  <link rel="stylesheet" href="/css/owner_styles.css?ver=<?=rand(1,1000);?>">
  <link rel="stylesheet" type="text/css" href="/color_picker/style.css">
  <link rel="stylesheet" href="/css/svg_icons.css?ver=<?=rand(1,1000);?>">
  <link rel="stylesheet" href="/css/tempalte_1.css?ver=<?=rand(1,19999);?>">
  <link rel="stylesheet" href="/css/styles.css?ver=<?=rand(1,19999);?>">
  <script src="/new_js/create_element.js?ver=<?=rand(1,19999);?>" charset="utf-8"></script>
  <script src="/js/core/dom.js" charset="utf-8"></script>
  <script src="/js/core/ajax.js" charset="utf-8"></script>
  <script src="/js/animate.js" charset="utf-8"></script>
  <script src="/js/main.js?ver=<?php echo rand(1,100000); ?>" charset="utf-8"></script>
</head>
  <body>
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
    <style media="screen">
      .top_panel{
        text-align: right;
      }
      .btn_view{
        color: #fff;
        background: #3B556E;
        background: -moz-linear-gradient(top, #46637e 0%, #3B556E 40%, #344a5f 100%);
        background: -webkit-linear-gradient(top, #46637e 0%,#3B556E 40%,#344a5f 100%);
        background: linear-gradient(to bottom, #46637e 0%,#3B556E 40%,#344a5f 100%);
        border: 1px solid #3B556E;
        padding: 5px 10px;
      }
      .btn_edit_body{
        margin-right: 15px;
        border: 1px solid #16A086;
        background: #16A086;
        background: -moz-linear-gradient(top, #1fb699 0%, #199f86 40%, #148b74 100%);
        background: -webkit-linear-gradient(top, #1fb699 0%,#199f86 40%,#148b74 100%);
        background: linear-gradient(to bottom, #1fb699 0%,#199f86 40%,#148b74 100%);
      }
    </style>


    <div class="m__cont">
      <div class="m_box relative top_panel"><div id="edit_body" class="i_block btn btn_view btn_edit_body">Редактировать фон</div><div class="i_block btn btn_view" onclick="create_css.create()">Предпросмотр</div></div>
      <script type="text/javascript">

      document.getElementById('edit_body').onclick = function(e){
        active_element = document.getElementById('u_site');
        document.getElementById('w_panel').style.display = 'block';
        var $init = new init_block(this,e);
        $init.resize_block.init(true,false,false,false,0,125);

        var $init = new init_block(this,e);
        $init.resize_block.init(true,false,false,false,0,125);
        init_elements.set_styles(this,true);
        e.stopPropagation();
      }

      var create_css = {
        nodes : new Object(),
        create : function() {
          for(var i = 0; i < document.getElementById('u_site').getElementsByTagName('*').length; i++){
            this.nodes[i] = new Array(document.getElementById('u_site').getElementsByTagName('*')[i]);
          }
          this.get_styles();
        },
        get_styles : function(){
          for(var i = 0; i < Object.keys(this.nodes).length; i++){
            this.nodes[i][0].classList.add('class_' + i);
            this.nodes[i].push(this.nodes[i][0].style.cssText);
            this.nodes[i].push('class_' + i);
            this.nodes[i][0].removeAttribute('style');
          }
          this.create_file();
        },
        create_file: function(){

          ajx({
            url: '/php/create_css_file.php',
            method : 'post',
            data : {
              arr_nodes : this.nodes,
              print_nodes: document.getElementById('u_site').innerHTML,
              body_styles: document.getElementById('u_site').style.cssText
            },
            success: function(data){
              for(var i = 0; i < Object.keys(create_css.nodes).length; i++){
                create_css.nodes[i][0].classList.remove('class_' + i);
                create_css.nodes[i][0].setAttribute('style',create_css.nodes[i][1]);
              }
              document.getElementById('common_to_site').click();
            }
          });
        }
      }

        function view_site(){

        }
      </script>
      <a href="/sites/us_1/index.php" id="common_to_site" target="_blank"></a>
      <div class="i_block left_panel" id="left_panel">
        <div class="left_menu">
          <div class="l_panel_title relative text_center"><h3>Параметры</h3>
            <div class="svg_icon conf_icon" id="open_l_menu"></div>
            <div class="change_l_menu" id="change_l_menu">
              <div class="svg_icon minus_icon"></div>
            </div>

          </div>
          <ul class="l_menu_params" id="l_menu_params">
            <li class="l_m_item"><span class="l_m_title">Добавление элементов</span><div class="m_sprite arrow_menu float_r"></div>
              <div class="l_m_cont" style="display: none;">

              </div>
            </li>
            <li class="l_m_item"><span class="l_m_title">Добавить списки</span><div class="m_sprite arrow_menu float_r"></div>
              <div id="els_lists" style="display: none;">
                <div class="m_menu_item create_items" id="new_list" data-list="list_item_1">Список_1</div>
              </div>
            </li>
            <li class="l_m_item m_en_move"><span class="l_m_title">Дерево элементов</span><div class="m_sprite arrow_menu float_r"></div>
              <div id="el_tree">

              </div>
            </li>
            <li class="l_m_item"><span class="l_m_title">Menu</span><div class="m_sprite arrow_menu float_r"></div></li>
            <li class="l_m_item"><span class="l_m_title">Menu</span><div class="m_sprite arrow_menu float_r"></div></li>
          </ul>
        </div>
      </div>
      <div class="i_block m_box relative main_content" id="u_site">
        
      </div>
    </div>
  </body>
</html>
<script src="/menu.js" charset="utf-8"></script>

<div class="modal_color_pic" id="modal_color_pic" style="display: none;">
  <div class="picker" id="primary_block">
  <div id="line">
  <div id="arrows">
  <div class="left_arrow"></div>
  <div class="right_arrow"></div>
  </div>
  </div>
  <div id="block_picker">
    <!--<img src="https://lh3.googleusercontent.com/-8Dm4nhAOssQ/T_IqwyIFXmI/AAAAAAAAACA/4QKmS7s_otE/s256/bgGradient.png" class="bk_img">-->
    <img src="/images/bgGradient.png" class="bk_img">
    <div class="circle" id="circle"></div>
  </div>
  <div class="p_bottom_line">
    <div id="out_color" class="out_color"></div>
    <input id="set_new_color" type="text" name="" value="">
    <div class="btn btn_apply_color" id="btn_apply_color">Применить</div>
    <div class="btn btn_close_color" id="btn_cancel_color">Отменить</div>
  </div>
  </div>
</div>
<div id="test_tree">
  <div style="width: 30px; height: 30px; background:#ccc">
    <div style="width: 30px; height: 30px; background:#ccc">
      <div id="suc" style="width: 30px; height: 30px; background:#ccc">

      </div>
    </div>
  </div>
</div>
<script src="/js/jquery-3.1.0.min.js" charset="utf-8"></script>
<script type="text/javascript">

    (function() {
      var check_down = false;


      var transform_menu = {
        element: null,
        getXY: function(e){
          var posx = 0;
          var posy = 0;
          if (!e) var e = window.event;
          if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
          }
          else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft
              + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop
              + document.documentElement.scrollTop;
          }
          return {
            x: posx,
            y: posy
          }
        },
        init: function(element){
          this.element = element;
          document.getElementsByTagName('html')[0].onmousemove = function(e){
            transform_menu.move(e);
          };
          document.getElementsByTagName('html')[0].onmouseup = function(e){
            transform_menu._clear();
          }
        },
        move: function(e){
          var pos_mouse = this.getXY(e);
          if(!document.getElementsByClassName('w_panel')[1]){
            this.element.style.display = 'none';

            var panel = document.createElement('div');
            panel.setAttribute('class','w_panel n_create_panel');
            panel.id = 'p_tree_els';

            var _cont = document.createElement('div');
            _cont.setAttribute('class','w_panel__cont');

            var div_head = document.createElement('div');
            div_head.setAttribute('class','w_panel__head');
            div_head.innerHTML = 'Дерево элементов';

            _cont.appendChild(div_head);
            panel.appendChild(_cont);
            document.body.appendChild(panel);

            var $init = new init_block(panel,e);
            $init.move_block.init();
          }

          var panel = document.getElementById('p_tree_els');

          var pos_left = pos_mouse.x - panel.offsetWidth / 2;
          var pos_top = pos_mouse.y - 15;

          panel.style.left = pos_left + 'px';
          panel.style.top = pos_top + 'px';


        },
        _clear: function() {
          document.getElementsByTagName('html')[0].onmousemove = null;
        }
      };

      for (var i = 0; i < document.getElementsByClassName('m_en_move').length; i++) {
        document.getElementsByClassName('m_en_move')[i].onmousedown = function(e){
          transform_menu.init(this);
        }
      }

      var enter_element = null;

      for (var i = 0; i < document.getElementsByClassName('l_m_item').length; i++) {
        var el = document.getElementsByClassName('l_m_item')[i];
        el.onmousemove = function(e){
          e = e ? e : window.event;
          var element = e.target ? e.target : e.srcElement;


/*
          if(document.getElementsByClassName('w_panel')[1]){
            for (var i = 0; i < document.getElementsByClassName('l_m_item').length; i++) {
              addClass(document.getElementsByClassName('l_m_item')[i],'li_common');
              document.getElementsByClassName('l_m_item')[i].style.top = document.getElementsByClassName('l_m_item')[i].offsetTop;
              document.getElementsByClassName('l_m_item')[i].style.width = document.getElementsByClassName('l_m_item')[i].offsetWidth;
            }
            for (var i = 0; i < document.getElementsByClassName('l_m_item').length; i++) {
              document.getElementsByClassName('l_m_item')[i].style.position = 'absolute';
            }
          }
*/




          if(document.getElementsByClassName('place_set_menu')[0]) document.getElementsByClassName('place_set_menu')[0].remove();
          if(document.getElementsByClassName('w_panel')[1]){
            if(!document.getElementsByClassName('place_set_menu')[0] && search_class(element,'l_m_item')){


                var div = document.createElement('div');
                div.setAttribute('class','place_set_menu');

                for (var i = 0; i < document.getElementsByClassName('l_m_item').length; i++) {
                  document.getElementsByClassName('l_m_item')[i]
                  addClass(document.getElementsByClassName('l_m_item')[i],'li_common');
                }

                var item_height = element.offsetHeight;
                var layer_y = e.layerY;

                if(layer_y >= item_height / 2){
                  if(!element.nextSibling){
                    document.getElementById('l_menu_params').appendChild(div);
                  } else{
                    document.getElementById('l_menu_params').insertBefore(div,element.nextSibling);
                  }
                } else{
                  if(!element.previousSibling){
                    document.getElementById('l_menu_params').insertBefore(div,document.getElementsByClassName('l_m_item')[0]);
                  } else{
                    document.getElementById('l_menu_params').insertBefore(div,element);
                  }
                }

                $.w.ltAnimate(document.getElementsByClassName('place_set_menu')[0], {height: '30px'},10);
            }
          }
        }

        el.onmouseout = function(e){
          e = e ? e : window.event;
          var element = e.target ? e.target : e.srcElement;
          if(document.getElementsByClassName('w_panel')[1]){
            var place_set = document.getElementsByClassName('place_set_menu')[0];
            if(place_set && search_class(element,'l_m_item')){
              var pos_mouse = transform_menu.getXY(e);
              if(pos_mouse.x >= place_set.offsetLeft && pos_mouse.x <= place_set.offsetLeft + place_set.offsetWidth &&
              pos_mouse.y >= place_set.offsetTop && pos_mouse.y <= place_set.offsetTop + place_set.offsetHeight) return false;
              removeElement(place_set);
            }
          }
          for(var i = 0; i < document.getElementsByClassName('l_menu_params'); i++){
            $.w.ltAnimate(document.getElementsByClassName('l_menu_params')[i], {top: '0px'},150);
          }
        }
      }

    })();



    var treeNodes = new Array();
    var arr_tree_nodes = new Array();

    var filter = {
      acceptNode:function(node){
    //    return no
      }
    }

  //  console.log(document.getElementsByName('test')[0]);


    var tree = document.createNodeIterator(document.getElementById('u_site'),NodeFilter.SHOW_ALL,null,false);
    function set_key(i) {
      var k = {};
      k = {a : i}
      return k.a;
    }

    var tree_nodes = {

      create: function(){
        for (var i = 0; i < tree.root.childNodes.length; i++){
          if(tree.root.childNodes[i].nodeName == '#text') continue;
          treeNodes.push({'node_name' : tree.root.childNodes[i].nodeName,'element' : tree.root.childNodes[i],'parent_id' : 0,'node_id' : i});
        }
      //  this.show_tree();
      },
      set_key:function(i){
        var k = {};
        k = {a : i}
        return k.a;
      },
      show_tree: function(){

        var node_names = {
          'DIV' : 'Блок',
          'IMG': 'Изображение',
          'INPUT': 'Поле ввода'
        };

        var tree_content = document.getElementById('el_tree');
        var node = active_element;
        if(this.check_exist_element(node)) return false;
        var div = document.createElement('div');
        var parent_element = this.get_element_id(node.parentNode);
        div.linkInElement = node;
        div.parent_id = parent_element == null ? 0 : parent_element.parent_id;
        div.innerHTML = node_names[node.nodeName];
        div.setAttribute('class','tree_element');
        div.element_id = tree_content.getElementsByTagName('*').length + 1;
        if(div.parent_id > 0){
          parent_element.element.appendChild(div);
        } else{
          tree_content.appendChild(div);
        }
        this.init_hovers();

      },
      get_element_id: function(element){
        for (var i = 0; i < document.getElementById('el_tree').getElementsByTagName('*').length; i++) {
          if(element == document.getElementById('el_tree').getElementsByTagName('*')[i].linkInElement)
           return {
             parent_id: document.getElementById('el_tree').getElementsByTagName('*')[i].element_id,
             element: document.getElementById('el_tree').getElementsByTagName('*')[i]
           }
        }
        return null;
      },
      check_exist_element: function(element){
        for (var i = 0; i < document.getElementById('el_tree').getElementsByTagName('*').length; i++) {
          if(element == document.getElementById('el_tree').getElementsByTagName('*')[i].linkInElement)
          return true;
        }
        return false;
      },
      remove_element: function(element){
        for (var i = 0; i < document.getElementById('el_tree').getElementsByTagName('*').length; i++) {
          if(element == document.getElementById('el_tree').getElementsByTagName('*')[i].linkInElement)
            removeElement(document.getElementById('el_tree').getElementsByTagName('*')[i]);
        }
      },
      init_hovers: function(){
        for (var i = 0; i < document.getElementsByClassName('tree_element').length; i++) {

          document.getElementsByClassName('tree_element')[i].onclick = function(e){
            e = e ? e : event.window;
            var element = e.target ? e.target : e.srcElement;
            element.linkInElement.click();
          }

          document.getElementsByClassName('tree_element')[i].onmouseover = function(e){ // ??? onmouseenter
            e = e ? e : event.window;
            var element = e.target ? e.target : e.srcElement;
            addClass(element.linkInElement,'hover_in_tree_el');
          }

          document.getElementsByClassName('tree_element')[i].onmouseout = function(e){
            e = e ? e : event.window;
            var element = e.target ? e.target : e.srcElement;
            removeClass(element.linkInElement,'hover_in_tree_el');
          }
        }
      }
    }

    tree_nodes.create();

  //  console.log(treeNodes);


  window.onload = function() {
    document.getElementById('v_modal').click();
  }


</script>


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
