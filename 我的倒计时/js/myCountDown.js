//倒计时
(function (win, dow) {
  var MyCountDown = function (obj) {
    this.time = obj.time;
    this.d = obj.day;
    this.h = obj.hours;
    this.m = obj.minutes;
    this.s = obj.seconds;

    if(navigator.userAgent.indexOf("compatible") > -1 && navigator.userAgent.indexOf("MSIE") > -1){
      //IE 不支持new Date() 带参数调用；
      if(typeof(this.time) == "number"){
        this.time_end = this.time;
      }else if(typeof(this.time)=="string"){
        this.time_end = this.myDate(this.time).getTime();
      }
    }else{
      this.time_end = parseInt(new Date(this.time).getTime());
    }
    this.time_n = parseInt(new Date().getTime());
    this.count = this.time_end - this.time_n;
    this.init();
  };
  MyCountDown.prototype = {
    init:function () {
      this.countDown(this.count);
    },
    myDate:function (t) {//IE 不支持new Date() 带参数调用；
      var arr = t.split(' ');
      var days = arr[0].split('-');
      var mi = arr[1].split(':');
      var date = new Date();
      //给date赋值  年月日
      date.setUTCFullYear(days[0], days[1] - 1, days[2]);
      //给date赋值 时分秒  首先转换utc时区 ：+8
      date.setUTCHours(mi[0] - 8, mi[1], mi[2]);
      return date;
    },
    countDown:function (count) {
      var timer = setInterval(function () {
        var days = parseInt(count/(1000 * 60 * 60 *24));
        var hours = parseInt((count % (1000 * 60 * 60 *24))/(1000 * 60 * 60));
        var minutes = parseInt((count % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = parseInt((count % (1000 * 60)) / 1000);
        count = (parseInt(count/1000) - 1)*1000;
        if(days < 10){
          days = '0'+days;
        }
        if(hours < 10){
          hours = '0'+hours;
        }
        if(minutes < 10){
          minutes = '0'+minutes
        }
        if(seconds < 10){
          seconds = '0'+seconds
        }

        $(this.d).text(days);
        $(this.h).text(hours);
        $(this.m).text(minutes);
        $(this.s).text(seconds);

        if(count < 1000){
          clearInterval(timer);
          $(this.d).text('00');
          $(this.h).text('00');
          $(this.m).text('00');
          $(this.s).text('00');
        }
      }.bind(this),1000);
    }
  };
  win.MyCountDown = MyCountDown;
}(window,document));