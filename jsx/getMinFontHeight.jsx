;(function getMinFontHeight() {
  if (!selection.length) throw new Error ('NoSelection');
  if (selection.length > 1) throw new Error('ManySelection');
  if (selection[0].typename !== 'TextFrame') throw new Error ('SelectionIsNotATextFrame');


  var PT_TO_MM = 0.352777778;

  var fr = selection[0];
  var fr2 = fr.duplicate();
  var result_h, result_w;
  fr.selected = false;
  fr2.contents = 'w';
  fr2.createOutline();
  fr2 = selection[0];
  result_h = Math.round(fr2.height * PT_TO_MM * 1000) / 1000;
  result_w = Math.round(fr2.width * PT_TO_MM * 1000) / 1000;
  alert('height: ' + result_h + ' мм\n' + 'width: ' + result_w + ' мм');
  fr2.remove();
  fr.selected = true;
// todo: this code work with point text only....
})();