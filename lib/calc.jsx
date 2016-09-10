// проверка
var str = ('(2 + 2,5 + ,5 - ,5 + (35/10)) * 5 / 4');
alert(evalCalc(str)); // 10

/**
 * строковый калькулятор на eval(string)
 * @param {string} str - можно '+'; '-'; '*'; '/'; ','; '.'; '(' expression ')'
 * */
function evalCalc(str) {
  var newStr = str.replace(/,/gmi, "."); // заменить зпт на тчк
  return eval(newStr);
}
