/**
 * все выделенные линки и/или внедренный растр переликовываются на один указанный файл
 * * для перелинковки используется свойство  PlacedItem.file
 * * внедренный растр заменяется на линк с помощью action
 *
 * перелинковка не всегда срабатывает корректно,
 * возможно из-за того, что линк или внедренный растр был трансформирован
 * но информация об изменениях по каким-то причинам не сохранилась
 **/

relinkSelectedToFile();

function relinkSelectedToFile() {

 try {

  if (!documents.length) throw new Error('Нет документа');
  if (!selection[0]) throw new Error('Нет выделенных объектов'); // no selection

  var placed = _getPlaced();
  var rasters = _getRasters();

  if (!placed.length && !rasters.length) throw new Error('Среди выделенных объектов нет внедренных растров и/или линков');

  var ad = activeDocument;
  var path = ad.fullName;

  if (!(File(ad.fullName).exists)) path = Folder.desktop;

/* ???
  * ??? непонятно, как после этой строчки будет работать скрипт на маке
*/
  var newLinkFile = /windows/i.test($.os) ? File(path).openDlg() : File.openDialog();

  if (!newLinkFile) throw new Error('Нет файла для перелинковки');

  var actName = 'fast_relink_' + ((+new Date()) * Math.random() * 1e7 + new Array(6).join('0')).slice(0, 6),
   newLinkFileFsPath = newLinkFile.fsName + '',
   actionString = _getFastRelinkActString(newLinkFileFsPath, actName);

  var act = new Action(actName, actName, actionString);

  if (rasters.length) act.loadAction();

  executeMenuCommand('deselectall');

  _relinkPlaced(placed, newLinkFile);
  _relinkRasters(rasters, newLinkFile, act);

 } catch (e) {
  alert(e);
 } finally {
  act.rmAction();
 }

 /*LIB*/

 function Action(actionName, setName, actionString) {
  this.file = new File('~/JavaScriptAction.aia');
  this.loadAction = function () {
   this.file.open('w');
   this.file.write(actionString);
   this.file.close();
   loadAction(this.file);
  };
  this.runAction = function () {
   doScript(actionName, setName);
  };
  this.rmAction = function () {
   unloadAction(setName, '');
   this.file.remove();
  };
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

 function _relinkPlaced(placed, newLinkFile) {
  for (var i = 0; i < placed.length; i++) {
   placed[i].file = newLinkFile;
  }
  executeMenuCommand('deselectall');
 }

 function _relinkRasters(rasters, newLinkFile, act) {
  for (var i = rasters.length - 1; i >= 0; i--) {
   rasters[i].selected = true;
   act.runAction();
   executeMenuCommand('deselectall');
  }

 }

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
}
