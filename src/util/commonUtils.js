function randomString(e) {
  e = e || 32;
  var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n
}

function randomHexColor() { //随机生成十六进制颜色
  var hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
  while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
    hex = '0' + hex;
  }
  return '#' + hex; //返回‘#’开头16进制颜色
}

function formatDate(dateStr) {
    // var date = Date.parse("2021-04-27T04:37:39.526+00:00")
    var date = new Date(Date.parse(dateStr));
    var year = date.getFullYear(),
        month = date.getMonth() + 1, // months are zero indexed
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds();
        // hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
        // minuteFormatted = minute < 10 ? "0" + minute : minute,
        // morning = hour < 12 ? "am" : "pm";

    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
}

export {
  randomString, randomHexColor, formatDate
}