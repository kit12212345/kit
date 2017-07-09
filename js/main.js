var IS_FALSE_EVENT = false;
var user_frame = null;
var is_template = true; // Это шаблон иль с нуля
var special_nodes = new Array('INPUT', 'IMG', 'TEXTAREA');
var l_menu_is_open = true;
var listen_resize_block;
var set_help_lines = getCookie('enabled_lines') ? getCookie('enabled_lines') : 'true';
var edit_menus = {
  body: null,
  div: null,
  img: null
}

domReady(function() {

  user_frame = window.frames[0]
  _e.addEvent(user_frame, 'load', frame_load);

  function frame_load() {
    init_elements.init();
    var tag_html = user_frame.document.getElementsByTagName('html')[0];
    var site_min_width = tag_html.getAttribute('data-minwidth');
    if (site_min_width) {
      tag_html.style.minWidth = site_min_width + 'px';
      //  user_frame.scrollTo(site_min_width / 2,0);
    }

    for (var i = 0; i < user_frame.document.getElementsByTagName('a').length; i++) {
      if (user_frame.document.getElementsByTagName('a')[i].getAttribute('href') == '#') {
        _e.addEvent(user_frame.document.getElementsByTagName('a')[i], 'click', function(e) {
          e.preventDefault();
        });
      }
    }

    for (var i = 0; i < user_frame.document.getElementsByTagName('*').length; i++) {
      element_set_default_data(user_frame.document.getElementsByTagName('*')[i]);
    }
    _e.removeEvent(user_frame, 'load', frame_load);
  }


  var el1 = document.getElementById("left_panel");
  var m_content = document.getElementsByClassName('main_content')[0];

  set_size_u_site(true);

  _e.addEvent(window, 'resize', function(e) {
    set_size_u_site();
  });

  _e.addEvent(document.getElementById('change_l_menu'), 'click', function(e) {
    this.style.display = 'none';
    addClass(el1, 'mini_left_menu');
    addClass(m_content, 'darken_m');
  });

  _e.addEvent(document.getElementById('left_panel'), 'click', function(e) {
    if (l_menu_is_open === true) {
      e = e ? e : window.event;
      var element = e.target ? e.target : e.srcElement;
      if (search_class(element, 'change_l_menu') || search_class(element, 'minus_icon')) {
        document.getElementById('change_l_menu').style.display = 'none';
        addClass(el1, 'mini_left_menu');
        addClass(m_content, 'darken_m');
        l_menu_is_open = false;
      }
    } else {
      removeClass(el1, 'mini_left_menu');
      removeClass(m_content, 'darken_m');
      setTimeout(function() {
        document.getElementById('change_l_menu').style.display = 'block';
      }, 250);
      l_menu_is_open = true;
    };
  });



  /*Линии на элементе*/
  if(set_help_lines == 'true'){
    document.getElementById('enabled_lines').innerHTML = 'Откл. вспомогательные линии';
  } else{
    document.getElementById('enabled_lines').innerHTML = 'Вкл. вспомогательные линии';
  }

  _e.addEvent(document.getElementById('enabled_lines'),'click',function(e){
    var name = 'enabled_lines';
    var date = new Date;
    date.setDate(date.getDate() + 1000);
    if(set_help_lines == 'true'){
      document.cookie = name + "=" + 'false' + "; path=/; expires=" + date.toUTCString();
      this.innerHTML = 'Вкл. вспомогательные линии';
      set_help_lines = 'false';

      var lines_length = user_frame.document.getElementsByClassName('c_line').length;
      for (var i = 0; i < lines_length; i++) {
        removeElement(user_frame.document.getElementsByClassName('c_line')[0]);
      }

    } else{
      document.cookie = name + "=" + 'true' + "; path=/; expires=" + date.toUTCString();
      this.innerHTML = 'Откл. вспомогательные линии';
      set_help_lines = 'true';
      init_elements.create_lines();
    }
  });
  /*END Линии на элементе*/



  for (var i = 0; i < document.getElementsByClassName('l_m_item').length; i++) {
    _e.addEvent(document.getElementsByClassName('l_m_item')[i],'click',function(){
      var arrow = this.getElementsByClassName('m_sprite')[0];
      var set_content = this.getElementsByClassName('l_m_cont')[0];
      if(set_content.innerHTML != ''){
        removeClass(arrow, 'l_active_par');
        set_content.innerHTML = '';
        set_content.style.display = 'none';
      } else{
        addClass(arrow, 'l_active_par');
        for (var a = 0; a < menu_params.add_elements.length; a++) {
          set_content.innerHTML += menu_params.add_elements[a];
        }
        set_content.style.display = 'block';
      }

      init_create_els();
    });
  }

  /*
  _e.addEvent(document.getElementById('l_menu_params'), 'click', function(e) {
    e = e ? e : window.event;
    var element = e.target ? e.target : e.srcElement;
    if (element.nodeName == 'LI' || element.parentNode.nodeName == 'LI') {

      if (search_class(element, 'arrow_menu')) {
        if (search_class(element, 'l_active_par')) {
          removeClass(element, 'l_active_par');
          document.getElementsByClassName('l_m_cont')[0].style.display = 'none';
          document.getElementsByClassName('l_m_cont')[0].innerHTML = '';
        } else {
          addClass(element, 'l_active_par');
          for (var i = 0; i < menu_params.add_elements.length; i++) {
            document.getElementsByClassName('l_m_cont')[0].innerHTML += menu_params.add_elements[i];
          }
          document.getElementsByClassName('l_m_cont')[0].style.display = 'block';
        }
      } else {
        for (var i = 0; i < element.children.length; i++) {
          if (search_class(element.children[i], 'arrow_menu')) {
            if (search_class(element.children[i], 'l_active_par')) {
              removeClass(element.children[i], 'l_active_par');
              document.getElementsByClassName('l_m_cont')[0].style.display = 'none';
              document.getElementsByClassName('l_m_cont')[0].innerHTML = '';
            } else {
              addClass(element.children[i], 'l_active_par');
              for (var i = 0; i < menu_params.add_elements.length; i++) {
                document.getElementsByClassName('l_m_cont')[0].innerHTML += menu_params.add_elements[i];
              }
              document.getElementsByClassName('l_m_cont')[0].style.display = 'block';
            }
          }
        }
      }
      init_create_els();
    }
  });
  */
});
