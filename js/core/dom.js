var domReady = function(callback) {
    var ready = false;

    var detach = function() {
        if(document.addEventListener) {
            document.removeEventListener("DOMContentLoaded", completed);
            window.removeEventListener("load", completed);
        } else {
            document.detachEvent("onreadystatechange", completed);
            window.detachEvent("onload", completed);
        }
    }
    var completed = function() {
        if(!ready && (document.addEventListener || event.type === "load" || document.readyState === "complete")) {
            ready = true;
            detach();
            callback();
        }
    };

    if(document.readyState === "complete") {
        callback();
    } else if(document.addEventListener) {
        document.addEventListener("DOMContentLoaded", completed);
        window.addEventListener("load", completed);
    } else {
        document.attachEvent("onreadystatechange", completed);
        window.attachEvent("onload", completed);

        var top = false;

        try {
            top = window.frameElement == null && document.documentElement;
        } catch(e) {}

        if(top && top.doScroll) {
            (function scrollCheck() {
                if(ready) return;

                try {
                    top.doScroll("left");
                } catch(e) {
                    return setTimeout(scrollCheck, 50);
                }

                ready = true;
                detach();
                callback();
            })();
        }
    }
};

function isWindow( obj ) {
    return obj != null && obj === obj.window;
}
function getWindow( elem ) {
    return isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}
function offset( elem ) {

    var docElem, win,
        box = { top: 0, left: 0 },
        doc = elem && elem.ownerDocument;

    docElem = doc.documentElement;

    if ( typeof elem.getBoundingClientRect !== typeof undefined ) {
        box = elem.getBoundingClientRect();
    }
    win = getWindow( doc );
    return {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft
    };
};

var domElement = function(selector) {
    this.selector = selector || null;
    this.element = null;
};


function gId(selector){
  return document.getElementById(selector);
}

function gClass(selector){
  var arr = [];
  for (var i = 0; i < document.getElementsByClassName(selector).length; i++) {
    arr.push(document.getElementsByClassName(selector)[i]);
  }
  return arr;
}

function gTag(){
  var arr = [];
  for (var i = 0; i < document.getElementsByTagName(selector).length; i++) {
    arr.push(document.getElementsByTagName(selector)[i]);
  }
  return arr;
}

function gName(){
  var arr = [];
  for (var i = 0; i < document.getElementsByName(selector).length; i++) {
    arr.push(document.getElementsByName(selector)[i]);
  }
  return arr;
}



domElement.prototype.init = function() {
    switch (this.selector[0]) {
        case '<':
            var matches = this.selector.match(/<([\w-]*)>/);
            if (matches === null || matches === undefined) {
                throw 'Invalid Selector / Node';
                return false;
            }
            var nodeName = matches[0].replace('<', '').replace('>', '');
            this.element = document.createElement(nodeName);
            break;
        default:
            //this.element = document.querySelector(this.selector);
            if (this.selector.charAt(0) == '#') {
                this.element = document.getElementById(this.selector.substring(1));
            } else if (this.selector.charAt(0) == '.') {
                this.element = document.getElementsByClassName(this.selector.substring(1))[0];
            }
            //
            //console.log(this.element);
    }
};

domElement.prototype.hide = function() {
    this.element.style.display = 'none';
}


domElement.prototype.e = function() {
    return this.element;
}

domElement.prototype.focus = function() {
    this.element.focus();
}

domElement.prototype.offset = function() {
  return offset(this.element);
}


domElement.prototype.show = function() {
    this.element.style.display = 'block';
}
domElement.prototype.on = function(event, callback) {
    var evt = this.eventHandler.bindEvent(event, callback, this.element);
}
domElement.prototype.off = function(event) {
    var evt = this.eventHandler.unbindEvent(event, this.element);
}
domElement.prototype.val = function(newVal) {
    return (newVal !== undefined ? this.element.value = newVal : this.element.value);
};
domElement.prototype.append = function(html) {
    this.element.innerHTML = this.element.innerHTML + html;
};
domElement.prototype.prepend = function(html) {
    this.element.innerHTML = html + this.element.innerHTML;
};
domElement.prototype.html = function(html) {
    if (html === undefined) {
        return this.element.innerHTML;
    }
    this.element.innerHTML = html;
};
// $().attr('prop', 'value') support
domElement.prototype.attr = function(name, value) {
    if (value) {
        this.element.setAttribute(name, value);
        return this.element;
    } else {
        return this.element.getAttribute(name);
    }
};
domElement.prototype.attr = function(name, value) {
    this.element.each(function(el) {
        if (value) {
            this.element.setAttribute(name, value);
        } else {
            return this.element.getAttribute(name);
        }
    });
    return this.element;
};
// $().css('prop', 'value') support
domElement.prototype.css = function(prop, value) {
    if (value) {
        this.element.style[prop] = value;
        return this.element;
    } else {
        return this.element.style[prop];
    }
};
domElement.prototype.eventHandler = {
    events: [],
    bindEvent: function(event, callback, targetElement) {
        this.unbindEvent(event, targetElement);
        targetElement.addEventListener(event, callback, false);
        this.events.push({
            type: event,
            event: callback,
            target: targetElement
        });
    },
    findEvent: function(event) {
        return this.events.filter(function(evt) {
            return (evt.type === event);
        }, event)[0];
    },
    unbindEvent: function(event, targetElement) {
        var foundEvent = this.findEvent(event);
        if (foundEvent !== undefined) {
            targetElement.removeEventListener(event, foundEvent.event, false);
        }
        this.events = this.events.filter(function(evt) {
            return (evt.type !== event);
        }, event);
    }
};

SK = function(selector) {
    var el = new domElement(selector);
    el.init();
    return el;
}
