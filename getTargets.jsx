/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 04.03.2016.
 *
 * getTargets_v0.2
 */

//@target illustrator

(function getTargets () {
  var targets      = BridgeTalk.getTargets ('-100000');
  var target_ai    = [];
  var target_psd   = [];
  var target_indd  = [];
  var out_str_ai   = '';
  var out_str_psd  = '';
  var out_str_indd = '';

  for (var i = 0; i < targets.length; i++) {
    var obj = targets[i];
    if (obj.match ('illustrator')) {
      target_ai.push (obj);
    }
  }
  for (var i = 0; i < targets.length; i++) {
    var obj = targets[i];
    if (obj.match ('photoshop')) {
      target_psd.push (obj);
    }
  }
  for (var i = 0; i < targets.length; i++) {
    var obj = targets[i];
    if (obj.match ('indesign')) {
      target_indd.push (obj);
    }
  }

  for (var j = 0; j < target_ai.length; j++) {
    var targ = target_ai[j];
    out_str_ai += targ + ':' + BridgeTalk.isRunning (targ) + '\n';
  }

  for (var j = 0; j < target_psd.length; j++) {
    var targ = target_psd[j];
    out_str_psd += targ + ':' + BridgeTalk.isRunning (targ) + '\n';
  }
  for (var j = 0; j < target_indd.length; j++) {
    var targ = target_indd[j];
    out_str_indd += targ + ':' + BridgeTalk.isRunning (targ) + '\n';
  }

  var bt    = new BridgeTalk ();
  // bt.target = target_ai[target_ai.length - 1];
  bt.target = target_ai[0];
  bt.body = 'app.open()';
  bt.send ();

  function scroll_window (input, title) {
    title = title || 'Scrollable alert';
    if (input instanceof Array) {
      input = input.join ("\r");
    }
    var w                   = new Window ("dialog", title);
    var list                = w.add ("edittext", undefined, input, {multiline: true, scrolling: true});
    list.maximumSize.height = w.maximumSize.height - 100;
    list.minimumSize.width  = 600;
    w.add ("button", undefined, "Уходим", {name: "ok"});
    w.show ();
  }
} ());
