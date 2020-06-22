/**
 * fastRelink_v1.2.0 (19.10.2020) JavaScript for Illustrator CC+
 *
 * relink all links in current document selection to one that you select in dialog
 *
 * use:
 * 1. select raster/placed/embedded items... or all items in document
 * 2. run script
 * 3. in dialog window select new link file >> OK
 *
 * result: all selected items relink to new link file
 *
 * Contact me: Marat Shagiev, m_js@bk.ru
 *
 * todo: optimization:
 * todo: (1) add/remove action only once on start/end of the script execution
 *
 **/

fast_relink();

function fast_relink() {

  try {

    if (!documents.length) throw new Error('No document');

    if (selection.length == 0) {
      throw new Error('No selected items');
      return;
    } else if (_getPlaced().length == 0 && _getRasters().length == 0 && _getEmbedded().length == 0) {
      throw new Error('No raster/placed/embedded items in selection');
      return;
    }

    var doc = activeDocument,
        path;

    if (!(File(doc.fullName).exists)) {
      path = Folder.desktop;
    } else {
      path = doc.fullName;
    }

    var newLinkFile = File(path).openDlg();

    if (!newLinkFile) {
      throw new Error('No new file to link');
      return;
    }

    var placed  = _getPlaced(),
        rasters = _getRasters();

    executeMenuCommand('deselectall');

    _relinkAllPlaced(placed, newLinkFile);
    _relinkAllRasters(rasters, newLinkFile);

  } catch (e) {
    alert(e);
  } finally {

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
  function _getRasters() {
    var rastersArr = [];
    var rasters = activeDocument.rasterItems;
    for (var i = 0; i < rasters.length; i++) {
      if (rasters[i].selected == true) {
        rastersArr.push(rasters[i]);
      }
    }
    return rastersArr;
  }

  function _relinkAllPlaced(placed, newLinkFile) {
    for (var i = 0; i < placed.length; i++) {
      __relinkOnePlaced(placed[i], newLinkFile);
    }

    executeMenuCommand('deselectall');

    function __relinkOnePlaced(placed, newLinkFile) {
      placed.file = newLinkFile;
    }
  }
  function _relinkAllRasters(rasters, newLinkFile) {
    for (var i = rasters.length - 1; i >= 0; i--) {
      rasters[i].selected = true;
      __relinkOneRaster(newLinkFile);
      executeMenuCommand('deselectall');
    }

    function __relinkOneRaster(newLinkFile) {
      __relinkByAction(newLinkFile);
    }
  }

  function __relinkByAction(newLinkFile) {
    var actName = '__fastRelink__';
    var newLinkFileFsPath = newLinkFile.fsName + '';

    _runAction(actName, actName, _getFastRelinkActString(newLinkFileFsPath, actName));

    function _getFastRelinkActString(newLinkFileFsPath, actName) {
      var actName = __encodeStr2Ansii(actName);
      var newLinkFileFsPathEncoded = __encodeStr2Ansii(newLinkFileFsPath);
      var actRelinkString = "/version 3" +
                            "/name [ " +
                            actName.length / 2 + " " +
                            actName +
                            "]" +
                            "/isOpen 0" + // in action rater2ai == 0
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
                            "		/isOpen 0" + // in action rater2ai == 0
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
                            newLinkFileFsPathEncoded.length / 2 + " " +
                            newLinkFileFsPathEncoded +
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

    function Action(actionName, setName, actionString) {
      this.file = new File('~/JavaScriptAction.aia');
      this.loadAction = function () {
        this.file.open('w');
        this.file.write(actionString);
        this.file.close();
        loadAction(this.file);
      }
      this.runAction = function () {
        doScript(actionName, setName);
      }
      this.rmAction = function () {
        unloadAction(setName, '');
        this.file.remove();
      }
    }

  }
}
