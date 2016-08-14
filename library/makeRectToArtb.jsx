/**
 * jsx for Ai. Marat Shagiev: marat_js@bk.ru. 12.01.2015
 */

var artRect = makeRectToArtb ();

function makeRectToArtb () {

  activeDocument.rulerOrigin = [ 0, activeDocument.height ];

  var artbWidth = activeDocument.width,
      artbHeight = activeDocument.height;

  return activeDocument.activeLayer.pathItems.rectangle ( 0, 0, artbWidth, artbHeight );
}
