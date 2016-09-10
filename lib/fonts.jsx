/**
 * jsx for Ai. Marat Shagiev: marat_js@bk.ru. 01.02.2015
 */

//@include scrollAlert.jsx

var letter           = 'm',
fontsStartWithLetter = [];

for ( var i = 0; i < textFonts.length; i++ ) {
  if ( textFonts[ i ].name.slice ( 0, 1 ).toLowerCase () == letter ) {
    fontsStartWithLetter.push ( textFonts[ i ] );
  }
}

scroll_alert(fontsStartWithLetter);
