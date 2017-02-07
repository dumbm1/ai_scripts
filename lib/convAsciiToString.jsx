/**
 * Adobe ExtendScript for Illustrator
 * (c)Marat Shagiev
 * m_js@bk.ru
 * 04.02.2017
 * */

//@target illustrator

function convAnsiiToString(s) {
  var res = '';
  var cod = '';
  for (var i = 0; i < s.length; i += 2) {
    cod = s.slice(i, i + 2);
    res += String.fromCharCode(parseInt(cod, 16));
  }
  return res;
}
 