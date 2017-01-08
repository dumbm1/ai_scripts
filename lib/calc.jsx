/**
 * most simple calculator that based on js function eval(string)
 *
 * @param {String} str - valid characters is + - * / , . ()  numbers and js-Math-functions
 * @return {Number} Result of evaluation
 * */
function evalCalc ( str ) {
  var newStr = str.replace ( /,/gmi, "." );
  return eval ( newStr );
}
