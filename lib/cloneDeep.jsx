/**
 * Adobe ExtendScript for Illustrator CS4+
 * (c)Marat Shagiev
 * m_js@bk.ru
 * 10.12.2016
 * */

//@target illustrator

Array.prototype.clone = function() {

  return cloneDeep(this);

  function cloneDeep(obj) {
    if (typeof obj == 'object') {
      if (isArray(obj)) {
        var l = obj.length;
        var r = new Array(l);
        for (var i = 0; i < l; i++) {
          r[i] = cloneDeep(obj[i]);
        }
        return r;
      } else {
        var r       = {};
        r.prototype = obj.prototype;
        for (var k in obj) {
          r[k] = cloneDeep(obj[k]);
        }
        return r;
      }
    }
    return obj;

    function isArray(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    }
  }
}
