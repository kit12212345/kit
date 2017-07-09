function getCookie(name) {
  var cookie = " " + document.cookie;
  var search = " " + name + "=";
  var setStr = 0;
  var offset = 0;
  var end = 0;
  if (cookie.length > 0) {
    offset = cookie.indexOf(search);
    if (offset != -1) {
      offset += search.length;
      end = cookie.indexOf(";", offset)
      if (end == -1) {
        end = cookie.length;
      }
      setStr = unescape(cookie.substring(offset, end));
    }
  }
  return (setStr);
}

function setCookie(name,value){
  var date = new Date;
  date.setDate(date.getDate() + 1000);
  document.cookie = name + "=" + value + "; path=/; expires=" + date.toUTCString();
}


function search_class(search_obj, className) {
  if (typeof classList !== 'undefined') {
    search_obj = search_obj.classList.value;
    if (search_obj.indexOf(className) >= 0) return true;
  } else {
    search_obj = search_obj.className;
    if (search_obj.indexOf(className) >= 0) return true;
  }
  return false;
}

function addClass(element, className) {
  if (typeof element.classList !== 'undefined') element.classList.add(className);
  else {
    var el_classes = element.className;
    var new_class = el_classes.concat(" " + className);
    element.className = new_class;
  }
}

function removeClass(element, className) {
  if (typeof element.classList !== 'undefined') element.classList.remove(className);
  else {
    var el_classes = element.className;
    var new_class = el_classes.replace(className, '');
    element.className = new_class;
  }
}


function element_set_default_data(element) {
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

function removeElement(element) {
  return element.parentNode.removeChild(element);
}

function set_size_u_site(is_first) {
  var screen_offset = get_screen_offset();
  var height = parseInt(screen_offset._height) - parseInt(document.getElementById('u_site').offsetTop);
  document.getElementById('u_site').style.height = height + 'px';
}

function get_screen_offset() {
  var pageWidth = window.innerWidth;
  var pageHeight = window.innerHeight;
  if (typeof pageHeight != 'number') {
    if (document.compatMode == 'CSS1Compat') {
      pageWidth = document.documentElement.clientWidth;
      pageHeight = document.documentElement.clientHeight;
    } else {
      pageWidth = document.body.clientWidth;
      pageHeight = document.body.clientHeight;
    }
  }
  return {
    '_width': pageWidth,
    '_height': pageHeight
  }
}

function contains(refNode, otherNode) {
  // otherNode - find it's NODE
  if (typeof refNode.compareDocumentPosition == "function") {
    return !!(refNode.compareDocumentPosition(otherNode) & 16);
  } else {
    var node = otherNode.parentNode;
    do {
      if (node == refNode) {
        return true;
      } else {
        node = node.parentNode;
      }
    } while (node !== null);
    return false;
  }
}


function create_load_gif(){
  var div = document.createElement('div');
  div.id = 'load_gif';
  addClass(div,'load_gif');
  var img = document.createElement('img');
  img.src = '/images/icons/load_gif.gif';
  img.setAttribute('alt','loading...');
  div.appendChild(img);
  return div;
}

function show_message(string,is_error){

}



var set_column_content = {
  element_class: null,
  obj_class: null,
  col_ob: function(r, colmn, val) {
    r[colmn] = val;
    return r;
  },
  create_colmn_obj: function(count_columns, content_width, margin_left) {
    var obj = {};
    for (var i = 1; i <= count_columns; i++) {
      var col = 'column_' + i;
      var col_num = i - 1;
      var m_count = i > 1 ? 'column_' + col_num : 0;
      if (typeof this.obj_class[col_num] === 'undefined') return obj;
      var left = i == 1 ? 0 : parseInt(obj[m_count].left) + (parseInt(this.obj_class[col_num].offsetWidth) + margin_left);
      obj = this.col_ob(obj, col, {
        'top': '0',
        'left': left
      });
    }
    return obj;
  },
  init: function(parent_content, element_class, count_columns, margin_top, margin_left, set_height) {
    this.element_class = element_class;
    var content_width = parseInt(parent_content.offsetWidth);
    var obj_class = parent_content.querySelectorAll('.' + element_class);
    this.obj_class = obj_class;
    var i_length = obj_class.length;
    var item_width = (content_width / count_columns) - ((margin_left * (count_columns - 1)) / count_columns);
    for (var i = 0; i < i_length; i++) {
      obj_class[i].style.width = item_width + 'px';
    }
    var columns_offset = this.create_colmn_obj(count_columns, content_width, margin_left);
    var col = 0;
    for (var i = 0; i < i_length; i++) {
      col++;
      if (col > count_columns) col = 1;
      obj_class[i].style.left = columns_offset['column_' + col].left + 'px';
      obj_class[i].style.top = columns_offset['column_' + col].top + 'px';
      var c_offset_left = parseInt(columns_offset['column_' + col].left);
      columns_offset['column_' + col] = {
        left: columns_offset['column_' + col].left,
        top: parseInt(columns_offset['column_' + col].top) + (parseInt(obj_class[i].offsetHeight) + margin_top)
      };
    };
    var arr_height = new Array();
    for (var i = 0; i < Object.keys(columns_offset).length; i++) {
      var col = i + 1;
      arr_height.push(columns_offset['column_' + col].top);
    };
    arr_height.sort();
    var value = arr_height[arr_height.length - 1];
    var cont_height = value + 15 * count_columns;
    parent_content.style.height = cont_height + 'px';

    if (set_height === true) {
      for (var i = 0; i < obj_class.length; i++) {
        var _element = obj_class[i];
        var img = this.get_image(_element);
        if (img !== false) {
          _element.style.height = img.offsetHeight + 'px';
        }
      }
    }

    return true;
  },
  get_image: function(element) {
    for (var i = 0; i < element.children.length; i++) {
      if (element.children[i].nodeName == 'IMG') return element.children[i];
    }
    return false;
  }
};


var isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

function check_active_element() {
  if (!active_element) {
    alert('Элемент не выбран');
    return false;
  }
  return true;
}

function col_obj(r, colmn, val){
  r[colmn] = val;
  return r;
}


var arr_messages = ['1'];
var message = {
  messages: [],
  show: function(string,is_ok){
    var offset_messages_top = 50;
    var message_block = this.create_message(string);
    var class_name = is_ok === true ? 'message_success' : 'message_error';
    var timeout = setTimeout(function(){
      addClass(message_block,class_name);
      clearTimeout(timeout);
    },10);
    var message_show = setTimeout(function(){
      removeClass(message_block,class_name);
      message.messages.splice(message.search_key(message_block),1);
      var remove_element = setTimeout(function(){
        try {
          if(message_block){
            removeElement(message_block);
            message.edit_offset();
          }
        } catch(e){
        }
        clearTimeout(remove_element);
      },210);
      clearTimeout(message_show);
    },8000);

    if(gClass('message_block').length > 0){
      message_block.style.top = this.get_offset() + 'px';
    }
    document.body.appendChild(message_block);
    message.messages.push({'element': message_block, 'height': message_block.offsetHeight});
  },
  edit_offset: function(){
    var offset_top = 0;
    for (var i = 0; i < message.messages.length; i++) {
        var element = message.messages[i].element;
        var height = message.messages[i].height;

        if(i == 0){
          offset_top += 25;
          element.style.top = offset_top + 'px';
          offset_top += height;
        } else{
          offset_top += 25;
          element.style.top = offset_top + 'px';
          offset_top += height;
        }
    }
  },
  search_key: function(element){
    for (var i = 0; i < this.messages.length; i++) {
      if(this.messages[i].element == element) return i;
    }
    return false;
  },
  _close:function(){
    var element = this.parentNode;
    var class_name = null;
    if(search_class(element,'message_success')){
      class_name = 'message_success';
    } else if(search_class(element,'message_error')){
      class_name = 'message_error';
    } else return false;

    removeClass(element,class_name);
    message.messages.splice(message.search_key(element),1);
    var remove_element = setTimeout(function(){
      removeElement(element);
      message.edit_offset();
      clearTimeout(remove_element);
    },210);
  },
  create_message: function(string){

    var _message = document.createElement('div');
    addClass(_message,'message_block');
    message.id = 'message_block';

    var message_cont = document.createElement('div');
    addClass(message_cont,'message__cont');
    message_cont.appendChild(document.createTextNode(string));

    var close_message = document.createElement('div');
    addClass(close_message,'absolute');
    addClass(close_message,'delete_message');
    close_message.onclick = message._close;

    _message.appendChild(message_cont);
    _message.appendChild(close_message);

    return _message;
  },
  get_offset: function(){
    var offset_top = 0;
    for (var i = 0; i < this.messages.length; i++) {
      offset_top += this.messages[i].height + 25;
    }
    return offset_top + 25;
  }
}
