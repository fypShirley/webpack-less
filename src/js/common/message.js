/**
 * Created by MOUle on 2017/9/20.
 */
/**
 * 基础窗口对象，包括弹框的三种类型(通知，确认，成功，错误/警告),关闭和打开方法
 *
 * config配置函数
 * config({
     *  type:'info',
     *  description:'这是提示信息‘
     *  switch:3000
     * })
 * type:类型(消息，警告，成功，错误)
 * description:类型的描述
 * switch:时间(不传值时是显示，传值为hide时是隐藏的时间间隔)
 * @returns Div窗体
 * Div.config({})
 * Div.show()显示窗体 Div.hide()隐藏窗体
 */
module .exports = function message(option){
  var Div = $('<div>',{class:'top animated'});
  //创建头部信息
  var Head = $('<div>',{class:'header'});
  Div.append(Head);
  var Img = $('<i class="myfa fa " aria-hidden="true"></i>');
  var Tbody = $('<div style="display: inline-block;height: 40px;line-height: 40px;padding: 0 20px">');
  var Switch = $('<i id="close" class="myfa fa fa-close" style="float: right;cursor: pointer;color: black" aria-hidden="true"></i>');
  Head.append(Img);
  Head.append(Tbody);
  Head.append(Switch);
  Div.config = function(option){
    if(option.type == 'info'){          //通知消息
      Img.addClass('fa-info').addClass('info');
    }else  if(option.type == 'warning'){   //警告信息
      Img.addClass('fa-exclamation-triangle').addClass('warning');
    }else if(option.type == 'success'){   //成功信息
      Img.addClass('fa-check').addClass('success');
    }else if(option.type == 'danger'){      //错误信息
      Img.addClass('fa-times').addClass('danger');
    }else{                                 //默认信息
      Img.addClass('fa-check').addClass('primary');
    }
    if(option.switch == 'hide'){              //右侧关闭按钮是否显示
      Switch.hide()
    }else{
      Switch.show()
    }
    Tbody.html(option.description);
  };
  document.body.appendChild(Div[0]);
  Div.u = $(Div);
  Div.show = function(time,callback){
    document.body.style.overflow = 'hidden';
    Div.u.fadeIn(time||200,callback);
    setTimeout(function(){
      Div.hide()
    },1000)
  };
  Div.hide = function(time,callback){
    Div.removeClass('fadeInDown').addClass('fadeOutUp')
    setTimeout(function(){
      Div.remove()
    },1000)
    //Div.u.fadeOut(time || 200,callback);
  };
  Div.u.hide();
  Switch.click(function(){
    Div.hide();
    Div.close && Div.close();
  })
  return Div;
}/**
 * Created by bk on 2017/10/18.
 */
