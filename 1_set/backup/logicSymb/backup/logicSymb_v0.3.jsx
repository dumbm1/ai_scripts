/**
 * jsx for Ai. Marat Shagiev: marat_js@bk.ru. 01.02.2015
 */
//@target illustrator
//@targetengine "session"

(function () {
  var logicFonts = getLogicFonts ();

  var symb = {
    ident:      '↔', ident2: '≡', mult: '∧', mult2: '⋅', sum: '∨', implic: '→',
    inv:        '¬', xor: '⊕', pirsArrow: '↓',
    getSymbArr: function () {
      var keys = [];
      for ( var key in this ) {
        if ( typeof this[ key ] == 'function' ) continue;
        keys.push ( key );
      }
      return keys;
    }
  }

  var p = new Window ( 'palette', 'Insert Logic Symbol Palette v0.3' ),
      gr = p.add ( 'group' ),
      btnGr = gr.add ( 'group' ),
      btns = [],
      fontLGr = gr.add ( 'group' );

  for ( var i = 0; i < symb.getSymbArr ().length; i++ ) {
    var logicSymb = symb[ symb.getSymbArr ()[ i ] ];
    btns [ i ] = btnGr.add ( 'button', [ 0, 0, 25, 25 ], logicSymb );
  }

  (function setHendlers () {
    for ( var i = 0; i < symb.getSymbArr ().length; i++ ) {
      var logicSymb = symb[ symb.getSymbArr ()[ i ] ];
      btns[ i ].onClick = function () {
        var bt = new BridgeTalk ();
        bt.target = 'illustrator';
        bt.body = "\
    txtSel = app.activeDocument.selection;" +
        "txtSel.contents ='" + this.text + ' ' + "';\n" +
        "txtSel.select();\
        for ( var i = 0; i < txtSel.textRanges.length; i++) {\
        txtSel.deSelect();\
        txtSel.characters[1].select();\
        illustrator.reveal(new File(activeDocument.fullName))\
        txtSel.textRanges[ i ].characterAttributes.textFont =\
         textFonts.getByName ('" + logicFonts[2].name + "' );\
      }"
        bt.send ();
      }
    }
  }) ();

  p.location = [ 100, 150 ];
  p.show ();

  function getLogicFonts () {
    var fontNames = [
          'ArialUnicodeMS', 'Cambria', 'CambriaMath', 'LucidaSansUnicode',
          'DejaVuSans', 'DejaVuSansMono', 'DejaVuSerif', 'SegoeUISymbol', 'MeiryoUI' ],
        fonts = [];

// записать шрифты с поддержкой всех символов логических операций в массив
    for ( var i = 0; i < fontNames.length; i++ ) {
      try {
        fonts.push ( textFonts.getByName ( fontNames[ i ] ) );
      } catch ( e ) {
      }
    }
    return fonts;
  }

}) ();
