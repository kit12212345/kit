(function() {
  var files = [
    'select_image', // Редактирование фонового изображения
    //'text_edit', // TEXT
    'animate', // Редактирование анимации
    'image_src' // Редактирование src img
  ];
  for (var i = 0; i < files.length; i++) {
    document.write('<script type="text/javascript" src="/js/styles/' + files[i] + '.js"></script>');
  }
})();
