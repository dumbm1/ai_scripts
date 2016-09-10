/**
 * jsx for Ai. Marat Shagiev: m_js@bk.ru. 25.06.2016 22:15.
 */


var colOut = [1, 2, 3, 4, 5, 1, 2, 3, 1, 2, 3];

var colOutNew = _renDupl (colOut);

colOutNew;

function _renDupl (colOut) {
  for (var i = 0; i < colOut.length; i++) {
    var current   = colOut[i];
    var duplIndex = 2;
    for (var k = i+1; k < colOut.length; k++) {
      var remains = colOut[k];
      if (current == remains) {
        colOut[k] += '#' + duplIndex;
        duplIndex++;
      }
    }
    duplIndex = 2;
  }
  return colOut;
}
