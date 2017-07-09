var upload_image = {
  accepted_ext:  ['.jpeg','.jpg', '.png'],
  accepted_file_size: 10000000,
  current_load_files: 0,
  current_end_load_files: 0,
  reject_load_files: false,
  arr_load_files: [],
  files: [],
  init: function(){
    _e.addEvent(gId('btn_load_img'),'click',this.select_images);
  },
  show_modal: function() {
    gId('body_upload_image').style.display = 'block';
  },
  close_modal: function() {
    gId('body_upload_image').style.display = 'none';
  },
  create_success_html: function() {
    var html = '<div class="text_center succ_load_files" id="succ_load_files">';
      html += '<div>';
        html += '<div class="arc_succ_load">';
        html += '</div>';
        html += '<h2>Загрузка</h2>';
        html += '<h4>Файлы успешно загружены</h4>';
      html += '</div>';
      html += '<div onclick="upload_image.btn_ok()" class="btn relative btn_load_ok">ok</div>';
    html += '</div>';

    return html;
  },
  btn_ok: function(){
    gId('body_upload_image').style.display = 'none';
    gId('mload_img__cont').style.display = 'block';
    gId('sload_img__cont').style.display = 'none';
    gId('sload_img__cont').innerHTML = '';
    gId('load_img__head').style.display = 'block';
    gId('file_list').value = '';
  },
  create_status: function(index){

    var item = document.createElement('div');
    addClass(item,'up_img__item');

    var line_progress = document.createElement('div');
    addClass(line_progress,'up_line_progress');
    var status_img_load = document.createElement('div');
    status_img_load.id = 'status_load_' + index;
    addClass(status_img_load,'i_block');
    addClass(status_img_load,'up_img_load');
    line_progress.appendChild(status_img_load);
    item.appendChild(line_progress);

    var btn_cancel = document.createElement('div');
    addClass(btn_cancel,'btn');
    addClass(btn_cancel,'btn_load_cancel');
    btn_cancel.id = 'btn_cancel_load_' + index;
    btn_cancel.onclick = upload_image._abort;
    btn_cancel.appendChild(document.createTextNode('Отменить'));

    item.appendChild(btn_cancel);

    return item;
  },
  hasExtension: function(str){
    var test_str=str.toLowerCase();
    return (new RegExp('(' + this.accepted_ext.join('|').replace(/\./g, '\\.') + ')$')).test(test_str);
  },
  select_images: function(){
    var i_file = gId('file_list');
    i_file.click();
    _e.addEvent(i_file,'change',upload_image.check_files);
  },
  remove_line_load: function(index){
    removeElement(gId('btn_cancel_load_' + index).parentNode);
    if(upload_image.current_end_load_files == upload_image.current_load_files){
      var items = upload_image.create_image_item();
      if(gId('cont__img_my').querySelectorAll('.my_item')[0]){
        gId('cont__img_my').insertBefore(items.fragment,gId('cont__img_my').querySelectorAll('.my_item')[0]);
      } else{
        gId('cont__img_my').appendChild(items.fragment);
      }

      var arr_images = [];

      function _load_img(){
        arr_images.push('.');
        _e.removeEvent(this,'load',_load_img);
      }

      for (var i = 0; i < items.images.length; i++) {
        _e.addEvent(items.images[i],'load',_load_img);
      }

      var _check = setInterval(function(){
        if(upload_image.files.length == arr_images.length){
          set_column_content.init(gId('cont__img_my'),'my_item',3,15,15,true);
          gId('load_img__head').style.display = 'none';
          gId('sload_img__cont').innerHTML = upload_image.create_success_html();

          for(var i = 0; i < gId('cont__img_my').querySelectorAll('.vis_hidden').length; i++){
            removeClass(gId('cont__img_my').querySelectorAll('.vis_hidden')[i],'vis_hidden');
          }

          if(gId('not_user_images')) removeElement(gId('not_user_images'));

          upload_image.files = [];
          upload_image.current_load_files = 0;
          upload_image.current_end_load_files = 0;
          upload_image.reject_load_files = false;
          upload_image.arr_load_files = [];

          clearInterval(_check);
        }
      },5);

    }
  },
  check_files: function(){
    if (window.FileReader){
      var _this = upload_image;
      var files = this.files;
      _this.current_load_files = files.length;

      var fragment = document.createDocumentFragment();
      for (var i = 0; i < files.length; i++){
        fragment.appendChild(_this.create_status(i));
      }
      gId('sload_img__cont').innerHTML = '';
      gId('sload_img__cont').appendChild(fragment);
      gId('sload_img__cont').style.display = 'block';
      gId('mload_img__cont').style.display = 'none';

      for (var i = 0; i < files.length; i++){
        var is_last = false;
        var fd = new FormData();
        if(!_this.hasExtension(files[i].name)){
          message.show('Ошибка: файл ' + files[i].name + ' имеет недопустимый формат');
          _this.current_load_files--;
          _this.remove_line_load(i);
          continue;
        }
        if(files[i].size > _this.accepted_file_size){
          message.show('Ошибка: файл ' + files[i].name + ' слишком большой, максимум 10 мегабайт');
          _this.current_load_files--;
          _this.remove_line_load(i);
          continue;
        }
        fd.append('file',files[i]);

        if(i == files.length - 1) is_last = true;

        _this.upload(fd,i);
      }
    }
  },
  _abort:function(){
    var _this = upload_image;
    var index = this.id.split('_')[3];
    if(_this.arr_load_files[index]) _this.arr_load_files[index].abort();
    _this.current_load_files--;
    _this.reject_load_files = true;
    _this.remove_line_load(index);
  },
  create_image_item:function(){
    var arr_images = [];
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < this.files.length; i++){
      var image_src = this.files[i];

      var item = document.createElement('div');
      addClass(item,'my_item');
      addClass(item,'vis_hidden');
      var img = document.createElement('img');
      img.src = image_src;
      arr_images.push(img);

      image_src = image_src.replace(/thumbnail_480\//g, '');

      var _menu = document.createElement('div');
      addClass(_menu,'m_img_menu');

      var _btn_view = document.createElement('div');
      _btn_view.setAttribute('class','btn btn_view_img');
      _btn_view.setAttribute('data-img',image_src);
      _btn_view.appendChild(document.createTextNode('Показать'));

      var _btn_select = document.createElement('div');
      _btn_select.setAttribute('class','btn btn btn_select_img');
      _btn_select.setAttribute('data-img',image_src);
      _btn_select.appendChild(document.createTextNode('Выбрать изображение'));

      _menu.appendChild(_btn_view);
      _menu.appendChild(_btn_select);

      item.appendChild(img);
      item.appendChild(_menu);

      fragment.appendChild(item);
    }
    return {
      'fragment': fragment,
      'images':arr_images
    };
  },
  upload: function(fd,index){
    upload_image.arr_load_files.push(ajx({
        xhr: function(){
          var xhr = new window.XMLHttpRequest();
          xhr.upload.addEventListener("progress", function(evt) {
            if (evt.lengthComputable){
              var percentComplete = evt.loaded / evt.total;
              percentComplete = parseInt(percentComplete * 100);
              gId('status_load_' + index).style.width = percentComplete + '%';
            }
          }, false);
          return xhr;
        },
        url: '/components/uploader/ajax_upload.php?action=upload_files',
        dataType: 'json',
        method: 'post',
        data: fd,
        processData: false,
        contentType: false,
        error: function (jqXHR, exception, errorThrown){
          var msg = '';
          if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
          } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
          } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
          } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
          } else if (exception === 'timeout') {
            msg = 'Time out error.';
          } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
          } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
          }
        },
        success: function(data) {
          if(data.result == 'true'){
            upload_image.files.push(data.image);
            upload_image.current_end_load_files++;
            upload_image.remove_line_load(index);
          } else{
            alert(data.string);
          }
        }
      }));
  }
};
