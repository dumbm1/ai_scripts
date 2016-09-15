/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 14.09.2016
 *
 * origin: http://www.helpful-stuff.ru/2010/10/regexpescape-javascript.html
 */

RegExp.escape = function(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}