//@target illustrator
/**
 * remove layers by names
 * that may correct in prompt window
 * */
;(function rmTechLays() {
 if (!confirm('Удалить все слои, кроме слоя "out"?')) return;
 var ad = activeDocument;
 var lays = ad.layers;
 for (var i = lays.length - 1; i >= 0; i--) {
  var lay = lays[i];
  if (lay.visible == false) lay.visible = true;
  if (lay.locked = true) lay.locked = false;
  if (lay.name == 'out') continue;
  lay.remove();
 }
}());
