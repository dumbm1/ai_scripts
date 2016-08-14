/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 17.06.2016
 *
 * calcCharSize_v0.1
 */
////@target illustrator-18


/**
 * calculate top, bottom spasing and the real height of the capital character F
 *
 * @param {TextFrameItem} frame - object of the TextFrameItem class
 * @return {Object} fontMeasures - result object {chr, top, bot, toString()}
 */
function calcCharSize (frame) {
  function calcCharSize (frame) {
    var txt2meas     = activeDocument.activeLayer.textFrames.add (),
        fullH,
        fontMeasures = {};

    txt2meas.contents                               = 'F';
    txt2meas.textRange.characterAttributes.textFont = frame.textRange.characterAttributes.textFont;
    txt2meas.textRange.characterAttributes.size     = frame.textRange.characterAttributes.size;

    var txt2meas_curv = (txt2meas.duplicate ()).createOutline ();

    fullH            = txt2meas.height;
    fontMeasures.h   = txt2meas_curv.height;
    fontMeasures.top = Math.abs (txt2meas.position[1] - txt2meas_curv.position[1]);
    fontMeasures.bot = (fullH - fontMeasures.h - fontMeasures.top);

    txt2meas.remove ();
    txt2meas_curv.remove ();

    return fontMeasures;
  }
}
