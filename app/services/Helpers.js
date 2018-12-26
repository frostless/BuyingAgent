export function TimeGenerator(ifFullTimeRequired) {
    var date = new Date();
    var day = date.getDate();       // yields date
    var month = date.getMonth() + 1;    // yields month (add one as '.getMonth()' is zero indexed)
    var year = date.getFullYear();  // yields year
    var hour = date.getHours() > 10 ? date.getHours() : '0' + date.getHours();     // yields hours 
    var minute = date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes(); // yields minutes
    var second = date.getSeconds() > 10 ? date.getSeconds() : '0' + date.getSeconds(); // yields seconds
    if (ifFullTimeRequired) return year + "/" + month + "/" + day + "T" + hour + ':' + minute + ':' + second;
    return year + "/" + month + "/" + day;
  }