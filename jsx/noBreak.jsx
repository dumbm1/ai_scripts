/**
 * Adobe ExtendScript for Illustrator
 * v0.1
 * http://forum.rudtp.ru/threads/vydelenie-teksta-na-dva-simvola-vlevo-i-vpravo-ot-polozhenija-kursora.66940/#post-904865
 * (c) Oleg Butrin
 * (c) Marat Shagiev
 * e-mail: m_js@bk.ru
 * 21.08.2017
 * */

noBreakSelection();

function noBreakCursorArea(c) {
  var count = c || 2;
  var doc   = app.activeDocument;
  if (doc.selection.constructor.name == 'TextRange') {
    var tr = doc.selection;
    try {
      tr.characterOffset = tr.characterOffset - (count + count / 2);
      tr.length          = 2 * count;
      tr.select();
      tr.characterAttributes.noBreak = true;
    } catch (error) {
    }
  }
}

function noBreakSelection() {
  var doc = app.activeDocument;
  if (doc.selection.constructor.name == 'TextRange') {
    var tr = doc.selection;
    try {
      if (tr.characterAttributes.noBreak == true) {
        tr.characterAttributes.noBreak = false;
      } else {
        tr.characterAttributes.noBreak = true;
      }
    } catch (error) {
    }
  }
}
