/**
 * jsx for Ai. Marat Shagiev: marat_js@bk.ru. 19.06.2016 12:34.
 */
////@target illustrator-19
// Lorem ipsum generator
//// @author C. Peter Chen of http://dev-notes.com
//// @date 20080812
(function loremIpsumGenerator (wordsCount) {
  if (!documents.length) return;

  setZero ();

  var editMode  = getDocEditCase ();
  var lorIpsStr = getLorIpsStr (wordsCount);

  switch (editMode) {
    case 0: // obj mode, obj selected
      addToSelFrame (selection[0], lorIpsStr);
    case 2: // obj mode, nothing selected
      addToActLay (lorIpsStr);
      break;
    case 1: // text mode, text selecteda
    case 3: // text mode, empty selection
      addToSelText (selection, lorIpsStr);
      break;
    default:
      break;
  }

  function addToActLay (lorIpsStr) {

    /*var actArtIndex = activeDocument.artboards.getActiveArtboardIndex ();
     var actArt      = activeDocument.artboards[actArtIndex];*/
    var rect = activeDocument.activeLayer.pathItems.rectangle (
      // actArt.artboardRect[0],
      /*actArt.artboardRect[3] / 2, // top
       actArt.artboardRect[1],     // left
       actArt.artboardRect[2] / 2, // width
       actArt.artboardRect[3] / 2  // height*/
      0, 0,
      activeDocument.width / 2,
      activeDocument.height / 2
    );

    var fr = activeDocument.activeLayer.textFrames.areaText (rect);

    fr.contents = lorIpsStr;
  }

  function addToSelFrame (obj, lorIpsStr) {
    // if (obj.typename == 'TextFrame') return;
    if (!obj.createOutline) return; // duck typing

    if (obj.contents) {
      obj.contents += ' ' + lorIpsStr;
    } else {
      obj.contents += lorIpsStr;
    }
  }

  function addToSelText (sel, lorIpsStr) {
    sel.contents = lorIpsStr;
  }

  function getLorIpsStr (wordsCount) {
    wordsCount = wordsCount || 100;

    var loremIpsumWordBank = [
      "lorem", "ipsum", "dolor", "sit", "amet,", "consectetur", "adipisicing", "elit,", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua.", "enim", "ad", "minim", "veniam,", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat.", "duis", "aute", "irure", "dolor", "in", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur.", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident,", "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum.", "sed", "ut", "perspiciatis,", "unde", "omnis", "iste", "natus", "error", "sit", "voluptatem", "accusantium", "doloremque", "laudantium,", "totam", "rem", "aperiam", "eaque", "ipsa,", "quae", "ab", "illo", "inventore", "veritatis", "et", "quasi", "architecto", "beatae", "vitae", "dicta", "sunt,", "explicabo.", "nemo", "enim", "ipsam", "voluptatem,", "quia", "voluptas", "sit,", "aspernatur", "aut", "odit", "aut", "fugit,", "sed", "quia", "consequuntur", "magni", "dolores", "eos,", "qui", "ratione", "voluptatem", "sequi", "nesciunt,", "neque", "porro", "quisquam", "est,", "qui", "dolorem", "ipsum,", "quia", "dolor", "sit,", "amet,", "consectetur,", "adipisci", "velit,", "sed", "quia", "non", "numquam", "eius", "modi", "tempora", "incidunt,", "ut", "labore", "et", "dolore", "magnam", "aliquam", "quaerat", "voluptatem.", "ut", "enim", "ad", "minima", "veniam,", "quis", "nostrum", "exercitationem", "ullam", "corporis", "suscipit", "laboriosam,", "nisi", "ut", "aliquid", "ex", "ea", "commodi", "consequatur?", "quis", "autem", "vel", "eum", "iure", "reprehenderit,", "qui", "in", "ea", "voluptate", "velit", "esse,", "quam", "nihil", "molestiae", "consequatur,", "vel", "illum,", "qui", "dolorem", "eum", "fugiat,", "quo", "voluptas", "nulla", "pariatur?", "at", "vero", "eos", "et", "accusamus", "et", "iusto", "odio", "dignissimos", "ducimus,", "qui", "blanditiis", "praesentium", "voluptatum", "deleniti", "atque", "corrupti,", "quos", "dolores", "et", "quas", "molestias", "excepturi", "sint,", "obcaecati", "cupiditate", "non", "provident,", "similique", "sunt", "in", "culpa,", "qui", "officia", "deserunt", "mollitia", "animi,", "id", "est", "laborum", "et", "dolorum", "fuga.", "harum", "quidem", "rerum", "facilis", "est", "et", "expedita", "distinctio.", "Nam", "libero", "tempore,", "cum", "soluta", "nobis", "est", "eligendi", "optio,", "cumque", "nihil", "impedit,", "quo", "minus", "id,", "quod", "maxime", "placeat,", "facere", "possimus,", "omnis", "voluptas", "assumenda", "est,", "omnis", "dolor", "repellendus.", "temporibus", "autem", "quibusdam", "aut", "officiis", "debitis", "aut", "rerum", "necessitatibus", "saepe", "eveniet,", "ut", "et", "voluptates", "repudiandae", "sint", "molestiae", "non", "recusandae.", "itaque", "earum", "rerum", "hic", "tenetur", "a", "sapiente", "delectus,", "aut", "reiciendis", "voluptatibus", "maiores", "alias", "consequatur", "aut", "perferendis", "doloribus", "asperiores", "repellat"
    ];

    var res = "";
    for (var i = 0; i < wordsCount; i++) {
      var newTxt = loremIpsumWordBank[Math.floor (Math.random () * (loremIpsumWordBank.length - 1))];
      if (res.substring (res.length - 1, res.length) == "." || res.substring (res.length - 1, res.length) == "?") {
        newTxt = newTxt.substring (0, 1).toUpperCase () + newTxt.substring (1, newTxt.length);
      }
      res += " " + newTxt;
    }
    res = 'Lorem ipsum' + res;
    return res;
  }

  /**
   * current case of edit mode in document (mode + selection)
   * mask of edit mode is 1, mask of selected is 2
   * @return (Number) editCase 0-3 current case of edit
   */
  function getDocEditCase () {

    var sel             = selection,
        MASK_STR_MODE   = 1,
        MASK_SEL_LENGTH = 2,
        editCase;

    editCase = ( typeof sel.contents == 'string' ) * MASK_STR_MODE | ( sel.length == 0 ) * MASK_SEL_LENGTH;

    /**
     * static func: human output of current edit-case
     * @param {Number} editCase тcurrent edit-case
     * @return {String} modesDescription [ editCase ] human output
     */
    getDocEditCase.modeDescription = function (editCase) {
      var modesDescription = [
        'the case of object edit, something selected',  // 0 | 0 = 0
        'the case of text edit, something selected',    // 1 | 0 = 1
        'the case of object edit, nothing selected',    // 0 | 2 = 2
        'the case of text edit, nothing selected'       // 1 | 2 = 3
      ];
      return modesDescription [editCase];
    }

    return editCase;
  }

  function setZero () {

    activeDocument.rulerOrigin = [0, activeDocument.height]; // Set Zero point ruler on Document

    if (selection.length != 0) {
      var left = selection[0].left,
          top  = -selection[0].top;

      activeDocument.artboards[activeDocument.artboards.getActiveArtboardIndex ()].rulerOrigin = [left, top];
      return;
    }
    activeDocument.artboards[activeDocument.artboards.getActiveArtboardIndex ()].rulerOrigin = [0, 0];
  }

} (300));
