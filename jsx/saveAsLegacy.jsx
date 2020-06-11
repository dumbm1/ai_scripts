/**
 * saveAsLegasy
 * Illustrator CC+ (CS6???)
 *
 * use the loadAction
 * downgrade the version of an Illustrator file to CC-CS4
 * saveAs the document to the same folder
 * add to the file name suffix of version
 *
 * in this version used compression parameter
 * other parameters are switched off
 *
 * todo: error handling
 * todo: check parameters value with the error handling
 * todo: add parameter isSaveEachArtboardToASeparateFile
 * todo: split action string to the blocks
 * todo: add extension panel vue-js interface
 * */

try {
  saveAsLegacy();
} catch (e) {
  alert(e);
}

function saveAsLegacy(opts) {

  if (!documents.length) throw new Error('No open documents');
  if (!new File(activeDocument.fullName).exists) throw new Error('File does not exists');

  var opts = opts || {};
  var legacyVersion = opts.legacyVersion || prompt("Type version: CC, CS6, CS5, CS4 (empty Errors!)", 'CC');

  if (!legacyVersion) throw new Error('User is abort process');

  var setName = opts.actionSetName || '__saveAsLegacy__';
  var actionName = opts.actionName || '__saveAsLegacy__';

  var isCreatePdfCompatible = opts.isCreatePdfCompatible || '0', // parameter-2
      isIncludeLinkedFiles  = opts.isIncludeLinkedFiles || '0', // parameter-5
      isEmbedICCProfiles    = opts.isEmbedICCProfiles || '0', // parameter-7
      isUseCompression      = opts.isUseCompression || '1'; // parameter-1

  /*** parameter-8 ***
   * if === 1, then structure of the action is changes:
   * "parameterCount" becomes equal to "13"
   * parameters 9, 10, 11 shifted and became 11, 12, 13
   * new parameters 9, 10:
   * parameter-9 - all artboards (boolean)
   * parameter-10 - range of artboards (userstring)
   * */
  var isSaveEachArtboardToASeparateFile;

  _runAction(actionName, setName, _getSeveAsLegasyActString());

  function _getSeveAsLegasyActString() {

    return "" +
           "/version 3" +
           "/name [ " +
           __encodeStr2Ansii(setName).length / 2 + " " +
           __encodeStr2Ansii(setName) +
           "]" +
           "/isOpen 1" +
           "/actionCount 1" +
           "/action-1 {" +
           "	/name [ " +
           __encodeStr2Ansii(actionName).length / 2 + " " +
           __encodeStr2Ansii(actionName) +
           "	]" +
           "	/keyIndex 0" +
           "	/colorIndex 0" +
           "	/isOpen 1" +
           "	/eventCount 1" +
           "	/event-1 {" +
           "		/useRulersIn1stQuadrant 0" +
           "		/internalName (adobe_saveDocumentAs)" +
           "		/localizedName [ 7" +
           "			53617665204173" +
           "		]" +
           "		/isOpen 1" +
           "		/isOn 1" +
           "		/hasDialog 1" +
           "		/showDialog 0" +
           "		/parameterCount 11" +
           "		/parameter-1 {" +
           "			/key 1668116594" +
           "			/showInPalette -1" +
           "			/type (boolean)" +
           "			/value " + isUseCompression +
           "		}" +
           "		/parameter-2 {" +
           "			/key 1885627936" +
           "			/showInPalette -1" +
           "			/type (boolean)" +
           "			/value " + isCreatePdfCompatible +
           "		}" +
           "		/parameter-3 {" +
           "			/key 1668445298" +
           "			/showInPalette -1" +
           "			/type (integer)" +
           "			/value " + __getLegacyVersionNumber(legacyVersion) +
           "		}" +
           "		/parameter-4 {" +
           "			/key 1702392878" +
           "			/showInPalette -1" +
           "			/type (integer)" +
           "			/value 1" +
           "		}" +
           "		/parameter-5 {" +
           "			/key 1768842092" +
           "			/showInPalette -1" +
           "			/type (integer)" +
           "			/value 0" +
           "		}" +
           "		/parameter-6 {" +
           "			/key 1918989423" +
           "			/showInPalette -1" +
           "			/type (real)" +
           "			/value 100.0" +
           "		}" +
           "		/parameter-7 {" +
           "			/key 1886545516" +
           "			/showInPalette -1" +
           "			/type (integer)" +
           "			/value 0" +
           "		}" +
           "		/parameter-8 {" +
           "			/key 1936548194" +
           "			/showInPalette -1" +
           "			/type (boolean)" +
           "			/value 0" +
           "		}" +
           "		/parameter-9 {" +
           "			/key 1851878757" +
           "			/showInPalette -1" +
           "			/type (ustring)" +
           "			/value [ " +
           __encodeStr2Ansii((new File((activeDocument.path + '/' + activeDocument.name + '').slice(0, -3) + "_" + legacyVersion + ".ai")).fsName + '').length / 2 + " " +
           __encodeStr2Ansii((new File((activeDocument.path + '/' + activeDocument.name + '').slice(0, -3) + "_" + legacyVersion + ".ai")).fsName + '') +
           "			]" +
           "		}" +
           "		/parameter-10 {" +
           "			/key 1718775156" +
           "			/showInPalette -1" +
           "			/type (ustring)" +
           "			/value [ 35" +
           "				41646f626520496c6c7573747261746f7220416e7920466f726d617420577269" +
           "				746572" +
           "			]" +
           "		}" +
           "		/parameter-11 {" +
           "			/key 1702392942" +
           "			/showInPalette -1" +
           "			/type (ustring)" +
           "			/value [ 6" +
           "				61692c616974" +
           "			]" +
           "		}" +
           "	}" +
           "}";

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
    function __getLegacyVersionNumber(str) {
      var legacyVersionNumbers = {
        '2020': '18',
        'CC'  : '17',
        'CS6' : '16',
        'CS5' : '15',
        'CS4' : '14',
      }
      return legacyVersionNumbers[str];
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
