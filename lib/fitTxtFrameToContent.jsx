/**
 * Adobe ExtendScript for Illustrator
 * (c)Marat Shagiev
 * m_js@bk.ru
 * 15.11.2016
 * */

//@target illustrator

/* fit_frame_to_text.js -- resize selected text frames to fit their current text content [Adobe Illustrator]
 This script is released into the public domain. No warranty provided, E&OE, caveat emptor, etc.
 Notes:
 - Text frame must be rectangular area text, vertically aligned to avoid skewing when its path height changes.
 - On success, fitFrame returns new height in points. If text frame is empty it is resized to 0 height.
 - If text frame was point- or path-based, or not a text frame, fitFrame returns -1 to indicate it was ignored.
 Caution:
 - JSX scripts should use anonymous functions and local vars only whenever possible, as AI's shared JS interpreter gets increasingly fragile as globals are defined, eventually resulting in JS (and AS!) commands repeatedly failing with PARM ('MRAP') errors until AI is relaunched. (Though even this doesn't necessarily avoid problem; e.g. repeatedly running any JS script from AS seems to blow up after a while, after which AS commands randomly fail as well.)
 */

(function() {

  for (var i = 0; i < activeDocument.selection.length; i++) {
    fitFrame(activeDocument.selection[i]);
  }

  function fitFrame(textFrame) { // textFrame must be a TextFrameItem
    if (!(textFrame instanceof TextFrame && textFrame.kind == TextType.AREATEXT)) { // ignore point/path text
      return -1;
    }
    var limit      = 0.2;
    var textPath   = textFrame.textPath;
    var textLength = textFrame.contents.replace(/\s+$/, "").length; // get length of printable text (ignores trailing whitespace)
    if (textLength === 0) {
      textPath.height = 0; // text frame is empty so set to zero-height and return
      return 0;
    }
    var h = textPath.height;
    // if frame has no height, add some to get things started
    if (h < limit) {
      h               = limit;
      textPath.height = h;
    }
    // overflow checker; this checks length of printable text to index of last visible character in frame
    var hasOverflow = function() {
      var lastLine = textFrame.lines[textFrame.lines.length - 1];
      if (lastLine === undefined) { // no lines are visible (frame is too small)
        return textLength > 0;
      }
      return textLength > (lastLine.characters[0].characterOffset + lastLine.length - 1);
    }
    // adjust text frame height using two-stage divide and conquer; crude, but works, and acceptably fast
    // find initial approximate min and max heights between which text overflow occurs
    var oh;
    if (hasOverflow()) {
      do {
        oh              = h;
        h *= 1.5;
        textPath.height = h;
      } while (hasOverflow());
    } else {
      do {
        oh              = h;
        h /= 1.5;
        textPath.height = h;
      } while (!hasOverflow());
    }
    // narrow the difference between min and max approximations till it falls within limit
    var d = oh - h;
    if (d < 0) {
      d = -d;
    }
    while (d > limit) {
      d /= 2;
      h += (hasOverflow() ? d : -d);
      textPath.height = h;
    }
    // if final reduction caused overflow, undo it
    if (hasOverflow()) {
      textPath.height = h + d;
    }
    return textPath.height;
  }
})();
 