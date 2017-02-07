/**
 * Adobe ExtendScript for Illustrator CS4
 * (c)Marat Shagiev
 * m_js@bk.ru
 * 02.02.2017
 * */

  //@target illustrator

var pdf = new File('~/Desktop/Bleed_CS5.ai');

var pdfBoxes = getPDFboxes(pdf);

var bleedTop = Math.round((pdfBoxes.MediaBox[3] - pdfBoxes.TrimBox[3]) / 2.834654);

alert('Bleed Top: ' + bleedTop + 'mm');

var bleedBottom = Math.round(pdfBoxes.TrimBox[1] / 2.834654);

alert('Bleed Bottom: ' + bleedBottom + 'mm');

var bleedLeft = Math.round(pdfBoxes.TrimBox[0] / 2.834654);

alert('Bleed Left: ' + bleedLeft + 'mm');

var bleedRight = Math.round((pdfBoxes.MediaBox[2] - pdfBoxes.TrimBox[2]) / 2.834654);

alert('Bleed Right: ' + bleedRight + 'mm');

function getPDFboxes(f) {

  var pdfBoxes = new Object();

  try {

    f.open('r');

    var str = f.read();

    var b = str.match(/BleedBox\[\d{1,5}\.\d{1,5}\s\d{1,5}\.\d{1,5}\s\d{1,5}\.\d{1,5}\s\d{1,5}\.\d{1,5}\]/g);

    if (b != null) pdfBoxes.BleedBox = b[0].match(/\d{1,5}\.\d{1,5}/g);

    var a = str.match(/ArtBox\[\d{1,5}\.\d{1,5}\s\d{1,5}\.\d{1,5}\s\d{1,5}\.\d{1,5}\s\d{1,5}\.\d{1,5}\]/g);

    if (a != null) pdfBoxes.ArtBox = a[0].match(/\d{1,5}\.\d{1,5}/g);

    var m = str.match(/MediaBox\[\d{1,5}\.\d{1,5}\s\d{1,5}\.\d{1,5}\s\d{1,5}\.\d{1,5}\s\d{1,5}\.\d{1,5}\]/g);

    if (m != null) pdfBoxes.MediaBox = m[0].match(/\d{1,5}\.\d{1,5}/g);

    var t = str.match(/TrimBox\[\d{1,5}\.\d{1,5}\s\d{1,5}\.\d{1,5}\s\d{1,5}\.\d{1,5}\s\d{1,5}\.\d{1,5}\]/g);

    if (t != null) pdfBoxes.TrimBox = t[0].match(/\d{1,5}\.\d{1,5}/g);

    var c = str.match(/CropBox\[\d{1,5}\.\d{1,5}\s\d{1,5}\.\d{1,5}\s\d{1,5}\.\d{1,5}\s\d{1,5}\.\d{1,5}\]/g);

    if (c != null) pdfBoxes.CropBox = c[0].match(/\d{1,5}\.\d{1,5}/g);

    f.close();

  } catch (err) {

    f.close();
  }

  return pdfBoxes;
}
 