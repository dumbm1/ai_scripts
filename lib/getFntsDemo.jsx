/**
 * jsx for Ai. Marat Shagiev: marat_js@bk.ru. 01.02.2015
 */
function getFntsDemo(letter) {
  var lit                  = letter || 'm',
      fontsStartWithLetter = [];
  for (var i = 0; i < textFonts.length; i++) {
    if (textFonts[i].name.slice(0, 1).toLowerCase() == lit) {
      fontsStartWithLetter.push(textFonts[i]);
    }
  }
  return fontsStartWithLetter;
}
