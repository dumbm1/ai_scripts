/**
 * Adobe ExtendScript for Illustrator CS6+
 * (c)Marat Shagiev
 * m_js@bk.ru
 * 19.12.2016
 * */

//@target illustrator

/**
 * cut items, do something, get items back
 * main algorithm:
 * * cut() items layer by layer to another temporary document
 * * do something in cleaned document (in this case that is delete swatchGroups)
 * * back items to original document with executeMenuCommand('pastInPlace')
 * */
function cutDoFuncAndBack() {
  _deselect();
  _hidelays();

  var d         = activeDocument;
  var dLays     = d.layers;
  var dTmpLays;
  var dColSpace = d.documentColorSpace;
  var dTmp      = documents.add(dColSpace);
  var dLay, dTmpLay;

  d.activate();

  for (var i = dLays.length - 1; i >= 0; i--) {
    dTmpLay                    = dLays[i];
    dTmpLay.visible            = true;
    dTmpLay.hasSelectedArtwork = true;
    cut();
    dTmpLay.visible = false;
    dTmp.activate();
    executeMenuCommand('pasteInPlace');
    _deselect();
    if (i >= 1) {
      dTmp.layers.add();
      d.activate();
    }
  }

  dTmpLays = dTmp.layers;
  _deselect();
  _hidelays();

  /**
   * The action with the cleaned document.
   * In this case it's a delete all swatch groups;
   * Excluding the first main swatch group.
   * */
  for (var k = d.swatchGroups.length - 1; k > 0; k--) {
    var swGr = d.swatchGroups[k];
    swGr.remove();
  }

  for (var j = dTmpLays.length - 1; j >= 0; j--) {
    dTmpLay                    = dTmpLays[j];
    dLay                       = dLays[j];
    dTmpLay.visible            = true;
    dTmpLay.hasSelectedArtwork = true;
    cut();
    dTmpLay.visible = false;
    d.activate();
    dLay.visible  = true;
    d.activeLayer = dLay;

    executeMenuCommand('pasteInPlace');
    _deselect();
    dLay.visible = false;

    if (j >= 1) {
      dTmp.activate();
    }
  }

  dTmp.close(SaveOptions.DONOTSAVECHANGES);
  _showlays(d);

  function _showlays(d) {
    for (var i = 0; i < d.layers.length; i++) {
      var lay     = d.layers[i];
      lay.visible = true;
    }
  }

  function _deselect() {
    for (var i = 0; i < activeDocument.layers.length; i++) {
      var lay                = activeDocument.layers[i];
      lay.hasSelectedArtwork = false;
    }
  }

  function _hidelays() {
    for (var i = 0; i < activeDocument.layers.length; i++) {
      var lay     = activeDocument.layers[i];
      lay.visible = false;
    }
  }
}
 