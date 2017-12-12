本例子接口都是本地的接口，
以下都是些笔记：

bable-loader  这个包允许使用 Babel 和 webpack 转换JavaScript文件。

在您的webpack配置对象中，您需要将 babel-loader 添加到模块列表，如下所示：
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


  目录一致
  filename: 'page/index.html', // 生成的html存放路径，相对于path
  contentBase:'./dist/page',//本地服务 器所加载的页面所在的目录







 ### less

 #函数
  lighten(@color, 10%); // return a color which is 10% *lighter* than @color
  darken(@color, 10%); // return a color which is 10% *darker* than @color
  saturate(@color, 10%); // return a color 10% *more* saturated than @color
  desaturate(@color, 10%);// return a color 10% *less* saturated than @color
  fadein(@color, 10%); // return a color 10% *less* transparent than @color
  fadeout(@color, 10%); // return a color 10% *more* transparent than @color
  spin(@color, 10); // return a color with a 10 degree larger in hue than @color
  spin(@color, -10); // return a color with a 10 degree smaller hue than @color


  #函数传参
   //->LESS代码
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

      //->编译为CSS的结果
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

  #函数的arguments

     //->LESS代码
     .transition(@property:all;@duration:1s;@function:linear;@delay:0s;) {
        -webkit-transition: @arguments;
        transition: @arguments;
     }

     .box1 {
        .transition;
     }

     //->编译为CSS的结果
     .box1 {
         -webkit-transition: all 1s linear 0s;
         transition: all 1s linear 0s;
     }

  #函数返回值
      //->LESS代码
      .average(@x, @y) {
         @result: ((@x + @y) / 2);
      }

      div {
         .average(16px, 50px); //"call" the mixin
         padding: @result; //use its "return" value
      }

      //->编译为CSS的结果
      div {
          padding: 33px;
      }

 #计算
      @init: #111111;
      @transition: @init*2;
      .switchColor {
      color: @transition;
      }

 #嵌套
     a {
        color: red;
        text-decoration: none;
        &:hover {// 有 & 时解析的是同一个元素或此元素的伪类，没有 & 解析是后代元素
         color: black;
         text-decoration: underline;
        }
      }


 #继承，
     .public {//->在选择器后面加上()就可以不编译这个样式了  .public()
            width: 100px;
            height: 100px;
     }

     nav ul {
         .public;
         list-style: none;
     }

     //->编译为CSS的结果
      nav ul {
          width: 100px;
          height: 100px;
          li
      }


 #共用
     .public {
            width: 100px;
            height: 100px;
     }

     nav ul {
         &:extend(.public);
         list-style: none;
     }
    #或
         nav ul:extend(.public) {
                 list-style: none;
         }

      //->编译为CSS的结果
      .public, nav ul {
          width: 100px;
          height: 100px;
      }

      nav ul {
          list-style: none;
      }


 #私有作用域
     //->LESS代码
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
    //->LESS代码
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

       //->编译为CSS的结果
          .box .gray {
              color: #eee;
          }

          nav ul .gray {
              color:#eee !important;
          }