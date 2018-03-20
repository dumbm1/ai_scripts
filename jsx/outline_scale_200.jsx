//@target illustrator

(function outline_scale_200() {
  try {
    if (!selection[0]) {
      illustrator.reveal(new File(activeDocument.fullName));
      return false;
    }
    if (selection[0].typename == 'TextFrame') {
      selection[0].createOutline();
    }
    selection[0].resize(200, 200);
  } catch (e) {
    $.writeln('Line: ' + e.line + ', Error: ' + e.message + ', ' + new Date());
    illustrator.reveal(new File(activeDocument.fullName));
    return false;
  }
  illustrator.reveal(new File(activeDocument.fullName));
  return true;
}());
