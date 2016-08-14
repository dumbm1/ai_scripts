/**
 * .jsx for Adobe apps. Marat Shagiev. Date: 09.12.2014, Time: 1:17
 */

function floorMath(x) { return Math.floor(x); }
function floorXor(x) { return x^0; }

function bench(f) {
  var date = new Date();
  for (var i=0.5; i<100000; i++) f(i);
  return new Date() - date;
}

var timeMath = 0, timeXor = 0;
for(var i=0; i<100; i++) {
  timeMath += bench(floorMath);
  timeXor += bench(floorXor);
}

alert('Время floorMath: ' + timeMath + 'мс');
alert('Время floorXor: ' +timeXor + 'мс');