<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="/css/animations/default_animate.css?ver=<?php echo rand(1,100000); ?>">
    <link rel="stylesheet" href="/css/styles.css">
    <link rel="stylesheet" href="/css/template.css?ver=<?=rand(1,10000);?>" type="text/css" media="screen">
    <link rel="stylesheet" href="css/styles.css?ver=<?php echo rand(1,100000); ?>">
    <title>Шaблон 1</title>
  </head>
  <body>
    <div class="header" id="header">
      <div class="head_content">
        <div class="i_block logo">
          <img class="logo_img" src="/images/logo_4.png" alt="">
        </div>
        <div class="float_r">
          <ul class="top_menu">
            <li class="float_l top_menu_item">Later work</li>
            <li class="float_l top_menu_item">Services</li>
            <li class="float_l top_menu_item">About us</li>
            <li class="float_l top_menu_item">Contant us</li>
            <li class="float_l top_menu_item">Blog</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="wrapper">
      <section class="d_element side home flex" id="home">
        <div class="select_item flex">
          <div class="d_element m_title">
            <div class="txt">Lorem ipsum dolor sit amet</div>
          </div>
          <div class="d_element m__title">
            <div class="txt">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt</div>
          </div>
          <div class="btn btn_main">Selected</div>
        </div>
      </section>
      <section class="d_element side about" id="two">
          <div id="test" class="d_element is_anim" data-anim="flip" style="width: 500px; margin: auto; position: relative; top: 100px;">
            <img src="/images/template_images/img_5.jpg" style="width: 100%;" alt="">
          </div>
      </section>
      <section class="d_element flex side info">
        <div class="d_element m_title">
          <div class="txt">Lorem ipsum dolor sit amet</div>
        </div>
        <div class="d_element m__title">
          <div class="txt">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt</div>
        </div>

      </section>
      <section class="d_element side work">
        <div id="asd" class="d_element is_anim" data-anim="rollIn" style="width: 500px; margin: auto; position: relative; top: 100px;">
          <img src="/images/template_images/img_9.jpg" style="width: 100%;" alt="">
        </div>
      </section>
    </div>

    <script type="text/javascript">

    function get_screen_offset(){
      var pageWidth = window.innerWidth;
      var pageHeight = window.innerHeight;
      if(typeof pageHeight != 'number'){
        if(document.compatMode == 'CSS1Compat'){
          pageWidth = document.documentElement.clientWidth;
          pageHeight = document.documentElement.clientHeight;
        } else{
          pageWidth = document.body.clientWidth;
          pageHeight = document.body.clientHeight;
        }
      }
      return {
        '_width': pageWidth,
        '_height': pageHeight
      }
    }


    window.onload = function(e){
      for (var i = 0; i < anims_elements.length; i++) {
        if(anims_elements[i]._element.getBoundingClientRect().top - document.body.scrollTop <= document.body.scrollTop){
          var type_anim = anims_elements[i]._element.getAttribute('data-anim');
          anims_elements[i]._element.classList.add('animated');
          anims_elements[i]._element.classList.add(type_anim);
        }
      }
    }


    window.onresize = function(e){
      for (var i = 0; i < document.getElementsByClassName('side').length; i++) {
        document.getElementsByClassName('side')[i].style.height = get_screen_offset()._height + 'px';
      }
    }

    var header = document.getElementById('header');
    var home = document.getElementById('home');


    var anims_elements = new Array();
    var anim_margin = 80;

    function get_time_animate(element){
      if(typeof getComputedStyle !== 'undefined'){
        var time = element.style.animationDuration ? parseFloat(element.style.animationDuration) : parseFloat(getComputedStyle(element).animationDuration);
        return time * 1000;
      } else{

      }
      return 1000;
    }

    function search_add_anims(scroll_pos){
      for (var i = 0; i < anims_elements.length; i++){
        if(anims_elements[i]._element.getBoundingClientRect().top <= get_screen_offset()._height - (anims_elements[i]._height / 3)
        && anims_elements[i]._element.getBoundingClientRect().top > anims_elements[i]._height){
          return {
            'element': anims_elements[i]._element,
            'anim_object': anims_elements[i]
          }
        }
      }

      return false;
    }

    function search_remove_anims(scroll_pos){
      for (var i = 0; i < anims_elements.length; i++) {
        if(anims_elements[i]._element.getBoundingClientRect().bottom - get_screen_offset()._height - anims_elements[i]._height >= 0)
        return {
          'element': anims_elements[i]._element,
          'anim_object': anims_elements[i]
        }
      }
      return false;
    }


    var last_animate_element = '';

    window.onscroll = function(){
      var view_selection_add = search_add_anims(document.body.scrollTop);
      var view_selection_remove = search_remove_anims(document.body.scrollTop);
      if(document.body.scrollTop > home.offsetHeight - header.offsetHeight){
        header.classList.add('active_header');
      } else{
        header.classList.remove('active_header');
      }
      if(view_selection_add.element && view_selection_add.anim_object.end_anim === true){
        var type_anim = view_selection_add.element.getAttribute('data-anim');
        view_selection_add.element.classList.add('animated');
        view_selection_add.element.classList.add(type_anim);
        view_selection_add.anim_object.end_anim = false;
        setTimeout(function() {
          view_selection_add.anim_object.end_anim = true;
        },get_time_animate(view_selection_add.element));
      }
      if(view_selection_remove.element && view_selection_remove.anim_object.end_anim === true){
        var type_anim = view_selection_remove.element.getAttribute('data-anim');
        view_selection_remove.element.classList.remove('animated');
        view_selection_remove.element.classList.remove(type_anim);
      }
    }


    for (var i = 0; i < document.getElementsByClassName('is_anim').length; i++) {
      anims_elements.push({
        '_element': document.getElementsByClassName('is_anim')[i],
        '_height': parseInt(document.getElementsByClassName('is_anim')[i].offsetHeight),
        'end_anim': true
      });
    }

      for (var i = 0; i < document.getElementsByClassName('side').length; i++) {
        document.getElementsByClassName('side')[i].style.height = get_screen_offset()._height + 'px';
      }
    </script>

  </body>
</html>
