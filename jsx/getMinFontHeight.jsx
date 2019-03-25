//todo: add processing the GroupItem

;(function getMinFontHeight() {
  var PT_TO_MM = 0.352777778,
      txtFrameDouble,
      frameCurves,
      fontH, fontW, res;

  try {
    txtFrameDouble = selection[0].duplicate();
  } catch (e) {
    txtFrameDouble = selection.parent.textFrames[0].duplicate();
  }

  txtFrameDouble.contents = 'www';
  frameCurves = txtFrameDouble.createOutline();

  fontH = Math.round(frameCurves.height * PT_TO_MM * 100) / 100;
  fontW = Math.round(frameCurves.width * PT_TO_MM * 100) / 100;

  frameCurves.remove();

  alert(Math.min(fontH, fontW));
})();
