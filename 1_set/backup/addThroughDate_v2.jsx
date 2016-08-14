/**
 * .jsx for Adobe apps. Marat Shagiev. Date: 09.11.2014
 */
activeDocument.rulerOrigin = [0, activeDocument.height]; // Set Zero point ruler on Document
+function addThroughDate() {
  var MM_TO_PT = 0.352777778;
  var lays = activeDocument.layers;
  var dateLay;
  var layVisAttr = [];
  var layLockAttr = [];
  for (var i = 0; i < lays.length; i++) {
    layVisAttr.push(lays[i].visible);
    layLockAttr.push(lays[i].locked);
    lays[i].visible = true;
    lays[i].locked = false;
    _setDateFrame(lays[i]);
  }
  for (var j = 0; j < lays.length; j++) {
    lays[j].visible = layVisAttr[j];
    lays[j].locked = layLockAttr[j];
  }

  function _setDateFrame(lay) {
    try {
      var dateGroup = lay.groupItems.getByName('Дата: дд.мм.гг, время: чч:мм');
      for (var i = 0; i < dateGroup.pageItems.length; i++) {
        dateGroup.pageItems[i].remove();
        i--;
      }
    } catch (e) {
      var dateGroup = lay.groupItems.add();
      dateGroup.name = 'Дата: дд.мм.гг, время: чч:мм';
    }

    var now = new Date();
    var str = _formatDate(now);
    var dateFrame = lay.textFrames.add();

    dateFrame.contents = str;
    frameHeight = dateFrame.height;
    frameWidth = dateFrame.width;
    frameTop = dateFrame.top;
    frameLeft = dateFrame.left;

    var dateRect = lay.pathItems.rectangle(frameTop, frameLeft - 4, frameWidth + 8, frameHeight);
    dateRect.filled = false;

    var dateRectStrokeCol = new CMYKColor();
    dateRectStrokeCol.black = 100;
    dateRect.strokeColor = dateRectStrokeCol;

    dateRect.move(dateGroup, ElementPlacement.INSIDE);
    dateFrame.move(dateGroup, ElementPlacement.INSIDE);
    dateGroup.position = [activeDocument.width - dateRect.width - 10, -10];
  }

  function _formatDate(date) {

    var dd = date.getDate()
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    var hh = date.getHours();
    if (hh < 10) hh = '0' + hh;

    var mn = date.getMinutes();
    if (mn < 10) mn = '0' + mn;

    return dd + '.' + mm + '.' + yy + '   ' + hh + ':' + mn;
  }

}();
// конес мальчишу