//@target illustrator-18

var replaceSymbCount = 0,
    totalSymbCount   = 0,
    runtime          = 0,
    lays             = activeDocument.layers;

for ( var l = 0; l < lays.length; l++ ) {
  if ( lays[ l ].locked || (lays[ l ].visible == false) ) {
//    alert (lays[l ].name + ' locked == ' +  lays[ l ].locked + ' and ' + ' visible == ' + (lays[ l ].visible) );
    continue;
  }
  for ( var k = 0; k < lays[ l ].textFrames.length; k++ ) {
    if ( lays[ l ].textFrames[ k ].locked || lays[ l ].textFrames[ k ].hidden ) {
      continue;
    }
    var tmpArr = superscriptSecondChar ( 'm', '2', k );
    replaceSymbCount += tmpArr[ 0 ];
    totalSymbCount += tmpArr[ 1 ];
    runtime += tmpArr[ 2 ];
  }
}

alert ( 'всего замен: ' + replaceSymbCount +
        ';\nтекстовых объектов: ' + k +
        ';\nвсего символов: ' + totalSymbCount +
        ';\nвремя выполнения: ' + totalSymbCount + ' мс' );

function superscriptSecondChar ( char1, char2, txtFrame ) {
  var date = new Date ();

  var charCount = txtFrame.textRange.characters.length;
  for ( var i = 0, j = 0; i < charCount; i++ ) {
    if ( txtFrame.textRange.characters[ i ].contents == char1 && txtFrame.textRange.characters[ i + 1 ].contents == char2 ) {
      if ( txtFrame.textRange.characters[ i + 1 ].characterAttributes.baselinePosition != FontBaselineOption.SUPERSCRIPT ) {
        txtFrame.textRange.characters[ i + 1 ].characterAttributes.baselinePosition = FontBaselineOption.SUPERSCRIPT;
        i++;
        j++;
      }
    }
  }
  return [ j, charCount, new Date () - date ];
}

superscriptOneChar ( '®', activeDocument.textFrames[ 0 ] );

function superscriptOneChar ( latter, txtFrame ) {
  var date = new Date ();

  var charCount = txtFrame.textRange.characters.length;
  for ( var i = 0, j = 0; i < charCount; i++ ) {
    if ( txtFrame.textRange.characters[ i ].contents == latter ) {
      if ( txtFrame.textRange.characters[ i ].characterAttributes.baselinePosition != FontBaselineOption.SUPERSCRIPT ) {
        txtFrame.textRange.characters[ i ].characterAttributes.baselinePosition = FontBaselineOption.SUPERSCRIPT;
        j++;
      }
    }
  }
  return [ j, charCount, new Date () - date ];
}

