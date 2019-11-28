//@target illustrator
/**
 * remove layers by names
 * that may correct in prompt window
 * */
;(function rmTechLays(TECH_LAYS) {
  var lays = activeDocument.layers;
  var techLays = TECH_LAYS ||
                 prompt(
                   'Technical Layers list: ', 'LAYOUT, W, COMMON, @_TT, COLORS, KLAPAN'
                 ).replace(
                   /^ +/, ''
                 ).replace(
                   / +$/, ''
                 ).split(
                   /( ?)*,( ?)*/
                 );

  for (var i = lays.length - 1; i >= 0; i--) {

    for (var j = 0; j < techLays.length; j++) {

      if (lays[i].name != techLays[j]) continue;
      lays[i].visible = true;
      lays[i].remove();
      break;

    }
  }
}(/*['LAYOUT', 'W', 'COMMON', '@_TT', 'COLORS, KLAPAN']*/));
