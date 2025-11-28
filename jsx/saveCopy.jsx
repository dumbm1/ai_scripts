//@target illustrator-19

;(function saveCopy() {
 var d = activeDocument,
  dName = d.name.slice(0, -3),
  dPath = d.path,
  rmFolder = new Folder(dPath + '/rm');

 if (!rmFolder.exists) rmFolder.create();

 var str = (dPath + '/rm/' + dName + '_copy@' + (new Date ().getTime().toString()).slice(2)),
  str_compatible = encodeStrToAnsii(new File(str).fsName);

 {
  var actStr = "" +
   "/version 3" +
   "/name [ 8" + " 536574204e616d65" + "]" + "/isOpen 1" + "/actionCount 1" + "/action-1 {" + " /name [ 11" + " 416374696f6e204e616d65" + " ]" +
   " /keyIndex 0" +
   " /colorIndex 0" +
   " /isOpen 1" +
   " /eventCount 1" +
   " /event-1 {" +
   " /useRulersIn1stQuadrant 0" +
   " /internalName (adobe_saveACopyAs)" +
   " /localizedName [ 11" +
   " 53617665204120436f7079" +
   " ]" +
   " /isOpen 0" +
   " /isOn 1" +
   " /hasDialog 1" +
   " /showDialog 0" +
   " /parameterCount 11" +
   " /parameter-1 {" +
   " /key 1668116594" +
   " /showInPalette -1" +
   " /type (boolean)" +
   " /value 1" +
   " }" +
   " /parameter-2 {" +
   " /key 1885627936" +
   " /showInPalette -1" +
   " /type (boolean)" +
   " /value 1" +
   " }" +
   " /parameter-3 {" +
   " /key 1668445298" +
   " /showInPalette -1" +
   " /type (integer)" +
   " /value 17" +
   " }" +
   " /parameter-4 {" +
   " /key 1702392878" +
   " /showInPalette -1" +
   " /type (integer)" +
   " /value 1" +
   " }" +
   " /parameter-5 {" +
   " /key 1768842092" +
   " /showInPalette -1" +
   " /type (integer)" +
   " /value 0" +
   " }" +
   " /parameter-6 {" +
   " /key 1918989423" +
   " /showInPalette -1" +
   " /type (real)" +
   " /value 100.0" +
   " }" +
   " /parameter-7 {" +
   " /key 1886545516" +
   " /showInPalette -1" +
   " /type (integer)" +
   " /value 0" +
   " }" +
   " /parameter-8 {" +
   " /key 1936548194" +
   " /showInPalette -1" +
   " /type (boolean)" +
   " /value 0" +
   " }" +
   " /parameter-9 {" +
   " /key 1851878757" +
   " /showInPalette -1" +
   " /type (ustring)" +
   " /value [ " + str_compatible.length / 2 + "" + // string length
   "               " + str_compatible +
   " ]" +
   " }" +
   " /parameter-10 {" +
   " /key 1718775156" +
   " /showInPalette -1" +
   " /type (ustring)" +
   " /value [ 35" +
   " 41646f626520496c6c7573747261746f7220416e7920466f726d617420577269" +
   " 746572" +
   " ]" +
   " }" +
   " /parameter-11 {" +
   " /key 1702392942" +
   " /showInPalette -1" +
   " /type (ustring)" +
   " /value [ 6" +
   " 61692c616974" +
   " ]" +
   " }" +
   " }" +
   "}"
 }

 runAction(actStr, "Action Name", "Set Name");

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
   chr = chr.replace(/%/gmi, '');
   if (chr.length == 1) {
    result += chr.charCodeAt(0).toString(16);
   } else {
    result += chr.toLowerCase();
   }
  }
  return result;
 }

 /**
  * random INTEGER input-number from min to max
  *
  * @param {Number} min
  * @param {Number} max
  * @return {Number) rand
  * */
 function rndInt(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
 }

}());
