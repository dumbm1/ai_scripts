/**
 * ai.jsx ©MaratShagiev m_js@bk.ru 04.03.2016 14:22
 * random integer from min to max
 */

(function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}())

(function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}())