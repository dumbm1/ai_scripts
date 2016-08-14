/**
 * jsx for Ai. Marat Shagiev: marat_js@bk.ru. 01.02.2015
 */

//@target illustrator
//@targetengine "session"

(function () {
  var fontsLogicAll =
        [
          'ArialUnicodeMS', 'Cambria', 'CambriaMath', 'LucidaSansUnicode',
          'DejaVuSans', 'DejaVuSansMono', 'DejaVuSerif', 'SegoeUISymbol', 'MeiryoUI'
        ];

  var fontsLogicAvailable = getFontsAvailable ( fontsLogicAll );
  var symb = makeLogicSymbols ();
  var symbArr = [ '↔', '≡', '∧', '⋅', '∨', '→', '¬', '⊕', '↓' ]

  var p = new Window ( 'palette', 'Insert Logic Symbol Palette v0.4' ),
      gr = p.add ( 'group' ),
      btnGr = gr.add ( 'group' ),
      btns = [],
      fontListGr = gr.add ( 'group' ),
      fontList;

  p.margins = 0;
  p.spacing = 0;
  btnGr.margins = 0;
  btnGr.spacing = 0;

  (function makeButtons () {
    for ( var i = 0; i < symb.getSymbArr ().length; i++ ) {
      var logicSymb = symbArr[ i ];
      btns [ i ] = btnGr.add ( 'button', [ 0, 0, 25, 25 ], logicSymb );
    }

  }) ();

  (function makeFontList () {
    fontList = fontListGr.add ( 'dropdownlist', undefined, fontsLogicAvailable );
    fontList.selection = 0;

    fontList.onChange = function () {
      var bt = new BridgeTalk ();
      bt.target = 'illustrator';
      bt.body = "\
      currSel = app.activeDocument.selection;\
      for (var j = 0; j < currSel.textRanges.length; j++) {\
       if ( (currSel.contents).charCodeAt(0) ){\
         currSel.characterAttributes.textFont =\
         textFonts.getByName ( '" + fontList.selection.text + "' );\
      }else {\
         currSel.textRanges[j].characterAttributes.textFont =\
         textFonts.getByName ( '" + fontList.selection.text + "' );\
      }}\
      illustrator.reveal(new File(activeDocument.fullName));"
      bt.send ();
    }

  }) ();

  (function setHendlersToButtons () {
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
         textFonts.getByName ( '" + fontList.selection.text + "' );\
        }"
        bt.send ();
      }
    }
  }) ();

  p.location = [ 100, 150 ];
  p.show ();

  function getFontsAvailable ( fontNamesArray ) {
    var fonts = [];

// записать шрифты с поддержкой всех символов логических операций в массив
    for ( var i = 0; i < fontNamesArray.length; i++ ) {
      try {
        fonts.push ( (textFonts.getByName ( fontNamesArray[ i ] ).name) );
      } catch ( e ) {
      }
    }
    return fonts;
  }

  function makeLogicSymbols () {
    var s = {
      ident:     '↔',
      ident2:    '≡',
      mult:      '∧',
      mult2:     '⋅',
      sum:       '∨',
      implic:    '→',
      inv:       '¬',
      xor:       '⊕',
      pirsArrow: '↓',

      getSymbArr: function () {
        var keys = [];
        for ( var key in this ) {
          if ( typeof this[ key ] == 'function' ) continue;
          keys.push ( key );
        }
        return keys;
      }
    }
    return s;
  }

}) ();
