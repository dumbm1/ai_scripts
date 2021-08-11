//todo: (1) get Selection (2) add two rect (3) add text frame

( function AddTechFrame_onlyTT() {
var MM_TO_PT     = 2.834645668,
    doc          = activeDocument,
    sel          = selection[0],
    lay          = sel.layer,
    gr           = lay.groupItems.add(),
    extendValue  = 10 * MM_TO_PT,
    rect, rect2, frame,
    fillCol, strokeCol,
    fact,
    textContents = prompt('Set text: ', 'БЛАНК ДЛЯ ПРОВЕРКИ КОРРЕКТНОСТИ / ГРАМОТНОСТИ «ТЕХНИЧЕСКОГО» ТЕКСТА РАСПОЛОЖЕНИЕ ТЕКСТОВЫХ БЛОКОВ ПРОИЗВОЛЬНОЕ');

if(!textContents) return;

gr.move(lay, ElementPlacement.PLACEATEND);

strokeCol = new CMYKColor();
strokeCol.black = 100;

fillCol = new CMYKColor();
fillCol.black = 0;

rect = gr.pathItems.rectangle(
  sel.top + extendValue,
  sel.left - extendValue,
  sel.width + extendValue * 2,
  sel.height + extendValue * 6
);

rect2 = gr.pathItems.rectangle(
  sel.top - sel.height - extendValue,
  sel.left - extendValue,
  sel.width + extendValue * 2,
  extendValue * 4
);

rect.fillColor = fillCol;
rect.strokeColor = strokeCol;
rect.strokeWidth = 1;
rect2.fillColor = fillCol;
rect2.strokeColor = strokeCol;
rect2.strokeWidth = 1;

frame = gr.textFrames.add();
frame.contents = textContents;
frame.paragraphs[0].paragraphAttributes.justification = Justification.CENTER;
frame.position = [
  rect2.left + (rect2.width - frame.width) / 2,
  rect2.top - (rect2.height - frame.height) / 2
];

fact = (rect2.width - extendValue) * 100 / frame.width;
frame.resize(fact, fact, true, true, true, true, 0.00, Transformation.CENTER);

 }());
