/**
 # ai.jsx (c)MaratShagiev m_js@bk.ru 20.09.2016

 splitTxtFrames_v1.1

 ## main algorithm (in while loop in function _splitTxt):
 * if match (empty line) then duplicate the base frame
 * clear previous paragraph (if any)
 * clear last paragraphs
 * and so on
 */
(function splitTxtFrames () {
  try {
    var sel = selection;
    if (!sel.length) throw new Error ('Select text frame and try again');
    executeMenuCommand ('deselectall');

    for (var i = 0; i < sel.length; i++) {
      var obj = sel[i];
      if (obj.typename != 'TextFrame') continue;
      _splitTxt (obj);
    }
  } catch (e) {
    alert (e.line + '\n' + e.message)
  }

  function _splitTxt (fr) {
    var result,
        resultFrames   = [],
        prevSectionLen = 0,
        re             = /(\s$)/mg,
        protectStart   = 1,
        protectCount   = protectStart,
        protectLim     = 10;

    fr.characters[fr.characters.length - 1].contents += '\r';

    __delDoubleEmpty (fr);

    while (result = re.exec (fr.contents)) {

      var currFr                 = fr.duplicate ();
      var lastContentsToDel      = currFr.characters[result.index];
      lastContentsToDel.length   = currFr.contents.length - result.index;
      lastContentsToDel.contents = '';
      if (prevSectionLen) {
        var prevContentsToDel      = currFr.characters[0];
        prevContentsToDel.length   = prevSectionLen;
        prevContentsToDel.contents = '';
      }
      prevSectionLen += currFr.contents.length;
      /**
       *  Allow the user to forcibly abort, cause probably loop becomes infinite
       *  */
      if (protectCount % (protectLim + protectStart) == 0) {
        if (confirm
          ('It seems that the loop becomes infinite\n' +
            'Current number of iterations is ' + (protectCount - (protectCount % protectLim)) + '\n' +
            'Do you want to abort the script?')) break;
      }
      protectCount++;
      resultFrames.push (currFr);
    }

    /**
     * delete first and last empty strings around paragraph
     * */
    for (var i = 0; i < resultFrames.length; i++) {
      var obj = resultFrames[i];
      __delLastEmptyLine (obj);
    }
    for (i = 0; i < resultFrames.length; i++) {
      obj = resultFrames[i];
      __delFirstEmptyLine (obj);
    }

    fr.remove ();
    /**
     * positioning frames
     * */
    for (var j = 0, pos; j < resultFrames.length - 1; j++) {
      var dupl                = (resultFrames[j].duplicate ()).createOutline ();
      resultFrames[j + 1].top = dupl.geometricBounds[3] - 10;
      dupl.remove ();
    }

    function __delLastEmptyLine (fr) {
      try {
        var reLast     = /\s$/gmi;
        var resultLast = reLast.exec (fr.contents);
        var currMatch;
        if (resultLast) {
          currMatch        = fr.characters[resultLast.index];
          currMatch.length = resultLast[0].length;
          currMatch.remove ();
        }
      } catch (e) {
      }
    }

    function __delFirstEmptyLine (fr) {
      try {
        var reFirst     = /^$\s/gmi;
        var resultFirst = reFirst.exec (fr.contents);
        var currMatch;
        if (resultFirst) {
          currMatch        = fr.characters[resultFirst.index];
          currMatch.length = resultFirst[0].length;
          currMatch.remove ();
        }
      } catch (e) {
      }
    }

    function __delDoubleEmpty (fr) {
      var re       = /(\s^$){2,}/gmi;
      var replacer = '\r';

      while (result = re.exec (fr.contents)) {
        try {
          var currMatch      = fr.characters[result.index];
          currMatch.length   = result[0].length;
          // currMatch.contents = currMatch.contents.replace (re, replacer);
          currMatch.contents = replacer;
          // !!! when the match.length is different with the replacer.length the loop becomes infinite
          // re.lastIndex += currMatch.contents.length - result[0].length;
        } catch (e) {
        }
      }
    }
  }
} ());
