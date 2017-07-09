var html_object = new Object();

var html = '<!DOCTYPE html>';
html += '<html>';
html += '<head>';
html += '<meta charset="utf-8">';
html += '<link rel="stylesheet" href="css/tempalte_1.css" type="text/css" media="screen">';
html += '<title>TEst_template</title>';
html += '</head>';
html += '<body>';
html += '<header class="header el_move">';
html += '<div class="header_content">';
html += '<div class="i_block logo">';
html += '<img src="/images/logo_4.png">';
html += '</div>';
html += '<div class="float_r top_right_info">';
html += '<div class="i_block top_menu">';
html += '<ul class="t_m_items">';
html += '<a href="/"><li class="float_l t_menu_item"><i class="icon icon_home"></i>&nbsp;Главная</li></a>';
html += '<a href="/competitions.php"><li class="float_l t_menu_item"><i class="icon icon_picture"></i>&nbsp;Конкурсы</li></a>';
html += '<li class="float_l t_menu_item"><i class="icon icon_rules"></i>&nbsp;Правила</li>';
html += '<li class="float_l t_menu_item">О нас</li>';
html += '</ul>';
html += '</div>';
html += '</div>';
html += '</div>';
html += '</header>';
html += '<div class="wrapper" style="cursor: default;">';
html += '<div class="main_image flex m_m" id="home" style="height: 768px;">';
html += '<div style="margin: 0 auto 11em;">';
html += '<h1 class="el_move">Lorem ipsum dolor sit amet</h1>';
html += '<h3 class="el_move">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</h3>';
html += '<div class="main_btn el_move">Зарегистрироваться</div>';
html += '</div>';
html += '</div>';
html += '</div>';
html += '</body>';
html += '</html>';


function create_template_1(){
  var html = create_basic();
  return html;
}

var create_element = {
  c_link: function(src) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = src;
    link.type = 'text/css';
    link.media = 'screen';
    return link;
  },
  div: function(e_class,e_id){
    return this.set_attr(document.createElement('div'),e_class,e_id);
  },
  set_attr: function(element,e_class,e_id){
    if(e_class) element.setAttribute('class',e_class);
    if(e_id) element.id = e_id;
    return element;
  }
};

function object_basic(html,head,body){
  this.html = html;
}

function create_basic(){
  /*
  var html = document.createElement('html');
  var head = document.createElement('head');
  var body = document.createElement('body');
  var basic_html_object = new object_basic(html,head,body);
  head.appendChild(create_element.c_link('css/tempalte_1.css'));
  body.appendChild(create_element.div('header el_move'));
  body.appendChild(create_element.div('wrapper el_move'));
  html.appendChild(head);
  html.appendChild(body);
  */
  return html;
}
