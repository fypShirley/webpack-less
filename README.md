�����ӽӿڶ��Ǳ��صĽӿڣ�
���¶���Щ�ʼǣ�

bable-loader  ���������ʹ�� Babel �� webpack ת��JavaScript�ļ���

������webpack���ö����У�����Ҫ�� babel-loader ��ӵ�ģ���б�������ʾ��
 jquery
 less
 webpack

 babel-loader
 babel-core
 babel-preset-es2015

 css-loader
 style-loader
 less-loader
 html-loader

 webpack-dev-server
 html-webpack-plugin
 extract-text-webpack-plugin
 uglifyjs-webpack-plugin --save-dev


  Ŀ¼һ��
  filename: 'page/index.html', // ���ɵ�html���·���������path
  contentBase:'./dist/page',//���ط��� �������ص�ҳ�����ڵ�Ŀ¼







 ### less

 #����
  lighten(@color, 10%); // return a color which is 10% *lighter* than @color
  darken(@color, 10%); // return a color which is 10% *darker* than @color
  saturate(@color, 10%); // return a color 10% *more* saturated than @color
  desaturate(@color, 10%);// return a color 10% *less* saturated than @color
  fadein(@color, 10%); // return a color 10% *less* transparent than @color
  fadeout(@color, 10%); // return a color 10% *more* transparent than @color
  spin(@color, 10); // return a color with a 10 degree larger in hue than @color
  spin(@color, -10); // return a color with a 10 degree smaller hue than @color


  #��������
   //->LESS����
      .transition(@property:all;@duration:1s;@function:linear;@delay:0s;) {
        -webkit-transition: @property @duration @function @delay;
        -moz-transition: @property @duration @function @delay;
        -ms-transition: @property @duration @function @delay;
        -o-transition: @property @duration @function @delay;
        transition: @property @duration @function @delay;
      }

      .box1 {
        .transition;
      }

      .box2 {
        .transition(@duration: 2s);
      }

      .box3 {
        .transition(@duration: 2s; @property: width;);
      }

      //->����ΪCSS�Ľ��
      .box1 {
          -webkit-transition: all 1s linear 0s;
          -moz-transition: all 1s linear 0s;
          -ms-transition: all 1s linear 0s;
          -o-transition: all 1s linear 0s;
          transition: all 1s linear 0s;
      }

      .box2 {
          -webkit-transition: all 2s linear 0s;
          -moz-transition: all 2s linear 0s;
          -ms-transition: all 2s linear 0s;
          -o-transition: all 2s linear 0s;
          transition: all 2s linear 0s;
      }

      .box3 {
          -webkit-transition: width 2s linear 0s;
          -moz-transition: width 2s linear 0s;
          -ms-transition: width 2s linear 0s;
          -o-transition: width 2s linear 0s;
          transition: width 2s linear 0s;
      }

  #������arguments

     //->LESS����
     .transition(@property:all;@duration:1s;@function:linear;@delay:0s;) {
        -webkit-transition: @arguments;
        transition: @arguments;
     }

     .box1 {
        .transition;
     }

     //->����ΪCSS�Ľ��
     .box1 {
         -webkit-transition: all 1s linear 0s;
         transition: all 1s linear 0s;
     }

  #��������ֵ
      //->LESS����
      .average(@x, @y) {
         @result: ((@x + @y) / 2);
      }

      div {
         .average(16px, 50px); //"call" the mixin
         padding: @result; //use its "return" value
      }

      //->����ΪCSS�Ľ��
      div {
          padding: 33px;
      }

 #����
      @init: #111111;
      @transition: @init*2;
      .switchColor {
      color: @transition;
      }

 #Ƕ��
     a {
        color: red;
        text-decoration: none;
        &:hover {// �� & ʱ��������ͬһ��Ԫ�ػ��Ԫ�ص�α�࣬û�� & �����Ǻ��Ԫ��
         color: black;
         text-decoration: underline;
        }
      }


 #�̳У�
     .public {//->��ѡ�����������()�Ϳ��Բ����������ʽ��  .public()
            width: 100px;
            height: 100px;
     }

     nav ul {
         .public;
         list-style: none;
     }

     //->����ΪCSS�Ľ��
      nav ul {
          width: 100px;
          height: 100px;
          li
      }


 #����
     .public {
            width: 100px;
            height: 100px;
     }

     nav ul {
         &:extend(.public);
         list-style: none;
     }
    #��
         nav ul:extend(.public) {
                 list-style: none;
         }

      //->����ΪCSS�Ľ��
      .public, nav ul {
          width: 100px;
          height: 100px;
      }

      nav ul {
          list-style: none;
      }


 #˽��������
     //->LESS����
     @color: #ccc;
     .box {
         @color: #eee;
         .gray {
             color: @color; //#eee
         }
     }

     .box2 {
         .gray {
             color: @color; //ccc
         }
     }


 #import
    //->LESS����
      @color: #ccc;
       .box {
         @color: #eee;
         .gray {
           color: @color;
         }
       }

       nav ul {
         .box !important;
       }

       //->����ΪCSS�Ľ��
          .box .gray {
              color: #eee;
          }

          nav ul .gray {
              color:#eee !important;
          }