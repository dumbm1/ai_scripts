function _getSeveAsLegasyActString() {

  return "" +
         "/version 3" +
         "/name [ " +
         __encodeStr2Ansii(SET_NAME).length / 2 + " " +
         __encodeStr2Ansii(SET_NAME) +
         "]" +
         "/isOpen 1" +
         "/actionCount 1" +
         "/action-1 {" +
         "	/name [ " +
         __encodeStr2Ansii(ACTION_NAME).length / 2 + " " +
         __encodeStr2Ansii(ACTION_NAME) +
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
         "			/value " + legacyVersionNumbers[legacyVersion] +
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

}

function _getFactRelinkActString() {
  var actRelinkString = "/version 3" +
                        "/name [ 11" +
                        "	666173745f72656c696e6b" +
                        "]" +
                        "/isOpen 0" +
                        "/actionCount 1" +
                        "/action-1 {" +
                        "	/name [ 11" +
                        "		666173745f72656c696e6b" +
                        "	]" +
                        "	/keyIndex 0" +
                        "	/colorIndex 0" +
                        "	/isOpen 0" +
                        "	/eventCount 1" +
                        "	/event-1 {" +
                        "		/useRulersIn1stQuadrant 0" +
                        "		/internalName (adobe_placeDocument)" +
                        "		/localizedName [ 5" +
                        "			506c616365" +
                        "		]" +
                        "		/isOpen 0" +
                        "		/isOn 1" +
                        "		/hasDialog 1" +
                        "		/showDialog 0" +
                        "		/parameterCount 10" +
                        "		/parameter-1 {" +
                        "			/key 1885434477" +
                        "			/showInPalette 0" +
                        "			/type (raw)" +
                        "			/value < 96" +
                        "				0200000002000000000000000000000001000000000000000000000002000000" +
                        "				0100000001000000000000000000000000000000000000000000000000000000" +
                        "				000000000000f03f00000000000000000000000000000000ffffffff00000000" +
                        "			>" +
                        "			/size 96" +
                        "		}" +
                        "		/parameter-2 {" +
                        "			/key 1851878757" +
                        "			/showInPalette -1" +
                        "			/type (ustring)" +
                        "			/value [ 72" +
                        "				443a5c574f524b5c525553534b4152545c4c55434b592d4c554b5c3230475c42" +
                        "				42515c64657369676e5c43505c7261737465725c4350315f4242515f31382d30" +
                        "				352d32302e707364" +
                        "			]" +
                        "		}" +
                        "		/parameter-3 {" +
                        "			/key 1818848875" +
                        "			/showInPalette -1" +
                        "			/type (boolean)" +
                        "			/value 1" +
                        "		}" +
                        "		/parameter-4 {" +
                        "			/key 1919970403" +
                        "			/showInPalette -1" +
                        "			/type (boolean)" +
                        "			/value 1" +
                        "		}" +
                        "		/parameter-5 {" +
                        "			/key 1953329260" +
                        "			/showInPalette -1" +
                        "			/type (boolean)" +
                        "			/value 0" +
                        "		}" +
                        "		/parameter-6 {" +
                        "			/key 1768779887" +
                        "			/showInPalette -1" +
                        "			/type (boolean)" +
                        "			/value 0" +
                        "		}" +
                        "		/parameter-7 {" +
                        "			/key 1885828462" +
                        "			/showInPalette -1" +
                        "			/type (boolean)" +
                        "			/value 0" +
                        "		}" +
                        "		/parameter-8 {" +
                        "			/key 1935895653" +
                        "			/showInPalette -1" +
                        "			/type (real)" +
                        "			/value 1.0" +
                        "		}" +
                        "		/parameter-9 {" +
                        "			/key 1953656440" +
                        "			/showInPalette -1" +
                        "			/type (real)" +
                        "			/value 0.0" +
                        "		}" +
                        "		/parameter-10 {" +
                        "			/key 1953656441" +
                        "			/showInPalette -1" +
                        "			/type (real)" +
                        "			/value 0.0" +
                        "		}" +
                        "	}" +
                        "}"
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

