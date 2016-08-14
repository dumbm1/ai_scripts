/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 02.08.2016.
 */
////@target illustrator-19
(function replaceStr () {
  if (documents.length == 0) return;
  if (activeDocument.textFrames.length == 0) return;

  var w           = new Window ('dialog', 'RegExp Replacer');
  w.alignChildren = 'left';
  w.add ('statictext', undefined, 'RegExp');
  w.fld_reg = w.add ('edittext', [0, 0, 150, 20]);
  w.add ('statictext', undefined, 'Replacer');
  w.fld_replacer = w.add ('edittext', [0, 0, 150, 20]);
  w.gr_btns      = w.add ('group');
  w.btn_ok       = w.gr_btns.add ('button', undefined, 'Ok');
  w.btn_canc     = w.gr_btns.add ('button', undefined, 'Cancel');
  w.btn_prev     = w.gr_btns.add ('button', undefined, 'Preview');

  w.btn_ok.onClick = function () {
    repl (w.fld_reg.text, w.fld_replacer.text, 'gmi');
    w.close ();
  }

  w.show ();

  function repl (regStr, replacer, gmi) {
    if (!regStr || !replacer) return;
    gmi          = gmi || '';
    var re       = new RegExp (regStr, gmi);
    var re_match = new RegExp (regStr, 'i');
    var frames   = activeDocument.textFrames;

    for (var i = 0; i < frames.length; i++) {
      var fr = frames[i];

      if (!fr.layer.visible) continue;
      if (fr.hidden) continue;
      if (!fr.contents.match (re_match)) continue;

      if (regStr.length > 1 && !regStr.match (/\s/)) {
        for (var j = 0; j < fr.words.length; j++) {
          var obj = fr.words[j];
          if (!obj.contents.match (re_match)) continue;
          obj.contents = obj.contents.replace (re, replacer);
        }
      } else if (regStr.length == 1) {
        for (var j = 0; j < fr.textRanges.length; j++) {
          var obj = fr.textRanges[j];
          if (!obj.contents.match (re_match)) continue;
          obj.contents = obj.contents.replace (re, replacer);
        }
      } else if (regStr.length > 1 && regStr.match (/\s/)) {
        for (var j = 0; j < fr.lines.length; j++) {
          var obj = fr.lines[j];
          if (!obj.contents.match (re_match)) continue;
          obj.contents = obj.contents.replace (re, replacer);
        }
      }
    }
  }
} ());
