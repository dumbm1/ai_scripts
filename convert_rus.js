var str = 'D:\\file.jpg';
var str_rus = "D:\\файл.jpg";
strToAnsii (str_rus); //   443a5c44443043943b2e6a7067
File.encode(str_rus).replace(/%/gmi, '').toLowerCase(); // d:5cd184d0b0d0b9d0bb.jpg
//strToAnsii (str); // 443ac696c652e6a7067
// write result 443a5c      d184d0b0d0b9d0bb        2e6a7067

function strToAnsii(str) {
  var newStr = '';
  for (var i = 0; i < str.length; i++) {
    newStr += _fixedCharCodeAt(str, i).toString(16);
  }
  return newStr;

  function _fixedCharCodeAt(str, idx) {
    var ii   = idx || 0;
    var code = str.charCodeAt(ii);
    var hi, low;
    if (0xD800 <= code && code <= 0xDBFF) {
      hi  = code;
      low = str.charCodeAt(ii + 1);
      if (isNaN(low)) {
        throw 'Старшая часть суррогатной пары без следующей младшей в fixedCharCodeAt()';
      }
      return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
    }
    if (0xDC00 <= code && code <= 0xDFFF) {
      return false;
    }
    return code;
  }
}
 