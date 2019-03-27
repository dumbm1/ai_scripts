//todo: add processing the GroupItem

;(function getMinFontHeight() {
  var PT_TO_MM = 0.352777778,
      txtFrameDouble,
      txtFrameDoubleCaps,
      frameCurves,
      frameCurvesCaps,
      fontH, fontW, fontHCaps, fontWCaps;

  try {
    txtFrameDouble = selection[0].duplicate();
    txtFrameDoubleCaps = selection[0].duplicate();
    _processDoubles();
  } catch (e) {
    txtFrameDouble = selection.parent.textFrames[0].duplicate();
    txtFrameDoubleCaps = selection.parent.textFrames[0].duplicate();
    _processDoubles();
  } finally {
    alert('Capital:\t' + Math.min(fontHCaps, fontWCaps) + ' mm\nSmall:\t' + Math.min(fontH, fontW) + ' mm');
  }

  function _processDoubles() {
    txtFrameDouble.contents = 'www';
    txtFrameDoubleCaps.contents = 'WWW';
    frameCurves = txtFrameDouble.createOutline();
    frameCurvesCaps = txtFrameDoubleCaps.createOutline();

    fontH = Math.round(frameCurves.height * PT_TO_MM * 100) / 100;
    fontHCaps = Math.round(frameCurvesCaps.height * PT_TO_MM * 100) / 100;
    fontW = Math.round(frameCurves.width * PT_TO_MM * 100) / 100;
    fontWCaps = Math.round(frameCurvesCaps.width * PT_TO_MM * 100) / 100;

    frameCurves.remove();
    frameCurvesCaps.remove();
  }
})();
