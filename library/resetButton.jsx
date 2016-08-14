/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 27.02.2016.
 */

resetBtn.onClick = function () {
  if (new File ($.fileName).exists) {
    w.close();
    $.evalFile (new File ($.fileName));
  } else {
    w.close();
    w = makeDialog (name);
  }
}