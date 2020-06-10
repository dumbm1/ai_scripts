;(function saveAsLegacy(opts) {
  var legacyVersion = opts.legacyVersion || 'CC';
  var setName = opts.setName || 'saveAsLegacy';
  var actionName = opts.actionName || 'saveAsLegacy';

  _runAction('saveAsCC', 'saveAsCC', _makeActStr());

  function _makeActStr() {
    return "/version 3" +
           "/name [ " + __encodeStr2Ansii(actionName).length / 2 +
           "	" + __encodeStr2Ansii(actionName) +
           "]" +
           "/isOpen 1" +
           "/actionCount 1" +
           "/action-1 {" +
           "	/name [ " + __encodeStr2Ansii(setName).length / 2
    "		" + __encodeStr2Ansii(setName) +
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
    "			/value 1" +
    "		}" +
    "		/parameter-2 {" +
    "			/key 1885627936" +
    "			/showInPalette -1" +
    "			/type (boolean)" +
    "			/value 0" +
    "		}" +
    "		/parameter-3 {" +
    "			/key 1668445298" +
    "			/showInPalette -1" +
    "			/type (integer)" +
    "			/value 17" +
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
    __encodeStr2Ansii((new File((activeDocument.path + '/' + activeDocument.name + '').slice(0, -3) + "_CC.ai")).fsName + '').length / 2 + " " +
    __encodeStr2Ansii((new File((activeDocument.path + '/' + activeDocument.name + '').slice(0, -3) + "_CC.ai")).fsName + '') +
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

  function getLegacyVersionNumber(str) {
    var legacyVersionNumbers = {
      '2020': '18',
      'CC'  : '17',
      'CS6' : '16',
      'CS5' : '15',
      'CS4' : '14',
    }
    return legacyVersionNumbers[str];
  }

}());
