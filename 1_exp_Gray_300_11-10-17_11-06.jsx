//@target illustrator-19
;(function () {
  var str = '', str_compatible = '';
  try {
    if (new File(activeDocument.fullName).exists) {
      str            = ('' + activeDocument.fullName).slice(0, -3) + '.jpg';
      str_compatible = encodeStrToCompatibleAnsii(new File(str).fsName);
    } else {
      throw new Error("The file doesn't exists\nSave the file and try again");
      return;
    }
  } catch (e) {
    alert(e.message);
  }
  var actStr1 = "/version 3" + "/name [ 5" + " 5365742032" + "]" + "/isOpen 1" + "/actionCount 1" + "/action-1 {" + " /name [ 8" + " 416374696f6e2031" + " ]" + " /keyIndex 0" + " /colorIndex 0" + " /isOpen 1" + " /eventCount 1" + " /event-1 {" + " /useRulersIn1stQuadrant 0" + " /internalName (adobe_exportDocument)" + " /localizedName [ 6" + " 4578706f7274" + " ]" + " /isOpen 0" + " /isOn 1" + " /hasDialog 1" + " /showDialog 0" + " /parameterCount 7" + " /parameter-1 {" + " /key 1885434477" + " /showInPalette 0" + " /type (raw)" + " /value < 104" +
    " " +
    "06" + // quality in hex from 01 to 0a
    "000000" +
    "01" + // compression methods
    "000000" +
    "03" + // number of scans, when progressive compression: from 03 to 05
    "000000" +
    "01" + // anti-aliasing
    "0000000000" +
    "2c01" + // resolution: reverse pairs 012c is a 300 dpi in hex
    "01" + // color models 01 - RGB, 02 - CMYK, 03 - Grayscale
    "0000000000000001000000" +
    " 0000000000000000000000000000000000000000000000000000000000000000" +
    " 0000000000000000000000000000000000000000000000000000000000000000" +
    " 0000000001000000" + // color profile, when RGB or CMYK
    " >" + " /size 104" + " }" +
    " /parameter-2 {" + // jpg file name
    " /key 1851878757" + " /showInPalette -1" + " /type (ustring)" +
    " /value [ " + str_compatible.length / 2 + "" + // string length
    "               " + str_compatible +
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

  function encodeStrToCompatibleAnsii(str) {
    var result = '';
    for (var i = 0; i < str.length; i++) {
      var chr = File.encode(str[i]);
      chr     = chr.replace(/%/gmi, '');
      if (chr.length == 1) {
        result += chr.charCodeAt(0).toString(16);
      } else {
        result += chr.toLowerCase();
      }
    }
    return result;
  }
}());
