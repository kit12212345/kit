var create_css = {
  nodes : new Object(),
  css_links : new Object(),
  create : function() {
    for(var i = 0; i < user_frame.document.getElementsByTagName('*').length; i++){
      this.nodes[i] = new Array(user_frame.document.getElementsByTagName('*')[i]);
    }
    if(is_template){
      for(var i = 0; i < user_frame.document.getElementsByTagName('link').length; i++){
        this.css_links[i] = user_frame.document.getElementsByTagName('link')[i].href;
      }
    }
    this.get_styles();
  },
  get_styles : function(){
    for(var i = 0; i < Object.keys(this.nodes).length; i++){
      this.nodes[i][0].classList.add('class_' + i);
      this.nodes[i].push(this.nodes[i][0].style.cssText);
      this.nodes[i].push('class_' + i);
      this.nodes[i][0].removeAttribute('style');
    }
    this.create_file();
  },
  create_file: function(){

    ajx({
      url: '/php/create_css_file.php',
      method : 'post',
      data : {
        arr_nodes : this.nodes,
        arr_links:  this.css_links,
        print_nodes: user_frame.document.body.innerHTML,
        body_styles: user_frame.document.body.style.cssText
      },
      success: function(data){
        for(var i = 0; i < Object.keys(create_css.nodes).length; i++){
          create_css.nodes[i][0].classList.remove('class_' + i);
          create_css.nodes[i][0].setAttribute('style',create_css.nodes[i][1]);
        }
        document.getElementById('common_to_site').click();
      }
    });
  }
}
