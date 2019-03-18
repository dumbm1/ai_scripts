;(function getMinFontHeight() {
  var PT_TO_MM = 0.352777778,
      txtFrameDouble,
      frameCurves,
      res;
  try {
    txtFrameDouble = selection[0].duplicate();
  } catch (e) {
    txtFrameDouble = selection.parent.textFrames[0].duplicate();
  }

  txtFrameDouble.contents = 'w';
  frameCurves = txtFrameDouble.createOutline();
  res = [
    Math.round(frameCurves.height * PT_TO_MM * 100) / 100,
    Math.round(frameCurves.width * PT_TO_MM * 100) / 100
  ];
  frameCurves.remove();

  alert('h: ' + res[0] + ' mm\nw: ' + res[1] + ' mm');
})();