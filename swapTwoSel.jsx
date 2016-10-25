/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 25.10.2016.
 *
 * swap position of two first selected element
 */
(function swapTwoSel () {
  var pos0              = selection[0].position;
  var pos1              = selection[1].position;
  selection[0].position = pos1;
  selection[1].position = pos0;
} ());
