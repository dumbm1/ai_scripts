//todo: (1) get Selection (2) add two rect (3) add text frame

// function AddTechFrame_onlyTT() {
var MM_TO_PT     = 2.834645668,
    doc          = activeDocument,
    sel          = selection[0],
    lay          = sel.layer,
    gr           = lay.groupItems.add(),
    extendValue  = 10 * MM_TO_PT,
    rect, rect2, frame,
    fillCol, strokeCol,
    textContents = prompt('Set text: ', 'ТОЛЬКО «ТЕХНИЧЕСКИЙ» ТЕКСТ (УВЕЛИЧЕНИЕ 200%)');

gr.move(lay, ElementPlacement.PLACEATEND);

strokeCol = new CMYKColor();
strokeCol.black = 100;

fillCol = new CMYKColor();

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

rect.fillColor = rect2.fillColor = fillCol;
rect.strokeColor = rect2.strokeColor = strokeCol;

frame = gr.textFrames.add();
frame.contents = textContents;
frame.paragraphs[0].paragraphAttributes.justification = Justification.CENTER;
frame.position = [
  rect2.left + (rect2.width - frame.width) / 2,
  rect2.top - (rect2.height - frame.height) / 2

];

function fitFrameToArea(frame) {
  //todo: (1) make curves double (2) compare width and height (3) increase text size
}

// }