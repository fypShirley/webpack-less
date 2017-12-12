// 加载模板
var html = require('./tmpl/selectInput.html');


module.exports = function () {

  var $dialog = $(html).clone();

  $dialog.find('#selOut').click(function(){
    var message = require('../../common/message');
    var m = new message();
    var type = $('#selType').val();
    var search = $('#selContent').val();
    if(!search){
      m.config({type:"danger",'switch':"hide",description:"请填写搜索内容！！"});
      m.show()
    }else{
      window.location="selectList.html?type="+type+"&search="+search;
    }
  });
//回车搜索
  $(document).keyup(function(e){
    switch (e.which) {
      case 13:$('#selOut').click();
        break;
    }
  });

  $('#selectInput').append($dialog);
};
