/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 02.06.2016
 *
 * the sample script to
 * make the guides-rectangle in order of size of the selection[0]
 * exclude the masks calculation
 * 
 * masks calculation support needs include the library getSelBoundsExtend function
 */

(function addGuideBySelRect () {

  if (!documents.length) return;
  if (!selection.length) return;

  var doc = activeDocument,
      lay = doc.activeLayer,
      sel = selection[0],
      rect;

  rect        = lay.pathItems.rectangle (sel.top, sel.left, sel.width, sel.height)
  rect.guides = true;

} ());
