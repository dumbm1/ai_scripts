/**
 * .jsx for Adobe apps. Marat Shagiev. Date: 04.10.2014, Time: 2:41
 */

function makeRandStr() {
  return ("@" + (+new Date()) * Math.random() * 10000).slice(-7, -1);
}