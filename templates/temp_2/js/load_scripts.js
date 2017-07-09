(function() {
  var files = [
    current_root_dit + '/js/core/dom.js',
    current_root_dit + '/js/core/ajax.js',
    current_root_dit + '/js/core/crossbrowser.js',
    current_root_dit + '/js/core/event.js',
  ];
  for (var i = 0; i < files.length; i++) {
    document.write('<script type="text/javascript" src="' + files[i] + '"></script>');
  }
})();
