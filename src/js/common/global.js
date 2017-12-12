var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?a47660f7c78f209c784de0f9a9095816";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();

/*获取地址栏字符串*/
var queryString = function queryString(id) {
  var e = {};
  try {
    var qs = document.URL.split('?')[1].split('&');
  }
  catch (ex) {
    return null;
  }
  if (!isNaN(id)) return e[qs[id].split('=')[1]];
  for (var i = 0; i < qs.length; i++) {
    e[qs[i].split('=')[0].toLowerCase()] = qs[i].split('=')[1];
  }
  if (id) {
    return e[id.toLowerCase()];
  }
  return e;
};
function numFormat(num) {
  return (Math.abs(num) < 10) ? "0" + parseInt(num) : num;
}
var format = {
  size: function (size) {
    var unit = ["B", "KB", "MB", "GB"];
    for (var i = 0; i < unit.length; i++) {
      if (size < Math.pow(1024, i + 1)) {
        return parseInt(size / Math.pow(1024, i) * 10) / 10 + unit[i];
      }
    }
  },
  count:function(count){
    var unitNumber=["","万","亿"];
    for(var i=0;i<unitNumber.length;i++){
      if(count<Math.pow(10000,i+1)){
        return parseInt(count/ Math.pow(10000, i) * 10) / 10 + unitNumber[i];
      }
    }
  },
  elapsedTime: function (time) {
    if (time >= 30 * 86400) {
      if (time < 365 * 86400) {
        return parseInt(time / 86400 / 30) + "月";
      }
      else {
        return parseInt(time / 86400 / 365) + "年";
      }
    }
    else {
      if (time >= 86400) {
        return parseInt(time / 86400) + "天";
      }
      else if (time >= 3600) {
        return parseInt(time / 3600) + "小时";
      }
      else if (time >= 60) {
        return parseInt(time / 60) + "分钟";
      }
      else {
        return "一会";
      }
    }
  },
  date: function (time) {
    var date = new Date();
    time && date.setTime(time);
    var d = date.getFullYear() + "-" + numFormat(date.getMonth() + 1) + "-" + numFormat(date.getDate());
    var t = numFormat(date.getHours()) + ":" + numFormat(date.getMinutes());
    var monthday = numFormat(date.getMonth() + 1) + '/' +  numFormat(date.getDate());
    return ({ date: d, time: t, full: d + " " + t ,monthday: monthday});
  }
};
var loading = function loading(obj){
  var loading = $('<div class="loading">');
  loading.append(
    '<div class="load-container">' +
    '<div class="loader">' +
    '<div class="left-transparent"></div>' +
    '<div class="right-transparent"></div>' +
    '</div>' +
    '<div class="clearfix"></div>' +
    '</div>'
  )
  $(obj).append(loading);
}

module.exports = {
  loading: loading,
  format: format,
  queryString: queryString
};
