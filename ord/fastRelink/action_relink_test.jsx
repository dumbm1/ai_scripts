;(function fastRelink(newLinkFile) {
  var newLinkFile = newLinkFile || (File(activeDocument.fullName).openDlg()).fsName + '';
  var actName = '__fastRelink__';

  // alert(newLinkFile);

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

}());
