/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 10.09.2016
 */
//@target illustrator-20
try {
  clearConsole ();
  splitTxt ();
} catch (e) {
  alert (e.line + '\n' + e.message)
}
function splitTxt () {
  if (!selection.length) throw new Error ('Select text frame and try again');
  if (selection[0].typename != 'TextFrame') throw new Error ('Select text frame and try again');

  var result,
      resultFrames   = [],
      fr             = selection[0],
      prevSectionLen = 0,
      re             = /(\s$)/mg,
      protectStart   = 1,
      protectCount   = protectStart,
      protectLim     = 10;

  executeMenuCommand ('deselectall');

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

  for (var i = 0; i < resultFrames.length; i++) {
    var obj = resultFrames[i];
    delLastEmptyLine (obj);
  }

  for (i = 0; i < resultFrames.length; i++) {
    var obj = resultFrames[i];
    delFirstEmptyLine (obj);
  }

  fr.remove ();
}

function delLastEmptyLine (fr) {
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
    // alert ('error in delFirstEmptyLine function\n' + e.line + '\n' + e.message);
  }
}

function delFirstEmptyLine (fr) {
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
    // alert ('error in delFirstEmptyLine function\n' + e.line + '\n' + e.message);
  }
}
function clearConsole () {
  var bt    = new BridgeTalk ();
  bt.target = 'estoolkit';
  bt.body   = 'app.clc();';
  bt.send ();
}
