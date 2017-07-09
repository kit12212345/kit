var _animate = {
  anim_end: true,
  show_modal: function(){
    if(!check_active_element()) return false;
    ajx({
      url : '/include/ajax/ajax_show_animations.php?action=show_animations',
      method: 'post',
      dataType: 'json',
      success: function(data){
        if(data.result == 'true'){
          document.getElementById('modal_content').innerHTML = data.html;
          for (var i = 0; i < document.getElementsByClassName('anim__item').length; i++) {
            _e.addEvent(document.getElementsByClassName('anim__item')[i],'mouseover',_animate.show_anim);
            _e.addEvent(document.getElementsByClassName('anim__item')[i],'mouseout',_animate.hide_anim);
          }
          document.getElementById('modal_body').style.display = 'block';
        }
      }
    });
  },
  show_animate: function() {
    if(!check_active_element()) return false;
    if(_animate.anim_end === true){
      var anim_block = document.getElementById('p_now_anim');
      var now_anim = anim_block.getAttribute('data-anim');
      addClass(anim_block,'animated');
      addClass(anim_block,now_anim);
      _animate.anim_end = false;

      setTimeout(function(){
        removeClass(anim_block,'animated');
        removeClass(anim_block,now_anim);
        _animate.anim_end = true;
      },_animate.get_speed());
    }
  },
  select_animate:function(anim_name){
    if(!check_active_element()) return false;
    var old_amimate = active_element.getAttribute('data-anim');
    removeClass(active_element,old_amimate);
    removeClass(document.getElementById('p_now_anim'),old_amimate);
    active_element.setAttribute('data-anim',anim_name);
    document.getElementById('p_now_anim').setAttribute('data-anim',anim_name);
    addClass(active_element,'is_anim');
    this.close_modal();
    if(document.getElementById('anim__edit').style.display != 'block'){
      document.getElementById('anim__edit').style.display = 'block';
    }
    user_frame.add_animations();
  },
  show_anim: function(){
    for (var a = 0; a < this.children.length; a++) {
      if(this.children[a].nodeName == 'IMG'){
        var data_anim = this.children[a].getAttribute('data-anim');
        addClass(this.children[a],'animated')
        addClass(this.children[a],data_anim);
      }
    }
  },
  hide_anim: function(){
    for (var a = 0; a < this.children.length; a++) {
      if(this.children[a].nodeName == 'IMG'){
        var data_anim = this.children[a].getAttribute('data-anim');
        removeClass(this.children[a],'animated')
        removeClass(this.children[a],data_anim);
      }
    }
  },
  change_speed: function(element){
    if(!check_active_element()) return false;
    var value = parseInt(element.value);
    if(value > 0){
      active_element.style.animationDuration = (value / 1000) + 's';
      document.getElementById('p_now_anim').style.animationDuration = (value / 1000) + 's';
    } else{
      active_element.style.animationDuration = '.1s';
      document.getElementById('p_now_anim').style.animationDuration = '.1s';
    }
  },
  get_speed:function(){
    if(typeof getComputedStyle !== 'undefined'){
      var time = active_element.style.animationDuration ? parseFloat(active_element.style.animationDuration) : parseFloat(getComputedStyle(active_element).animationDuration);
      return time * 1000;
    } else{

    }
  },
  close_modal: function(){
    for (var i = 0; i < document.getElementsByClassName('anim__item').length; i++) {
      _e.removeEvent(document.getElementsByClassName('anim__item')[i],'mouseover',_animate.show_anim);
      _e.removeEvent(document.getElementsByClassName('anim__item')[i],'mouseout',_animate.hide_anim);
    }
    document.getElementById('modal_body').style.display = 'none';
    removeClass(document.body,'hide_scroll');
  }
}
