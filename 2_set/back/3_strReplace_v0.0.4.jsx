/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 06.08.2016.
 *
 * strRepl_v0.0.4
 */
//@target illustrator
//@targetengine "session"

(function replaceStr () {
  if (documents.length == 0) return;
  if (activeDocument.textFrames.length == 0) return;
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

    // w.show ();
  }

  function focusToFile () {
    illustrator.reveal (new File (activeDocument.fullName));
  }

  function repl (reStr, replacer) {
    var re  = new RegExp (reStr, 'gmi');
    var frm = selection[0];
    var a, b,
        i   = 0,
        txtOrig, txtModif;

    frm.textRange.characters[i].select ();

    for (; ; i++) {
      try {
        a = frm.textRange.characters[i];
        b = frm.textRange.characters[i + 1];
      } catch (e) {
        _replRng ();
        break;
      }

      if (_cmprTxtAttr (a, b)) {
        b.select (true);
        continue;
      } else {
        _replRng ();
        i += txtModif.length - txtOrig.length;
        frm.textRange.characters[i + 1].select ();
        continue;
      }
    }

    function _replRng () { // nothing return; only modify global vars
      if (frm.textSelection.length > 1) {
        txtOrig                       = frm.textSelection[0].contents + frm.textSelection[1].contents;
        txtModif                      = txtOrig.replace (re, replacer);
        frm.textSelection[1].contents = txtModif.slice (-1);
        frm.textSelection[0].contents = txtModif.slice (0, -1);
      } else {
        txtOrig                       = frm.textSelection[0].contents;
        txtModif                      = txtOrig.replace (re, replacer);
        frm.textSelection[0].contents = txtModif;
      }
    }

    function _cmprTxtAttr (a, b) {
      return __compareFill (a, b) && __compareFont (a, b);

      function __compareFill (a, b) {
        var aCol = a.characterAttributes.fillColor;
        var bCol = b.characterAttributes.fillColor;

        if (aCol.typename != bCol.typename) return false;

        if (aCol.typename == 'RGBColor') {
          if (aCol.red != bCol.red || aCol.green != bCol.green || aCol.blue != bCol.blue) {
            return false;
          }
        } else if (aCol.typename == 'CMYKColor') {
          if (aCol.cyan != bCol.cyan || aCol.magenta != bCol.magenta ||
            aCol.yellow != bCol.yellow || aCol.black != bCol.black) {
            return false;
          }
        }
        return true;
      }

      function __compareFont (a, b) {
        var aFnt = a.characterAttributes;
        var bFnt = b.characterAttributes;

        if (aFnt.size != bFnt.size) return false;
        if (aFnt.textFont.style != bFnt.textFont.style) return false;
        if (aFnt.textFont.family != bFnt.textFont.family) return false;

        return true;
      }
    }
  }

} () );
