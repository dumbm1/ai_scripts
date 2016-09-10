/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 10.09.2016
 */

function clearConsole () {
  var bt    = new BridgeTalk ();
  bt.target = 'estoolkit';
  bt.body   = 'app.clc();';
  bt.send ();
}