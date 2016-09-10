var str = ('(2 + 2,5 + ,5 - ,5 + (35/10)) * 5 / 4');
alert ( str + ' = ' + typeof evalCalc ( str ) + ' ' + evalCalc ( str ) ); // (2 + 2,5 + ,5 - ,5 + (35/10)) * 5 / 4
                                                                          // number 10

/**
 * строковый калькулятор на eval(string)
 * @param {String} str - можно '+'; '-'; '*'; '/'; ','; '.'; '(' expression ')'
 * @return {Number} Result of evaluation
 * */
function evalCalc ( str ) {
  var newStr = str.replace ( /,/gmi, "." ); // a little tweak
  return eval ( newStr );
}
