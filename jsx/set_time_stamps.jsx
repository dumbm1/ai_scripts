//@target illustrator
/**
 * 31.01.2021
 * Search all visible frames with name '__current_date_and_time__'
 * replace date in format dd.mm.yy[yy], dd-dd-yy[yy] to current date
 * replace time in format hh:mm to current time
 * 27.12.2021
 * 1. get selection > get text frames from selection > confirm to replace contents of frames to current date
 * 2. if no selection or no confirm  try to get time stamps by name and replace contents to current date
 * todo: if no time stamps and no selection, confirm to make time stamp in active layer
 *
 * */
set_time_stamps();

function set_time_stamps() {
  var timeStampName   = '__current_date_and_time__',
      timeStampFrames = _getTextFramesByName(timeStampName),
      selFrames       = _getSelFrames(),
      now             = new Date(),
      reData          = /(\d{2}[-.]){2}\d{2}(\d{2})?/gmi,
      reTime          = /\d{2}[:]\d{2}/gmi,
      strDate         = 'Дата: ' + _formatDate(now) + '\nВремя: ' + _formatTime(now);

  if (timeStampFrames.length) {
    for (var i = 0; i < timeStampFrames.length; i++) {
      currFr = timeStampFrames[i];
      if (!currFr.layer.visible) continue;
      currFr.contents = currFr.contents.replace(reData, _formatDate(now));
      currFr.contents = currFr.contents.replace(reTime, _formatTime(now));
    }
  }

  if (selFrames.length) {
    var confirmSetTimeStamps = +confirm("ВНИМАНИЕ!\nВЫ УВЕРЕНЫ, что хотите заменить содержимое всех выделенных текстовых блоков на текущую дату и время?");
    if (confirmSetTimeStamps) {
      for (var i = 0; i < selFrames.length; i++) {
        if (selFrames[i].name == timeStampName) continue;
        selFrames[i].name = timeStampName;
        selFrames[i].contents = strDate;
      }
      return 'step one was processed';
    }
  }

  function _getTextFramesByName(name/*@param: String, @return: Array*/) {
    var res = [];
    for (var i = 0; i < activeDocument.textFrames.length; i++) {
      var currFrame = activeDocument.textFrames[i];
      if (currFrame.name != name) continue;
      // if (!currFrame.layer.visible) continue;
      res.push(currFrame);
    }
    return res;
  }

  function _getSelFrames() {
    var frames = [];
    if (!selection.length) return;
    if (selection.typename == 'TextRange') return;
    if (!selection[0]) return;

    for (var i = 0; i < selection.length; i++) {
      if (selection[i].typename != 'TextFrame') continue;
      frames.push(selection[i]);
    }
    return frames;
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
