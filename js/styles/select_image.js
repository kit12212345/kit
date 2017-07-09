var element_select_image = {
  opened_menu: '',
  css_type: null,
  show_modal: function(type){
    ajx({
      url : '/include/ajax/ajax_show_images.php?action=show_modal',
      method: 'post',
      dataType: 'json',
      data: {
        'type': 'background_images'
      },
      success: function(data){
        if(data.result == 'true'){
          upload_image.init();
          gId('modal_body').style.display = 'block';
          gId('modal_content').innerHTML = data.html;
          var view = getCookie('view_iamges');

          element_select_image.css_type = type;

          if(view == 'my'){
            element_select_image.switch_menu(null,'show_my_images');
          } else if(view == 'users'){
            element_select_image.switch_menu(null,'show_user_iamges');
          } else{
            element_select_image.switch_menu(null,'show_default_iamges');
          }
        }
      }
    });
  },
  init: function(){
    _e.addEvent(gId('m__s_images'),'click',element_select_image.init_btns);
    _e.addEvent(gId('close_view_img'),'click',element_select_image.close_view_img);
  },
  init_close_key: function(e){
    e = _e.getEvent();
    if(e.keyCode == 27){
      gId('close_view_img').click();
    }
  },
  init_btns: function(e){
    e = _e.getEvent();
    var element = _e.getTarget(e);

    if(search_class(element,'btn_view_img')){
      addClass(gId('m__modal'),'disabled_click');
      var modal_img = gId('m_view_image');
      if(gId('b__image').children[0]){
        gId('b__image').innerHTML = '';
      } else{
        _e.addEvent(window,'keydown',element_select_image.init_close_key);
      }
      var img_src = element.getAttribute('data-img');
      var img = document.createElement('img');
      img.setAttribute('src',img_src);
      img.id = 'image_view';
      _e.addEvent(img,'load',element_select_image.view_img);

      gId('b__image').appendChild(img);
    } else if(search_class(element,'btn_select_img')){
      var img_src = element.getAttribute('data-img');
      if(element_select_image.css_type == 'backgroundImage'){
        active_element.style.backgroundImage = 'url(' + img_src + ')';
      } else if(element_select_image.css_type == 'src'){
        active_element.setAttribute('src',img_src);
      }
      element_select_image.close_modal();
    }
  },
  view_img: function(e){
    var modal_img = gId('m_view_image');
    gId('m_view_image').style.width = this.clientWidth + 'px';
    addClass(modal_img,'active_view_img');
  },
  close_view_img: function(){
    _e.removeEvent(window,'keydown',element_select_image.init_close_key);
    removeClass(gId('m__modal'),'disabled_click');
    removeClass(gId('m_view_image'),'active_view_img');
    _e.removeEvent(gId('image_view'),'load',element_select_image.view_img);
    setTimeout(function() {
      gId('m_view_image').style.width = 'auto';
      gId('b__image').innerHTML = '';
    },150);
  },
  close_modal: function(){
    gId('modal_body').style.display = 'none';
    _e.removeEvent(gId('m__s_images'),'click',element_select_image.init_btns);
    removeClass(document.body,'hide_scroll');
  },
  switch_menu: function(element,action){
    var open_content = false;
    var current_content_id = null;

    if(typeof action === 'undefined'){
      var action = 'show_default_iamges';
      if(element.id == 'm_my_img') action = 'show_my_images';
      else if(element.id == 'm_users_img') action = 'show_user_iamges'; //???
    }

    if(action == 'show_default_iamges'){
      if(gId('cont__img_default').innerHTML != '') open_content = true;
      current_content_id = 'cont__img_default';
      setCookie('view_iamges','default');
    } else if(action == 'show_my_images'){
      if(gId('cont__img_my').innerHTML != '') open_content = true;
      current_content_id = 'cont__img_my';
      setCookie('view_iamges','my');
    } else if(action == 'show_user_iamges'){
      if(gId('cont__img_users').innerHTML != '') open_content = true;
      current_content_id = 'cont__img_users';
      setCookie('view_iamges','users');
    }

    for (var i = 0; i < gClass('cont__images').length; i++) {
      gClass('cont__images')[i].style.display = 'none';
    }
    gId(current_content_id).style.display = 'block';

  //  if(element_select_image.opened_menu == current_content_id) return false;

  //  gId('m__s_images').innerHTML = '';
    if(open_content === false){
      gId(current_content_id).style.height = '1px';
      gId(current_content_id).style.overflow = 'hidden';
      gId('body_load_gif').style.display = 'block';
      gId('body_load_gif').appendChild(create_load_gif());
      addClass(gId(current_content_id),'hidden_img_items');
      ajx({
        url : '/include/ajax/ajax_show_images.php?action=' + action,
        method: 'post',
        dataType: 'json',
        data: {
          'type': 'background_images'
        },
        success: function(data){
          if(data.result == 'true'){
            if(data.empty) gId(current_content_id).style.height = 'auto';
            var timer_check;
            //gId('m__s_images').innerHTML = data.html;
            gId(current_content_id).innerHTML = data.html;

            var arr_check_load = new Array();
            for (var i = 0; i < gId(current_content_id).querySelectorAll('.my_item').length; i++) {
              _e.addEvent(gId(current_content_id).querySelectorAll('.my_item')[i].querySelectorAll('.m__img_item')[0],'load',add_load);
            }

            function add_load(){
              arr_check_load.push('true');
              _e.removeEvent(this,'load',add_load);
            }

            var count_images = gId(current_content_id).querySelectorAll('.my_item').length;
            timer_check = setInterval(function() {
              if(count_images == arr_check_load.length){

                var check_content;

                var set_content = set_column_content.init(gId(current_content_id),'my_item',3,15,15,true);

                check_content = setInterval(function() {
                  if(set_content === true){
                    gId('body_load_gif').style.display = 'none';
                    gId(current_content_id).style.overflow = 'visible';
                    removeClass(gId(current_content_id),'hidden_img_items');
                    element_select_image.init();
                    element_select_image.opened_menu = current_content_id;
                    clearInterval(check_content);
                  }
                },10);

                clearInterval(timer_check);
              }
            },10);
          }
        }
      });
    }

  },
  show_modal_upload: function(){
    document.getElementById('body_upload_image').style.display = 'block';
  }
};
