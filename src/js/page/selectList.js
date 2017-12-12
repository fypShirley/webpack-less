/**
 * Created by bk on 2017/10/11.
 */
require('../../css/page/selectList.less');
import '../../img/me.jpg'
import 'bootstrap/dist/css/bootstrap.css'
import '../font-awesome.min.css'
import '../../css/common/animate.css'
//import '../../css/common/font-awesome.min.css'


/*require.ensure(['../components/head/index.js','../components/selectInput/index.js'], function (require) {

});*/
var head = require('../components/head/index.js');
var selectInput = require('../components/selectInput/index.js');
new head();
new selectInput();

(function(){
  var global = require('../common/global');
  var message = require('../common/message');
  var type = global.queryString('type');
  var search = decodeURI(global.queryString('search'));
  var query;
  var title=document.title;
  var selType = $('#selType'),
    selContent = $('#selContent');
  selType.val(type);
  selContent.val(decodeURI(search));
  selType.change(function(){
    query = 'type='+selType.val()+'&search='+search;
    history.pushState({ title: title }, title, location.href.split("?")[0] + "?" + query);
  });
  var staType = {0:'离职',1:'在职'};
  loadList (type,decodeURI(search));
  function loadList (type,search) {

    $('#commonList').empty();
    global.loading('#commonList');
    $.ajax({
      url:'/api/employees',
      data:{
        type:type,
        search:search
      },
      success:function(data){
        $('#commonList').empty();
        $('#positionNum').html(data.length);
        if(data.length>0){
          for(var i=0;i<data.length;i++){
            var list = data[i];
            var leaveDate;
            if(list.leaveDate){
              leaveDate = global.format.date(new Date(list.leaveDate)).date;
            }else{
              leaveDate = '至今';
            }
            var photo ;
            if(list.photo){
              photo = list.photo;
            }else{
              photo = '../../img/me.jpg';
            }
            $('#commonList').append(
              '<div class="common_body">'+
              '<div class="imgPer">'+
              '<img src="'+photo+'" alt=""/>'+
              '</div>'+
              '<div class="detailPer">'+
              '<div style="font-size: 14px;">'+
              '<span>姓名：</span><span>'+list.name+'</span>'+
              '</div>'+
              '<div class="statusPer">'+
              '<span class="statusBtn">浏览<span>'+list.Pageviews+'</span></span>'+
              '<span class="statusBtn">'+staType[list.status]+'</span>'+
              '</div>'+
              '<div class="infoPost gray">'+
              '<span>在职岗位：</span><span>'+list.position+'</span>'+
              '</div>'+
              '<div class="infoPost gray">'+
              '<span>在职时间：</span><span>'+global.format.date(new Date(list.joinDate)).date+'</span> - ' +
              '<span>'+leaveDate+'</span>'+
              '</div>'+
              '</div>'+
              '<div class="pull-right">'+
              '<a class="theme-color" href="/selectDetail.html?id='+list.id+'">查看详情</a>'+
              '</div>'+
              '</div>'
            );
          }
        }else{
          $('#positionNum').html(0);
          $('#commonList').append(
            '<div class="common_body" style="height: 133px;text-align: center;line-height: 105px;">'+
            '<span class="gray">没有查到相关数据</span>'+
            '</div>'
          );
        }

      },
      error:function(xhr){
        var err_msg = JSON.parse(xhr.responseText).err_msg;
        var upDiv = new message();
        upDiv.config({type:"danger",'switch':"hide",description:(err_msg||'请求出错！')});
        upDiv.show()
      }
    });
  }
  $('#selOut').click(function(){
    query = 'type='+selType.val()+'&search='+selContent.val();
    history.pushState({ title: title }, title, location.href.split("?")[0] + "?" + query);
    loadList(selType.val(),selContent.val());
  });
  //回车搜索
  $(document).keyup(function(e){
    switch (e.which) {
      case 13:$('#selOut').click();
        break;
    }
  })
})();