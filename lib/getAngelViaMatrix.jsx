

function getAngle(item) {
  var m = item.matrix;
  var mA = m.mValueA;
  var mB = m.mValueB;
  var mC = m.mValueC;
  var angle = 0;

  if (mB !== mC) {
    var shift = 0;
    if (mA < 0) shift = __sign(mB) * 180;
    angle += Math.atan(mB / mA) * 180 / Math.PI + shift;
    if (angle < -180) {
      angle += 360;
    } else if (angle > 180) angle += -360;
  }

  return +angle.toFixed(1);

  function __sign(number) {
    return (number) ? ((number < 0) ? -1 : 1) : 0;
  }
}