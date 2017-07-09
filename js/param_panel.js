var param_panel = {
  switch_menu: function(){
    for (var i = 0; i < document.getElementsByClassName('w_menu').length; i++) {
      _e.addEvent(document.getElementsByClassName('w_menu')[i],'click',param_panel._switch);
    }
  },
  _switch: function(e){
    var id = this.id.split('_')[1];
    removeClass(document.getElementsByClassName('active_menu')[0],'active_menu');
    addClass(this,'active_menu');

    param_panel.hide_content();
    document.getElementById('c_' + id).style.display = 'block';
  },
  create_menu_content: function(element,menu){

  },
  hide_content: function() {
    for (var i = 0; i < document.getElementsByClassName('w_panel_cont').length; i++) {
      document.getElementsByClassName('w_panel_cont')[i].style.display = 'none';
    }
  },
  clear_events: function(){
    for (var i = 0; i < document.getElementsByClassName('w_menu').length; i++) {
      _e.removeEvent(document.getElementsByClassName('w_menu')[i],'click',param_panel._switch);
    }
  }


}
param_panel.switch_menu();


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

        var $init = new Action_block(panel,e);
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


  var check_set_element = false;
  var enter_element = null;

  var diff_height = 0;
  var first_pos = [];

  _e.addEvent(gId('l_menu_params'),'mouseout',function(e){
    //check_set_element = false;
  });

  function getIndex(element,className){
    for (var i = 0; i < gClass(className).length; i++) {
      if(gClass(className)[i] == element) return i;
    }
    return false;
  }
  for (var i = 0; i < document.getElementsByClassName('l_m_item').length; i++) {
    var el = document.getElementsByClassName('l_m_item')[i];
    el.onmousemove = function(e){
      e = e ? e : window.event;
      var element = e.target ? e.target : e.srcElement;



      if(document.getElementsByClassName('place_set_menu')[0]) document.getElementsByClassName('place_set_menu')[0].remove();
      if(document.getElementsByClassName('w_panel')[1]){
        if(!document.getElementsByClassName('place_set_menu')[0] && search_class(element,'l_m_item')){
            gId('l_menu_params').style.height = gId('l_menu_params').offsetHeight + 'px';
            if(!diff_height) diff_height = gId('l_menu_params').offsetHeight;
            if(diff_height){
              gId('l_menu_params').style.height = diff_height + 'px';
            }


            for (var i = 0; i < gClass('li_common').length; i++){
              gClass('li_common')[i].style.top = first_pos[i] + 'px';
            }

            if(check_set_element === false){
              for (var i = 0; i < gClass('l_m_item').length; i++){
                if(!search_class(gClass('l_m_item')[i],'m_en_move')) {
                  first_pos.push(gClass('l_m_item')[i].offsetTop);
                  gClass('l_m_item')[i].style.top = gClass('l_m_item')[i].offsetTop + 'px';
                }
              }

              for (var i = 0; i < gClass('l_m_item').length; i++){
                if(!search_class(gClass('l_m_item')[i],'m_en_move')) addClass(gClass('l_m_item')[i],'li_common');

              }
            }


            var item_height = element.offsetHeight;
            var layer_y = e.layerY;
            var index = getIndex(element,'li_common');

            var div = document.createElement('div');
            div.setAttribute('class','place_set_menu');
            div.style.height = '37px';

            if(layer_y >= item_height / 2){
              for (var i = index + 1; i < gClass('li_common').length; i++) {
                gClass('li_common')[i].style.top = (parseInt(gClass('li_common')[i].style.top) + 40) + 'px';
              }
              if(!element.nextSibling){
                //document.getElementById('l_menu_params').appendChild(div);
              } else{
                //document.getElementById('l_menu_params').insertBefore(div,element.nextSibling);
              }
            } else{
              for (var i = index; i < gClass('li_common').length; i++) {
                gClass('li_common')[i].style.top = (parseInt(gClass('li_common')[i].style.top) + 40) + 'px';
              }
              if(!element.previousSibling){
                //document.getElementById('l_menu_params').insertBefore(div,document.getElementsByClassName('l_m_item')[0]);
              } else{
                //document.getElementById('l_menu_params').insertBefore(div,element);
              }
            }

            gId('l_menu_params').style.height = (gId('l_menu_params').offsetHeight + 40) + 'px';
            check_set_element = true;

            return;


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
