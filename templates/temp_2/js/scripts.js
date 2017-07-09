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

_e.addEvent(window,'load',view_animated);

function view_animated(){
  for (var i = 0; i < anims_elements.length; i++) {
    if(anims_elements[i]._element.getBoundingClientRect().top - document.body.scrollTop <= document.body.scrollTop){
      var type_anim = anims_elements[i]._element.getAttribute('data-anim');
      anims_elements[i]._element.classList.add('animated');
      anims_elements[i]._element.classList.add(type_anim);
    }
  }
  _e.removeEvent(window,'load',view_animated);
}


_e.addEvent(window,'resize',function(e){
  for (var i = 0; i < document.getElementsByClassName('side').length; i++) {
    document.getElementsByClassName('side')[i].style.height = get_screen_offset()._height + 'px';
  }
});


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


_e.addEvent(window,'scroll',function(e){
  var view_selection_add = search_add_anims(document.body.scrollTop);
  var view_selection_remove = search_remove_anims(document.body.scrollTop);
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
});



function add_animations(){
  for (var i = 0; i < document.getElementsByClassName('is_anim').length; i++) {
    anims_elements.push({
      '_element': document.getElementsByClassName('is_anim')[i],
      '_height': parseInt(document.getElementsByClassName('is_anim')[i].offsetHeight),
      'end_anim': true
    });
  }
}
add_animations();
