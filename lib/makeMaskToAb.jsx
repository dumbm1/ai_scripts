/**
 * Adobe ExtendScript for Illustrator
 * (c) Marat Shagiev
 * e-mail: m_js@bk.ru
 * 02.02.2017
 * */

function makeMaskToAb() {
  var d        = activeDocument,
      abs      = d.artboards,
      abIndex  = abs.getActiveArtboardIndex(),
      ab       = d.artboards[abIndex],
      abRect   = ab.artboardRect,
      abW      = Math.abs(abRect[0] - abRect[2]),
      abH      = Math.abs(abRect[1] - abRect[3]),

      rectToAb = d.pathItems.rectangle(abRect[1], abRect[0], abW, abH);

  d.selectObjectsOnActiveArtboard();
  // executeMenuCommand('group');
  executeMenuCommand('makeMask');

  return rectToAb;
}
