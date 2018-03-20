//@target illustrator
set_time_stamp();
function set_time_stamp() {
  var txtFrameDateName = '__current_date_and_time__',
      txtFrameDate,
      txtDateFrames = _getTextFrameByName (txtFrameDateName),
      now              = new Date(),
      strDate          = 'Дата:\n' + _formatDate(now) + '\nВремя:\n' + _formatTime(now);

  try {
    //txtFrameDate = activeDocument.textFrames.getByName(txtFrameDateName);
    for (var i = 0; i < txtDateFrames.length; i++) {
        var currFr = txtDateFrames[i];
        currFr.contents = strDate;
     }
    //txtFrameDate = _getTextFrameByName(txtFrameDateName);
    //txtFrameDate.contents = strDate;
  } catch (e) {
    //var txtFrameDate = _getSelFrame();
    //if (!txtFrameDate) return;
    //if (!(+confirm('Make new date frame from selected frame?'))) return;
    //txtFrameDate.contents = strDate;
    //txtFrameDate.name = txtFrameDateName;
    return;
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
