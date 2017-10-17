/**
 * convert string to adobe actions-compatible hex string
 * ex strToAnsii('D:\\123 ze файл.ai') // 443a5c313233207a6520d184d0b0d0b9d0bb2e6169
 * */
function strToAnsii(str) {
  var result = '';
  for (var i = 0; i < str.length; i++) {
    var chr = File.encode(str[i]);
    chr     = chr.replace(/%/gmi, '');
    if (chr.length == 1) {
      result += chr.charCodeAt(0).toString(16);
    } else {
      result += chr.toLowerCase();
    }
  }
  return result;
}