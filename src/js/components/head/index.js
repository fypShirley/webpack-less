// 加载模板
var html = require('./tmpl/head.html');

import './img/title24px.png'
/* eslint-disable no-undef */
module.exports = function () {
  var $dialog = $(html).clone();
  $('#head').append($dialog);
}
