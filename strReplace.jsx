/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 12.08.2016.
 *
 * strRepl_v0.0.6
 */
//@target illustrator
//@targetengine "session"

(function replaceStr () {

  if (documents.length == 0) {
    alert ('Make/open document');
    return;
  }
  if (activeDocument.textFrames.length == 0) {
    alert ('Make text frame');
    return;
  }

  /**
   * CONSTRUCT THE PALETTE
   * */
  {
    var w           = new Window ('palette', 'RegExp Replacer');
    w.alignChildren = 'left';
    w.add ('statictext', undefined, 'RegExp');
    w.fld_reg = w.add ('edittext', [0, 0, 260, 20]);
    w.add ('statictext', undefined, 'Replacer');
    w.fld_replacer = w.add ('edittext', [0, 0, 260, 20]);
    w.gr_btns      = w.add ('group');
    w.btn_ok       = w.gr_btns.add ('button', undefined, 'Ok');
    w.btn_canc     = w.gr_btns.add ('button', undefined, 'Cancel');

    w.btn_ok.onClick = function () {
      var bt    = new BridgeTalk ();
      bt.target = "illustrator";

      bt.body = repl.toString () + ';' + focusToFile.toString () + ';' +
        'repl("' + w.fld_reg.text + '","' + w.fld_replacer.text + '");' + 'focusToFile()';

      bt.onError = function (errorMsgObject) {
        alert (errorMsgObject.body + '\n' + errorMsgObject.headers["Error-Code"]);
      }
      bt.send ();

    }
    w.fld_replacer.addEventListener ('keydown', function (e) {
      if (e.keyName != 'Enter') return;

      var bt    = new BridgeTalk ();
      bt.target = "illustrator";

      bt.body = repl.toString () + ';' + focusToFile.toString () + ';' +
        'repl("' + w.fld_reg.text + '","' + w.fld_replacer.text + '");' + 'focusToFile()';

      bt.onError = function (errorMsgObject) {
        alert (errorMsgObject.body + '\n' + errorMsgObject.headers["Error-Code"]);
      }
      bt.send ();

    });
    w.btn_canc.onClick = function () {
      w.close ();
      focusToFile ();
    }
    w.onClose          = function () {
      focusToFile ();
    }

    w.show ();
  }

  function focusToFile () {
    illustrator.reveal (new File (activeDocument.fullName));
  }

  /**
   * change Contents Of Word Or String Remain Formatting
   * autor (c)pixxxel schubser
   *
   * function needs one text frame selected by Selection Tool,
   * Direct Selection Tool or Group Selection Tool
   * */
  function repl (regStr, replacer) {
    if (selection.length != 1) {
      alert ('Select the text frame by Selection Tool, Direct Selection Tool or Group Selection Tool');
      return;
    }
    var txtFrame = selection[0],
        reg      = new RegExp (regStr, 'gi'),
        result;

    while (result = reg.exec (txtFrame.contents)) {
      try {
        var aCon      = txtFrame.characters[result.index];
        aCon.length   = result[0].length;
        aCon.contents = aCon.contents.replace (reg, replacer);
      } catch (e) {
      }
    }
  }

} () );
