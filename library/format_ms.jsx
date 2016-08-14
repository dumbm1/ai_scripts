/**
 * ai.jsx ©MaratShagiev m_js@bk.ru 19.08.2015
 * */
var n  = 86399999,  // 23:59:59:999
    n2 = 10055;     // 00:00:10:055

alert ( format_ms ( n2 ) + '\n' + format_ms_2 ( n2 ) );

function format_ms ( millisec ) {

  var date       = new Date ( millisec ),
      formatDate =
        ('00' + date.getUTCHours ()).slice ( -2 ) + ':' +
        ('00' + date.getMinutes ()).slice ( -2 ) + ':' +
        ('00' + date.getSeconds ()).slice ( -2 ) + ':' +
        ('000' + date.getMilliseconds ()).slice ( -3 );

  return formatDate;
}

function format_ms_2 ( n ) {

  var ms = Math.floor ( n % 1000 ),
      ss = Math.floor ( (n / 1000) % 60 ),
      mm = Math.floor ( (n / (1000 * 60 ) ) % 60 ),
      hh = Math.floor ( (n / (1000 * 60 * 60 ) ) % 24 );

  return ('00' + hh).slice ( -2 ) + ':' +
    ('00' + mm).slice ( -2 ) + ':' +
    ('00' + ss).slice ( -2 ) + ':' +
    ('000' + ms).slice ( -3 );
}

