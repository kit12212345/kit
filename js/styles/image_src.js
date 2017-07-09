var edit_src_img = {
  show_modal: function() {
    ajx({
      url : '/include/ajax/ajax_show_images.php?action=show_modal',
      method: 'post',
      dataType: 'json',
      data: {
        'type': 'src_images'
      },
      success: function(data){
        if(data.result == 'true'){
          document.getElementById('modal_content').innerHTML = data.html;

          var arr_check_load = new Array();
          for (var i = 0; i < document.getElementsByClassName('m__img_item').length; i++) {
            _e.addEvent(document.getElementsByClassName('m__img_item')[i],'load',add_load);
          }

          function add_load(){
            arr_check_load.push('true');
            _e.removeEvent(this,'load',add_load);
          }

          var count_images = document.getElementsByClassName('m__img_item').length;
          var timer_check = setInterval(function() {
            if(count_images == arr_check_load.length){
              clearInterval(timer_check);
              document.getElementById('modal_body').style.display = 'block';
              addClass(document.body,'hide_scroll');
              edit_src_img.init();
            }
          },10);
        }
      }
    });
  },
  init: function(){
    set_column_content.init(document.getElementById('m__s_images'),'my_item',3,15,15,true);
    _e.addEvent(document.getElementById('m__s_images'),'click',edit_src_img.init_btns);
    _e.addEvent(document.getElementById('close_view_img'),'click',element_select_image.close_view_img);
  },
  init_btns: function(e) {
    e = _e.getEvent();
    var element = _e.getTarget(e);

    if(search_class(element,'btn_view_img')){
      addClass(document.getElementById('m__modal'),'disabled_click');
      var modal_img = document.getElementById('m_view_image');
      if(document.getElementById('b__image').children[0]){
        document.getElementById('b__image').innerHTML = '';
      } else{
        _e.addEvent(window,'keydown',element_select_image.init_close_key);
      }
      var img_src = element.getAttribute('data-img');
      var img = document.createElement('img');
      var offset_img = new Image(img);
      img.setAttribute('src',img_src);
      img.onload = function(){
        addClass(modal_img,'active_view_img');
      }
      document.getElementById('b__image').appendChild(img);
    } else if(search_class(element,'btn_select_img')){
      if(active_element.nodeName == 'IMG'){
        var img_src = element.getAttribute('data-img');
        active_element.setAttribute('src',img_src);
        element_select_image.close_modal();
      }
    }
  },
}
