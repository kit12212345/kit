if(document.getElementsByClassName == undefined) {
   document.getElementsByClassName = function(cl) {
      var retnode = [];
      var myclass = new RegExp('\\b'+cl+'\\b');
      var elem = this.getElementsByTagName('*');
      for (var i = 0; i < elem.length; i++) {
         var classes = elem[i].className;
         if (myclass.test(classes)) {
            retnode.push(elem[i]);
         }
      }
      return retnode;
   }
};
if(!Object.keys){
  Object.keys = function(obj) {
    var keys = [];
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        keys.push(i);
      }
    }
    return keys;
  };
};
