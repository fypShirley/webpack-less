/**
 * Created by bk on 2017/10/11.
 */
require('../../css/page/selectDetail.less');
import '../../img/me.jpg'
require('bootstrap/dist/css/bootstrap.css');
require('../font-awesome.min.css');
import '../../css/common/animate.css'
//import '../../css/common/font-awesome.min.css'


var head = require('../components/head/index.js');
new head();

(function(){
  var global = require('../common/global');
  var message = require('../common/message');

  var staType = {0:'离职',1:'在职'};
  var sexType = {0:'fa-female',1:'fa-male'};
  var commonType = {0:'入职',1:'担任',2:'离职'};

  var ID,Name ;
  var queryID = global.queryString('id');

  $.ajax({
    url:'/api/employee/'+queryID,
    success:function(data){
      $('#common').empty();
      var list = data;
      $('#name').html(list.name);
      if(list.photo){
        $('#Img').attr('src',list.photo);
      }else{
        $('#Img').attr('src','/img/me.jpg');
      }

      $('#views').html(list.Pageviews);
      $('#staType').html(staType[list.status]);
      $('#position').html(list.position);
      $('#join').html(global.format.date(new Date(list.joinDate)).date);
      ID = data.id;
      Name = data.name;
      var leaveDate;
      if(list.leaveDate){
        leaveDate = format.date(new Date(list.leaveDate)).date;
      }else{
        leaveDate = '至今';
      }
      $('#leave').html(leaveDate);
      $('#distinction').addClass(sexType[list.gender]);

      var experience = list.experience;
      if(experience.length>0){
        for(var i=0;i<experience.length;i++){
          var exper = experience[i];
          $('#common').append(
            '<div class="list">' +
            '<span style="margin-right: 10px;">'+global.format.date(new Date(exper.time)).date+'</span>' +
            '<span style="margin-right: 10px;">'+commonType[exper.act]+'</span>' +
            '<span>'+exper.content+'</span>' +
            '</div>'
          );
        }
      }else{
        $('#common').append(
          '<span class="footerGray">暂无数据</span>'
        )
      }

      if(list.achievements == 0){
        $('#workAch').html('该员工工作表现良好');
      }else{
        $('#workAch').html('该员工有'+list.achievements+'条工作成就记录');
      }
      if(list.creditRecord == 0){
        $('#workNote').html('该员工暂无不良诚信记录');
      }else{
        $('#workNote').html('该员工有'+list.creditRecord+'条不良诚信记录');
      }

      $('#checkBk').click(function(){
        window.location="/application.html?id="+ID+"&name="+Name;
      });
      $('#report').click(function(){
        window.location="/report.html?id="+ID+"&name="+Name;
      });

    }
  });
})();