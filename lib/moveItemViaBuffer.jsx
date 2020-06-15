/**
 * moveItemViaBuffer
 * move path item with opacity mask via clipboard
 * Autor: Gad (https://forum.rudtp.ru/threads/peremeschenie-obekta-s-opacity-mask.75629/page-2#post-1197831)
 *
 * @param {Number} dx - x-axis shift or delta-x
 * @param {Number} dy - y-axis shift or delta-y
 * */

function moveItemViaBuffer(dx, dy) {
  var doc = app.activeDocument;
  var vcp = doc.views[0].centerPoint;
  var gb0 = new Array();
  var gb1 = new Array();
  var gb2 = new Array();
  var gb3 = new Array();
  for (i = 0; i < doc.selection.length; i++) {
    gb0[i] = doc.selection[i].geometricBounds[0];
    gb1[i] = doc.selection[i].geometricBounds[1];
    gb2[i] = doc.selection[i].geometricBounds[2];
    gb3[i] = doc.selection[i].geometricBounds[3];
  }
  var x = (Math.min.apply(null, gb0) + Math.max.apply(null, gb2)) / 2 + dx;
  var y = (Math.min.apply(null, gb1) + Math.max.apply(null, gb3)) / 2 - dy;
  doc.views[0].centerPoint = [x, y];
  app.cut();
  app.paste();
  doc.views[0].centerPoint = vcp;
}