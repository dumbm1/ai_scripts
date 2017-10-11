//@target illustrator-19
;(function () {
  var str     = ('' + activeDocument.fullName).slice(0, -3) + '.jpg'; // only exists .ai
  var actStr1 = "/version 3" + "/name [ 5" + "	5365742032" + "]" + "/isOpen 1" + "/actionCount 1" + "/action-1 {" + "	/name [ 8" + "		416374696f6e2031" + "	]" + "	/keyIndex 0" + "	/colorIndex 0" + "	/isOpen 1" + "	/eventCount 1" + "	/event-1 {" + "		/useRulersIn1stQuadrant 0" + "		/internalName (adobe_exportDocument)" + "		/localizedName [ 6" + "			4578706f7274" + "		]" + "		/isOpen 0" + "		/isOn 1" + "		/hasDialog 1" + "		/showDialog 0" + "		/parameterCount 7" + "		/parameter-1 {" + "			/key 1885434477" + "			/showInPalette 0" + "			/type (raw)" + "			/value < 104" +
    "				060000000100000003000000020000000000fa00010000000000000001000000" +
    "				69006d006100670065006d006100700000006e006f0065005f00530068006f00" +
    "				6b006f006c00610064005f0033003000300067005f00300034002d0031003000" +
    "				0000000000000000" +
    "			>" + "			/size 104" + "		}" +
    "		/parameter-2 {" + // jpg file name
    "			/key 1851878757" + "			/showInPalette -1" + "			/type (ustring)" +
    "			/value [ " + new File(str).fsName.length + "" + // string length
    "               " + strToAnsii(new File(str).fsName) +
    "			]" + "		}" + "		/parameter-3 {" + "			/key 1718775156" + "			/showInPalette -1" + "			/type (ustring)" + "			/value [ 16" + "				4a5045472066696c6520666f726d6174" + "			]" + "		}" + "		/parameter-4 {" + "			/key 1702392942" + "			/showInPalette -1" + "			/type (ustring)" + "			/value [ 12" + "				6a70672c6a70652c6a706567" + "			]" + "		}" +
    "		/parameter-5 {" + // use artboards
    "			/key 1936548194" + "			/showInPalette -1" + "			/type (boolean)" +
    "			/value 0" +
    "		}" +
    "		/parameter-6 {" + // all artboards
    "			/key 1935764588" + "			/showInPalette -1" + "			/type (boolean)" +
    "			/value 1" +
    "		}" +
    "		/parameter-7 {" + // artboards range
    "			/key 1936875886" + "			/showInPalette -1" + "			/type (ustring)" +
    "			/value [ 1" +
    "				31" +
    "			]" + "		}" + "	}" + "}";

  runAiAction(actStr1, "Action 1", "Set 2");

  function runAiAction(aiActionString, aiActionName, aiActionSetName) {
    var f = new File('~/ScriptAction.aia');
    f.open('w');
    f.write(aiActionString);
    f.close();
    app.loadAction(f);
    f.remove();

    app.doScript(aiActionName, aiActionSetName, false); // action name, set name
    app.unloadAction(aiActionSetName, ""); // set name
  }

  function strToAnsii(str) {
    var newStr = '';
    for (var i = 0; i < str.length; i++) {
      newStr += _fixedCharCodeAt(str, i).toString(16);
    }
    return newStr;

    function _fixedCharCodeAt(str, idx) {
      var ii   = idx || 0;
      var code = str.charCodeAt(ii);
      var hi, low;
      if (0xD800 <= code && code <= 0xDBFF) {
        hi  = code;
        low = str.charCodeAt(ii + 1);
        if (isNaN(low)) {
          throw 'Старшая часть суррогатной пары без следующей младшей в fixedCharCodeAt()';
        }
        return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
      }
      if (0xDC00 <= code && code <= 0xDFFF) {
        return false;
      }
      return code;
    }
  }
}());
;(function () {
  var imgMap  = " 060000000100000003000000010000000000fa00030000000000000001000000" +
    " 69006d006100670065006d00610070000000390032005f0052004f0059004100" +
    " 4c002d004e005500540053005f004e00650077005f004c006100730074006f00" +
    " 0000000000000000";
  var str     = ('' + activeDocument.fullName).slice(0, -3) + '.jpg'; // only exists .ai
  var actStr1 = "/version 3" + "/name [ 5" + " 5365742032" + "]" + "/isOpen 1" + "/actionCount 1" + "/action-1 {" + " /name [ 8" + " 416374696f6e2031" + " ]" + " /keyIndex 0" + " /colorIndex 0" + " /isOpen 1" + " /eventCount 1" + " /event-1 {" + " /useRulersIn1stQuadrant 0" + " /internalName (adobe_exportDocument)" + " /localizedName [ 6" + " 4578706f7274" + " ]" + " /isOpen 0" + " /isOn 1" + " /hasDialog 1" + " /showDialog 0" + " /parameterCount 7" + " /parameter-1 {" + " /key 1885434477" + " /showInPalette 0" + " /type (raw)" + " /value < 104" +
    imgMap +
    " >" + " /size 104" + " }" +
    " /parameter-2 {" + // jpg file name
    " /key 1851878757" + " /showInPalette -1" + " /type (ustring)" +
    " /value [ " + new File(str).fsName.length + "" + // string length
    "               " + strToAnsii(new File(str).fsName) +
    " ]" + " }" + " /parameter-3 {" + " /key 1718775156" + " /showInPalette -1" + " /type (ustring)" + " /value [ 16" + " 4a5045472066696c6520666f726d6174" + " ]" + " }" + " /parameter-4 {" + " /key 1702392942" + " /showInPalette -1" + " /type (ustring)" + " /value [ 12" + " 6a70672c6a70652c6a706567" + " ]" + " }" +
    " /parameter-5 {" + // use artboards
    " /key 1936548194" + " /showInPalette -1" + " /type (boolean)" +
    " /value 0" +
    " }" +
    " /parameter-6 {" + // all artboards
    " /key 1935764588" + " /showInPalette -1" + " /type (boolean)" +
    " /value 1" +
    " }" +
    " /parameter-7 {" + // artboards range
    " /key 1936875886" + " /showInPalette -1" + " /type (ustring)" +
    " /value [ 1" +
    " 31" +
    " ]" + " }" + " }" + "}";

  runAiAction(actStr1, "Action 1", "Set 2");

  function runAiAction(aiActionString, aiActionName, aiActionSetName) {
    var f = new File('~/ScriptAction.aia');
    f.open('w');
    f.write(aiActionString);
    f.close();
    app.loadAction(f);
    f.remove();

    app.doScript(aiActionName, aiActionSetName, false); // action name, set name
    app.unloadAction(aiActionSetName, ""); // set name
  }

  function strToAnsii(str) {
    var newStr = '';
    for (var i = 0; i < str.length; i++) {
      newStr += _fixedCharCodeAt(str, i).toString(16);
    }
    return newStr;

    function _fixedCharCodeAt(str, idx) {
      var ii   = idx || 0;
      var code = str.charCodeAt(ii);
      var hi, low;
      if (0xD800 <= code && code <= 0xDBFF) {
        hi  = code;
        low = str.charCodeAt(ii + 1);
        if (isNaN(low)) {
          throw 'Старшая часть суррогатной пары без следующей младшей в fixedCharCodeAt()';
        }
        return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
      }
      if (0xDC00 <= code && code <= 0xDFFF) {
        return false;
      }
      return code;
    }
  }
}());
