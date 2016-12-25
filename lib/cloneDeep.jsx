/**
 * Adobe ExtendScript for Illustrator CS4+
 * (c)Marat Shagiev
 * m_js@bk.ru
 * 10.12.2016
 * */

//@target illustrator

/**
 * Deep clone of array
 * */
Array.prototype.cloneDeep = function() {
  return _cloneDeep(this);
  function _cloneDeep(obj) {
    if (typeof obj == 'object') {
      var r;
      if (isArray(obj)) {
        var l = obj.length;
        r     = new Array(l);
        for (var i = 0; i < l; i++) {
          r[i] = _cloneDeep(obj[i]);
        }
        return r;
      } else {
        r           = {};
        r.prototype = obj.prototype;
        for (var k in obj) {
          r[k] = _cloneDeep(obj[k]);
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
