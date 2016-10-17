/**
 * jsx for Ai. Marat Shagiev: marat_js@bk.ru. 19.01.2015
 */

// todo: добавить прослушивание событий клавиатуры: с нажатым ctrl ноль выставлять в центр страницы
setZero ();
function setZero () {
  if ( documents.length == 0 ) return;

  activeDocument.rulerOrigin = [ 0, activeDocument.height ]; // Set Zero point ruler on Document

  if ( selection.length != 0 ) {
    var left = selection[ 0 ].left,
        top = -selection[ 0 ].top;

    activeDocument.artboards[ activeDocument.artboards.getActiveArtboardIndex () ].rulerOrigin = [ left, top ];
    return;
  }
  activeDocument.artboards[ activeDocument.artboards.getActiveArtboardIndex () ].rulerOrigin = [ 0, 0 ];
}
