//@target illustrator
set_time_stamp();
function set_time_stamp() {
  var txtFrameFullDateName = '__current_date_and_time__',
      txtFrameDateName     = '__current_date__',
      txtFrameDateHF       = /Дата: +\d{2}-\d{2}-\d{4} */, //Дата:  14-09-2018
      txtHFFrames          = _getTxtFrByCont(txtFrameDateHF),
      txtFullDateFrames    = _getTextFrameByName(txtFrameFullDateName),
      txtDateFrames        = _getTextFrameByName(txtFrameDateName),
      now                  = new Date(),
      strFullDate          = 'Дата:\n' + _formatDate(now) + '\nВремя:\n' + _formatTime(now),
      strDate              = 'Дата: ' + _formatDate(now);

  {
    var currFr;
    try {
      for (var i = 0; i < txtHFFrames.length; i++) {
        currFr = txtHFFrames[i];
        if (!currFr.layer.visible) continue;
        currFr.contents = strDate;
      }
    } catch (e) {
      alert('Alternate date version\n' + e);
      alert(e);
      return;
    }
    try {
      for (var i = 0; i < txtFullDateFrames.length; i++) {
        currFr = txtFullDateFrames[i];
        if (!currFr.layer.visible) continue;
        currFr.contents = strFullDate;
      }
    } catch (e) {
      alert('Full date version\n' + e);
      return;
    }
    try {
      for (var j = 0; j < txtDateFrames.length; j++) {
        currFr = txtDateFrames[j];
        if (!currFr.layer.visible) continue;
        currFr.contents = strDate;
      }
    } catch (e) {
      alert('Short date version\n' + e);
      return;
    }
  }

  function _getTxtFrByCont(re) {
    var res = [];
    for (var i = 0; i < activeDocument.textFrames.length; i++) {
      var currFrame = activeDocument.textFrames[i];
      if (!currFrame.contents.match(re)) continue;
      //if (!currFrame.layer.visible) continue;
      res.push(currFrame);
    }
    return res;
  }

  function _getTextFrameByName(name) {
    var res = [];
    for (var i = 0; i < activeDocument.textFrames.length; i++) {
      var currFrame = activeDocument.textFrames[i];
      if (currFrame.name != name) continue;
      //if (!currFrame.layer.visible) continue;
      res.push(currFrame);
    }
    return res;
  }

  function _getSelFrame() {
    var selFrame = false;
    if (!selection.length) return;
    if (selection.typename == 'TextRange') return;
    if (!selection[0]) return;

    for (var i = 0; i < selection.length; i++) {
      if (selection[i].typename != 'TextFrame') continue;
      selFrame = selection[i];
      break;
    }
    return selFrame;
  }

  function _formatTime(date) {

    var hh = date.getHours();
    if (hh < 10) hh = '0' + hh;

    var mn = date.getMinutes();
    if (mn < 10) mn = '0' + mn;

    return hh + ':' + mn;
  }

  function _formatDate(date) {

    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.' + yy;
  }
}
