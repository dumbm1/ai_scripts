/**
 * Adobe ExtendScript for Illustrator CS4+
 * (c)Marat Shagiev
 * m_js@bk.ru
 * 04.12.2016
 * */

//@target illustrator

getWorkAreaBnds();
/**
 * it's a trick
 * get the Illustrator's Document work area maximal bounds
 * work in multiple artboards and shifted center
 *
 * IMPOTANT precondition: DESELECT ALL
 *
 * this method used:
 * * copy-past max-size-rectangle (16383*16383 pt)
 * * the Document.view properties (zoom, centerPoint, screenMode)
 *
 * @return{Array} workAreaBnds - Illustrator's Document work area maximal bounds
 * */
function getWorkAreaBnds() {

  var sel = _deselAll();

  var WORK_AREA_SIZE  = 16383,
      d               = activeDocument,
      rect            = d.pathItems.rectangle(0, 0, WORK_AREA_SIZE, WORK_AREA_SIZE),
      workAreaBnds,
      screenModeStore = d.views[0].screenMode,
      zoomStore       = d.views[0].zoom,
      centerPntStore  = d.views[0].centerPoint;

  rect.stroked  = false;
  rect.selected = true;

  cut();
  d.views[0].screenMode = ScreenMode.FULLSCREEN;
  d.views[0].zoom       = 64;
  d.views[0].zoom       = 0.0313;
  paste();

  rect         = selection[0];
  workAreaBnds = rect.geometricBounds;
  rect.remove();

  d.views[0].zoom        = zoomStore;
  d.views[0].screenMode  = screenModeStore;
  d.views[0].centerPoint = centerPntStore;

  for (var i = 0; i < sel.length; i++) {
    var item      = sel[i];
    item.selected = true;
  }

  return workAreaBnds;

  function _deselAll() {
    var sel = selection;
    for (var i = 0; i < activeDocument.layers.length; i++) {
      activeDocument.layers[i].hasSelectedArtwork = false;
    }
    return sel;
  }
}
 