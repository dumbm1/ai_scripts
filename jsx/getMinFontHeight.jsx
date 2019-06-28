//todo: add processing the GroupItem

;(function getMinFontHeight() {

  try {
    var result = processDoubles(selection);
    if (!result) throw new Error();
    alert('Capital:\t' + result[0] + ' mm\nSmall:\t' + result[1] + ' mm');
  } catch (e) {
    alert(e);
  }

  function processDoubles(selection) {

    var PT_TO_MM = 0.352777778,
        txtFrameDouble,
        txtFrameDoubleCaps,
        frameCurves,
        frameCurvesCaps,
        fontH, fontW, fontHCaps, fontWCaps,
        elem;

    elem = (function f() { // try to get the TextFrame

      if (!selection[0] && !selection.typename) throw new Error('No selection!'); // no selection

      if (selection[0]) { // object mode
        if (selection.length > 1) throw new Error('So meny selection!');
        if (selection[0].typename === 'GroupItem') { // try to get TextFrame from GrouItem
          if (selection[0].pageItems.length > 1) throw new Error('It\'s a complex group!');
          if (selection[0].pageItems[0].typename !== 'TextFrame') {
            throw new Error('Selection in group doesn\'t a Text Frame!');
          }
          return selection[0].pageItems[0];

        }
        if (selection[0].typename !== 'TextFrame') throw new Error('Selection doesn\'t a Text Frame!');
        return selection[0];
      } else if (selection.typename) { // text mode
        return selection.parent.textFrames[0];
      }

      throw new Error();
    })();

    txtFrameDouble = elem.duplicate();
    txtFrameDoubleCaps = elem.duplicate();

    txtFrameDouble.contents = 'wwwww';
    txtFrameDoubleCaps.contents = 'WWWWW';
    frameCurves = txtFrameDouble.createOutline();
    frameCurvesCaps = txtFrameDoubleCaps.createOutline();

    fontH = Math.round(frameCurves.height * PT_TO_MM * 100) / 100;
    fontHCaps = Math.round(frameCurvesCaps.height * PT_TO_MM * 100) / 100;
    fontW = Math.round(frameCurves.width * PT_TO_MM * 100) / 100;
    fontWCaps = Math.round(frameCurvesCaps.width * PT_TO_MM * 100) / 100;

    frameCurves.remove();
    frameCurvesCaps.remove();

    return [Math.min(fontHCaps, fontWCaps), Math.min(fontH, fontW)];
  }
})();
