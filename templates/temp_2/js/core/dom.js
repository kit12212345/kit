var _e = {
  addEvent: function(element,_event,handler){
    if(element.addEventListener){
      element.addEventListener(_event,handler,false);
    } else if(element.attachEvent){
      element.attachEvent('on' + _event,handler);
    } else{
      element['on' + _event] = handler;
    }
  },
  removeEvent: function(element,_event,handler) {
    if(element.removeEventListener){
      element.removeEventListener(_event,handler,false);
    } else if(element.detachEvent){
      element.detachEvent(_event,handler);
    } else{
      element['on' + _event] = null;
    }
  },
  getEvent: function(e){
    return e ? e : window.event;
  },
  getTarget: function(e) {
    return e.target ? e.target : e.srcElement;
  }
}
