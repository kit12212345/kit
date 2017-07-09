
var treeNodes = new Array();
var arr_tree_nodes = new Array();

var tree = null;
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

domReady(function(){
  tree = document.createNodeIterator(document.getElementById('u_site'),NodeFilter.SHOW_ALL,null,false)
  tree_nodes.create();  
});
