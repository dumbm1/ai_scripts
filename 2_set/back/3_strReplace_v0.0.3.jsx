/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 06.08.2016.
 *
 * strRepl_v0.0.3
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

    })

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

  function repl (regStr, replacer) {
    var re       = new RegExp (regStr, 'gmi');
    var selFrame = selection[0]; // get the frame
    var selFrLen = selFrame.length;

    ( function recurs (i) {

      executeMenuCommand ('deselectall');
      var a, b, fullCont, fullContMod;

      selFrame.textRange.characters[i].select ();

      for (; i < selFrLen - 1; i++) {
        a = selFrame.textRange.characters[i];
        b = selFrame.textRange.characters[i + 1];

        if (_compare (a, b)) {
          b.select (true);
          continue;
        } else if (!_compare (a, b)) {
          fullCont                           = selFrame.textSelection[0].contents + selFrame.textSelection[1].contents;
          fullContMod                        = fullCont.replace (re, replacer);
          selFrame.textSelection[0].contents = fullContMod.slice (0, -1);
          selFrame.textSelection[1].contents = fullContMod.slice (-1);
          i += fullContMod.length - fullCont.length;
          // selFrame.textRange.characters[i + 1].select ();
          i++;
          recurs (i);
        }
      }
      fullCont          = selFrame.textSelection[0].contents + selFrame.textSelection[1].contents;
      fullContMod       = fullCont.replace (re, replacer);
      selFrame.contents = fullContMod;
    } (0));

    function _compare (a, b) {
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

  function _delArtefact (elem) {
    executeMenuCommand ('deselectall');
    var x         = elem.position[0];
    var y         = elem.position[1];
    elem.selected = true;
    cut ();
    paste ();
    selection[0].position = [x, y];
  }

} () );
