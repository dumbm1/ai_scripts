//@target illustrator
/**
 * 31.01.2021
 * Search all visible frames with name '__current_date_and_time__'
 * replace date in format dd.mm.yy[yy], dd-dd-yy[yy] to current date
 * replace time in format hh:mm to current time
 * */
setDateTime();

function setDateTime() {
  var timeStampName   = '__current_date_and_time__',
      timeStampFrames = _getTextFrameByName(timeStampName),
      now             = new Date(),
      reData          = /(\d{2}[-.]){2}\d{2}(\d{2})?/gmi,
      reTime          = /\d{2}[:]\d{2}/gmi;

  {
    var currFr;
    try {
      for (var i = 0; i < timeStampFrames.length; i++) {
        currFr = timeStampFrames[i];
        if (!currFr.layer.visible) continue;
        currFr.contents = currFr.contents.replace(reData, _formatDate(now));
        currFr.contents = currFr.contents.replace(reTime, _formatTime(now));
      }
    } catch (e) {
      alert(e.line + '\n' + e.message);
      return;
    }
  }

  function _getTextFrameByName(name/*@param: String, @return: Array*/) {
    var res = [];
    for (var i = 0; i < activeDocument.textFrames.length; i++) {
      var currFrame = activeDocument.textFrames[i];
      if (currFrame.name != name) continue;
      //if (!currFrame.layer.visible) continue;
      res.push(currFrame);
    }
    return res;
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

    var yyyy = date.getFullYear() /*% 100*/;
    // if (yy < 10) yy = yyyy;

    return dd + '.' + mm + '.' + yyyy;
  }
}
