domReady(function(e){
  _e.addEvent(document.getElementById('edit_body'),'click',function(e){
    active_element = user_frame.document.body;
    document.getElementById('w_panel').style.display = 'block';
    init_elements._edit_element();
  });
});
