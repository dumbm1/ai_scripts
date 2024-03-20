/**
 * .jsx for Adobe apps. Marat Shagiev. Date: 04.10.2014, Time: 2:41
 */
/**
 * random string generator
 *
 * @param {Number} n - required sting length; 1 <= n <= 17; default value is 8
 * @return {String} str - random n-characters string
 * */
function randStr(numb) {
  var n = numb;

  if (isNaN(parseFloat(n)) || !isFinite(n)) n = 8;
  if (!arguments.length) n = 8;
  if (n > 17) n = 17;
  if (n < 1) n = 1;

  var str = ((+new Date()) * Math.random() *
    1e7 + // shift (delete) decimal point
    new Array(n).join('0') // for the case when random input-number is 0
  ).slice(0, n);

  return str;
}
