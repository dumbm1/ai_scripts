//@target illustrator-19
;(function () {
  var str                       = ('' + activeDocument.fullName).slice(0, -3) + '.jpg',
      str_compatible            = encodeStrToAnsii(new File(str).fsName),

      useArtboards              = '1',
      allArtboards              = '0',
      artboardsRange            = '1-3',
      useArtboards_compatible   = encodeStrToAnsii(useArtboards),
      allArtboards_compatible   = encodeStrToAnsii(allArtboards),
      artboardsRange_compatible = encodeStrToAnsii(artboardsRange),

      res                       = 300,
      resCompatible             = res.toString(16).slice(1) + '0' + res.toString(16).slice(0, 1),

      quality                   = 6,
      quality_compatible        = '0' + quality.toString(16),
      compressionMethod         = '01',
      scans                     = '03',
      antiAliasing              = '02';

  try {
    if (!new File(activeDocument.fullName).exists) {
      throw new Error("The file doesn't exists\nSave the file and try again");
      return;
    }
  } catch (e) {
    alert(e.message);
  }

  var actStr1 = "/version 3" + "/name [ 8" + " 536574204e616d65" + "]" + "/isOpen 1" + "/actionCount 1" + "/action-1 {" + " /name [ 11" + " 416374696f6e204e616d65" + " ]" + " /keyIndex 0" + " /colorIndex 0" + " /isOpen 1" + " /eventCount 1" + " /event-1 {" + " /useRulersIn1stQuadrant 0" + " /internalName (adobe_exportDocument)" + " /localizedName [ 6" + " 4578706f7274" + " ]" + " /isOpen 0" + " /isOn 1" + " /hasDialog 1" + " /showDialog 0" + " /parameterCount 7" + " /parameter-1 {" + " /key 1885434477" + " /showInPalette 0" + " /type (raw)" + " /value < 104" +
    " " +
    "06" + // quality in hex from 01 to 0a
    "000000" +
    "01" + // compression methods
    "000000" +
    "03" + // number of scans, when progressive compression: from 03 to 05
    "000000" +
    "01" + // anti-aliasing
    "0000000000" +
    "3402" + // resolution: reverse pairs 012c is a 300 dpi in hex, max 564 dpi
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

  runAction(actStr1, "Action Name", "Set Name");

  function runAction(aiActionString, aiActionName, aiActionSetName) {
    var f = new File('~/ScriptAction.aia');
    f.open('w');
    f.write(aiActionString);
    f.close();
    app.loadAction(f);
    f.remove();

    app.doScript(aiActionName, aiActionSetName, false); // action name, set name
    app.unloadAction(aiActionSetName, ""); // set name
  }

  function encodeStrToAnsii(str) {
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
