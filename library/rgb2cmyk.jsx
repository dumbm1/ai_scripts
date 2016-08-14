/**
 * ai.jsx ©MaratShagiev m_js@bk.ru 24.05.2015
 */

/* Ïðîâåðêà:
 var col = ($.colorPicker().toString(16));
 col = ("000000" + col).slice(-6);


 var red = (parseInt("0x" + col.slice(0,2)));
 var green = (parseInt("0x" + col.slice(-4,-2)));
 var blue = (parseInt("0x" + col.slice(-2)));

 alert ( rgb2cmyk ( red, green, blue ) );*/

function rgb2cmyk ( r, g, b ) {
  var computedC = 0;
  var computedM = 0;
  var computedY = 0;
  var computedK = 0;

  //remove spaces from input RGB values, convert to int
  var r = parseInt ( ('' + r).replace ( /\s/g, '' ), 10 );
  var g = parseInt ( ('' + g).replace ( /\s/g, '' ), 10 );
  var b = parseInt ( ('' + b).replace ( /\s/g, '' ), 10 );

  if ( r == null || g == null || b == null ||
    isNaN ( r ) || isNaN ( g ) || isNaN ( b ) ) {
    alert ( 'Please enter numeric RGB values!' );
    return;
  }
  if ( r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255 ) {
    alert ( 'RGB values must be in the range 0 to 255.' );
    return;
  }

  // BLACK
  if ( r == 0 && g == 0 && b == 0 ) {
    computedK = 1;
    return [ 0, 0, 0, 1 ];
  }

  computedC = 1 - (r / 255);
  computedM = 1 - (g / 255);
  computedY = 1 - (b / 255);

  var minCMY = Math.min ( computedC,
                          Math.min ( computedM, computedY ) );
  computedC = (computedC - minCMY) / (1 - minCMY);
  computedM = (computedM - minCMY) / (1 - minCMY);
  computedY = (computedY - minCMY) / (1 - minCMY);
  computedK = minCMY;

  return [ computedC, computedM, computedY, computedK ];
}

/**
 * Simple variant
 * */
function rgb2cmyk_simple ( R, G, B ) {
  if ( (R == 0) && (G == 0) && (B == 0) ) {
    return [ 0, 0, 0, 1 ];
  } else {
    var calcR = 1 - (R / 255),
        calcG = 1 - (G / 255),
        calcB = 1 - (B / 255);

    var K = Math.min ( calcR, Math.min ( calcG, calcB ) ),
        C = (calcR - K) / (1 - K),
        M = (calcG - K) / (1 - K),
        Y = (calcB - K) / (1 - K);

    return [ C, M, Y, K ];
  }
}