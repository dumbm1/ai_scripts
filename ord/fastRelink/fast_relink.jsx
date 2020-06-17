/**
 * fastRelink_v1.1.0
 * Illustrator CC+
 *
 * relink all links in current document selection to one that you select in dialog
 *
 * use:
 * select raster/placed/embedded items
 * run script
 * in dialog window select new link file (and push OK)
 *
 * result: all selected items relink on new link file
 *
 * Marat Shagiev m_js@bk.ru 17.10.2020
 *
 **/

fast_relink();

function fast_relink() {

  try {

    var newLinkFile = (File(activeDocument.fullName).openDlg()).fsName + '';

    /*    if (selection.length == 0) {
     throw new Error('No selected items');
     return;
     } else if (_getPlaced().length == 0 && _getRasters().length == 0 && _getEmbedded().length == 0) {
     throw new Error('No raster/placed/embedded items in selection');
     return;
     }

     var doc = activeDocument;
     var path; // base folder that open in File(path).openDlg()

     if (!(File(doc.fullName).exists)) {
     path = Folder.desktop;
     } else {
     path = doc.fullName;
     }

     var newLinkFile = File(path).openDlg(); // The folder where containing the active document will open

     if (!newLinkFile) {
     throw new Error('No new file to link');
     return;
     }*/

    var embedded = _getEmbedded();
    // var placed = _getPlaced();
    // var rasters = _getRasters();

    executeMenuCommand('deselectall');

    // _relinkAllPlaced(placed, newLinkFile);
    // _relinkAllRasters(rasters, newLinkFile);
    _relinkAllEmbedded(embedded, newLinkFile);

  } catch (e) {
    alert(e);
  }

  function _getRasters() {
    var rastersArr = [];
    var rasters = activeDocument.rasterItems;
    for (var i = 0; i < rasters.length; i++) {
      if (rasters[i].selected == true) {
        try {
          rasters[i].file ? '' : '';
        } catch (e) {
          rastersArr.push(rasters[i]);
        }
      }
    }
    return rastersArr;
  }
  function _relinkAllRasters(rasters, linkFile) {
    for (var i = 0; i < rasters.length; i++) {
      __relinkOneRaster(rasters[i], linkFile);
    }

    function __relinkOneRaster(raster, linkFile) {
      var linkItem = raster.layer.placedItems.add();
      linkItem.file = linkFile;
      linkItem.height = raster.height;
      linkItem.width = raster.width;
      linkItem.position = raster.position;
      ___moveAfter(linkItem, raster);
      raster.remove();
      return linkItem;
    }
  }

  function _getPlaced() {
    var placedArr = [];
    var placed = activeDocument.placedItems;

    for (var i = 0; i < placed.length; i++) {
      if (placed[i].selected == true) {
        placedArr.push(placed[i]);
      }
    }
    return placedArr;
  }
  function _relinkAllPlaced(placed, linkFile) {
    for (var i = 0; i < placed.length; i++) {
      __relinkOnePlaced(placed[i], linkFile);
    }

    function __relinkOnePlaced(placed, linkFile) {
      placed.file = linkFile;
      return placed;
    }
  }

  function _getEmbedded() {
    var embeddedArr = [];
    var rasters = activeDocument.rasterItems;
    for (var i = 0; i < rasters.length; i++) {
      if (rasters[i].selected == true) {
        try {
          rasters[i].file ? embeddedArr.push(rasters[i]) : '';
        } catch (e) {
        }
      }
    }
    return embeddedArr;
  }
  function _relinkAllEmbedded(embedded, newLinkFile) {
    for (var i = embedded.length - 1; i >= 0; i--) {
      embedded[i].selected = true;
      __relinkOneEmbedded(newLinkFile);
      executeMenuCommand('deselectall');
    }

    function __relinkOneEmbedded(newLinkFile) {
      __relinkByAction(newLinkFile);
    }
  }

  /**
   * move item after target
   * @param {Object} item
   * @param {Object} target
   * */
  function ___moveAfter(item, target) {
    try {
      if (target && item) {
        item.move(target, ElementPlacement.PLACEAFTER);
      }
    } catch (e) {
    }
  }

  function __relinkByAction(newLinkFile) {
    var actName = '__fastRelink__';

    _runAction(actName, actName, _getFastRelinkActString(newLinkFile, actName));

    function _getFastRelinkActString(newLinkFile, actName) {
      var actName = __encodeStr2Ansii(actName);
      var newLinkFile = __encodeStr2Ansii(newLinkFile);
      var actRelinkString = "/version 3" +
                            "/name [ " +
                            actName.length / 2 + " " +
                            actName +
                            "]" +
                            "/isOpen 1" +
                            "/actionCount 1" +
                            "/action-1 {" +
                            "	/name [ " +
                            actName.length / 2 + " " +
                            actName +
                            "	]" +
                            "	/keyIndex 0" +
                            "	/colorIndex 0" +
                            "	/isOpen 1" +
                            "	/eventCount 1" +
                            "	/event-1 {" +
                            "		/useRulersIn1stQuadrant 0" +
                            "		/internalName (adobe_placeDocument)" +
                            "		/localizedName [ 5" +
                            "			506c616365" +
                            "		]" +
                            "		/isOpen 1" +
                            "		/isOn 1" +
                            "		/hasDialog 1" +
                            "		/showDialog 0" +
                            "		/parameterCount 12" +
                            "		/parameter-1 {" +
                            "			/key 1885431653" +
                            "			/showInPalette -1" +
                            "			/type (integer)" +
                            "			/value 1" +
                            "		}" +
                            "		/parameter-2 {" +
                            "			/key 1668444016" +
                            "			/showInPalette -1" +
                            "			/type (enumerated)" +
                            "			/name [ 7" +
                            "				43726f7020546f" +
                            "			]" +
                            "			/value 1" +
                            "		}" +
                            "		/parameter-3 {" +
                            "			/key 1885823860" +
                            "			/showInPalette -1" +
                            "			/type (integer)" +
                            "			/value 1" +
                            "		}" +
                            "		/parameter-4 {" +
                            "			/key 1851878757" +
                            "			/showInPalette -1" +
                            "			/type (ustring)" +
                            "			/value [ " +
                            newLinkFile.length / 2 + " " +
                            newLinkFile +
                            "			]" +
                            "		}" +
                            "		/parameter-5 {" +
                            "			/key 1818848875" +
                            "			/showInPalette -1" +
                            "			/type (boolean)" +
                            "			/value 1" +
                            "		}" +
                            "		/parameter-6 {" +
                            "			/key 1919970403" +
                            "			/showInPalette -1" +
                            "			/type (boolean)" +
                            "			/value 1" +
                            "		}" +
                            "		/parameter-7 {" +
                            "			/key 1953329260" +
                            "			/showInPalette -1" +
                            "			/type (boolean)" +
                            "			/value 0" +
                            "		}" +
                            "		/parameter-8 {" +
                            "			/key 1768779887" +
                            "			/showInPalette -1" +
                            "			/type (boolean)" +
                            "			/value 0" +
                            "		}" +
                            "		/parameter-9 {" +
                            "			/key 1885828462" +
                            "			/showInPalette -1" +
                            "			/type (boolean)" +
                            "			/value 0" +
                            "		}" +
                            "		/parameter-10 {" +
                            "			/key 1935895653" +
                            "			/showInPalette -1" +
                            "			/type (real)" +
                            "			/value 1.0" +
                            "		}" +
                            "		/parameter-11 {" +
                            "			/key 1953656440" +
                            "			/showInPalette -1" +
                            "			/type (real)" +
                            "			/value 0.0" +
                            "		}" +
                            "		/parameter-12 {" +
                            "			/key 1953656441" +
                            "			/showInPalette -1" +
                            "			/type (real)" +
                            "			/value 0.0" +
                            "		}" +
                            "	}" +
                            "}";

      return actRelinkString;

      function __encodeStr2Ansii(str) {
        var result = '';
        for (var i = 0; i < str.length; i++) {
          var chr = File.encode(str[i]);
          chr = chr.replace(/%/gmi, '');
          if (chr.length == 1) {
            result += chr.charCodeAt(0).toString(16);
          } else {
            result += chr.toLowerCase();
          }
        }
        return result;
      }
    }

    function _runAction(actionName, setName, actionString) {
      var file = new File('~/JavaScriptAction.aia');
      file.open('w');
      file.write(actionString);
      file.close();
      loadAction(file);
      doScript(actionName, setName);
      unloadAction(setName, '');
      file.remove();
    }

  }
}

