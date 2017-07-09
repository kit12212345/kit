function search_class(search_obj,className){
  if(typeof classList !== 'undefined'){
    search_obj = search_obj.classList.value;
    if(search_obj.indexOf(className) >= 0) return true;
  } else{
    search_obj = search_obj.className;
    if(search_obj.indexOf(className) >= 0) return true;
  }
  return false;
}

function addClass(element,className){
  if(typeof element.classList !== 'undefined') element.classList.add(className);
  else{
    var el_classes = element.className;
    var new_class = el_classes.concat(" " + className);
    element.className = new_class;
  }
}

function removeClass(element,className){
  if(typeof element.classList !== 'undefined') element.classList.remove(className);
  else{
    var el_classes = element.className;
    var new_class = el_classes.replace(className,'');
    element.className = new_class;
  }
}


function element_set_default_data(element){
  element.infoBorder = {
    border: 'solid',
    borderTop: 'solid',
    borderLeft: 'solid',
    borderBottom: 'solid',
    borderRight: 'solid'
  };
  element.infoWidth = 'px';
  element.infoHeight = 'px';
  element.infoMargin = {
    margin: 'px',
    marginTop: 'px',
    marginBottom: 'px',
    marginLeft: 'px',
    marginRight: 'px'
  },
  element.infoPadding = {
    padding: 'px',
    paddingTop: 'px',
    paddingBottom: 'px',
    paddingLeft: 'px',
    paddingRight: 'px'
  }
}

function removeElement(element){
return element.parentNode.removeChild(element);
}

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


function set_size_u_site(){
var screen_offset = get_screen_offset();
var height = screen_offset._height - document.getElementById('u_site').offsetTop;
document.getElementById('u_site').style.height = height + 'px';
}


function contains(refNode,otherNode){
// otherNode - find it's NODE
if(typeof refNode.compareDocumentPosition == "function"){
    return !!(refNode.compareDocumentPosition(otherNode) & 16);
  } else{
    var node = otherNode.parentNode;
    do {
      if(node == refNode){
        return true;
      } else{
        node = node.parentNode;
      }
    } while (node !== null);
    return false;
  }
}
