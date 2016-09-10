/**
 * ai.jsx ©MaratShagiev m_js@bk.ru 25.03.2016 18:49
 */

function getTarget (targ) {
  var targets_all = BridgeTalk.getTargets('-100000');
  var targets     = [];

  if (!targets_all.length) throw new Error ('Adobe message enabled apps is missing')

  for (var i = 0; i < targets_all.length; i++) {
    var obj = targets_all[i];
    if (obj.match(targ)) {
      targets.push(obj);
    }
  }

  if (!targets.length) throw new Error (targ + ' application is missing');

  for (var i = 0; i < targets.length; i++) {
    if (BridgeTalk.isRunning(targets[i])) {
      return targets[i];
    }
  }
  return targets[/*targets.length - 1*/ 0];
}