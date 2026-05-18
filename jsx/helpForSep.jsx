/**
 * helpForSep 0.0.1
 * Скрипт подготовки к печати сепараций
 * Предварительно необходимо выделить мышкой слои для сепараций
 * Работает только с топ-слоями
 * Работает только с 1-м артбордом
 * todo: запоминает слои и Layer.visible каждого слоя
 * копирует выделенные слои (Action)
 * находит и запоминает новые слои
 * снимает видимость со всех слоев, кроме новых
 * активирует первый артборд
 * группирует элементы в каждом новом слое
 * растрирует эти группы
 * вызывает окно принтовки ...
 * удалеяет новые слои после закрытия окна 'Print'
 * todo: восстанавливает Layer.visible каждого слоя, как было
 * */
//@target illustrator-26
main();

function main() {
 executeMenuCommand('deselectall');
 var ad = activeDocument;
 ad.artboards.setActiveArtboardIndex(0);
 var lays = ad.layers;
 var originLaysNames = _getOriginLaysNames(lays);
 var newLays;

 var actStr_cpSelLays = _mkActStr_cpSelLays();

 _mkAct(actStr_cpSelLays);

 newLays = _getNewLays(originLaysNames);

 _hideOriginLays(lays, newLays);
 _rasterizeNewLays(newLays);

 executeMenuCommand('Print');

 _rmNewLays(newLays);

 function _rmNewLays(newLays) {
  for (var i = 0; i < newLays.length; i++) {
   var lay = newLays[i];
   lay.remove();
  }
 }

 function _rasterizeNewLays(newLays) {
  for (var i = 0; i < newLays.length; i++) {
   var lay = newLays[i];
   lay.hasSelectedArtwork = true;
   executeMenuCommand('group');
   ad.rasterize(selection[0]);
  }
 }

 function _hideOriginLays(lays, newLays) {

  for (var i = 0; i < lays.length; i++) {
   var lay = lays[i];
   if (lay.name != newLays[0].name &&
    lay.name != newLays[1].name &&
    lay.name != newLays[2].name) {
    lay.visible = false;
    continue;
   }
   lay.visible = true;
  }
 }

 function _getOriginLaysNames(lays) {
  var originLaysNames = [];
  for (var i = 0; i < lays.length; i++) {
   var lay = lays[i];
   originLaysNames.push(lay.name);
  }
  return originLaysNames;
 }

 function _getNewLays(originLaysNames) {
  var newLays = [];

  for (var j = 0; j < lays.length; j++) {
   var lay = lays[j];

   for (var l = 0; l < originLaysNames.length; l++) {
    var originLayName = originLaysNames[l];
    if (lay.name == originLayName) break;
    continue;
   }
   if (l < originLaysNames.length) continue;
   newLays.push(lay);

  }
  return newLays;
 }

 function _mkAct(str) {
  var f = new File('~/ScriptAction.aia');
  f.open('w');
  f.write(str);
  f.close();
  app.loadAction(f);
  f.remove();
  app.doScript("duplSelLay", "duplSelLay", false); // action name, set name
  app.unloadAction("duplSelLay", ""); // set name
 }

 function _mkActStr_cpSelLays() {
  return '/version 3' +
   '/name [ 10' +
   '	6475706c53656c4c6179' +
   ']' +
   '/isOpen 0' +
   '/actionCount 1' +
   '/action-1 {' +
   '	/name [ 10' +
   '		6475706c53656c4c6179' +
   '	]' +
   '	/keyIndex 0' +
   '	/colorIndex 0' +
   '	/isOpen 1' +
   '	/eventCount 1' +
   '	/event-1 {' +
   '		/useRulersIn1stQuadrant 0' +
   '		/internalName (ai_plugin_Layer)' +
   '		/localizedName [ 5' +
   '			4c61796572' +
   '		]' +
   '		/isOpen 1' +
   '		/isOn 1' +
   '		/hasDialog 0' +
   '		/parameterCount 2' +
   '		/parameter-1 {' +
   '			/key 1836411236' +
   '			/showInPalette -1' +
   '			/type (integer)' +
   '			/value 1' +
   '		}' +
   '		/parameter-2 {' +
   '			/key 1851878757' +
   '			/showInPalette -1' +
   '			/type (ustring)' +
   '			/value [ 19' +
   '				4475706c69636174652053656c656374696f6e' +
   '			]' +
   '		}' +
   '	}' +
   '}';
 }

 function test1() {
  var ad = activeDocument;
  var lays = ad.layers;
  var laySepCol = lays.getByName('out color copy');
  var laySepW = lays.getByName('out w copy 2');

  ad.artboards.setActiveArtboardIndex(0);

  for (var i = 0; i < lays.length; i++) {
   var lay = lays[i];
   if (lay.name != laySepCol.name && lay.name != laySepW.name) {
    lay.visible = false;
    continue;
   }
   lay.visible = true;
  }

  var laySep = lays.add();
  laySep.name = 'laySep';

  laySepCol.move(laySep, ElementPlacement.INSIDE);
  laySepW.move(laySep, ElementPlacement.INSIDE);

  laySepCol.hasSelectedArtwork = true;
  executeMenuCommand('group');
  ad.rasterize(selection[0]);

  laySepW.hasSelectedArtwork = true;
  executeMenuCommand('group');
  ad.rasterize(selection[0]);

  executeMenuCommand('Print');

  laySep.remove();
 }
}