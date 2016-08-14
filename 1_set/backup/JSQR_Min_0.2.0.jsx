////@target illustrator
make_jsqr_ai();
/**
 * JSQR - JavaScript Quick Response Code Encoder Library v0.2
 * http://jsqr.de/

 Copyright 2011, Jens Duttke
 Dual licensed under the MIT or GPL Version 2 licenses.
 http://jsqr.de/license

 Date: 2011-09-29
 */
function JSQRLib() {
  var w = {};
  var A = 'JSQR';
  w[A] = function () {
  };
  w[A].prototype.encode = function (a, b) {
    return new w[A].prototype.Matrix(a, b)
  };
  w[A].prototype.Input = function (b, c) {
    if (typeof(b) !== 'undefined') {
      if (!isEnumValue(this.DATA_TYPE, b)) {
        throw new TypeError('Unsupported dataType.');
      }
    } else {
      b = this.DATA_TYPE.DEFAULT
    }
    try {
      Object.defineProperty(this, 'dataType', {configurable: false, writeable: true, get: function () {
        return b
      }, set: function (a) {
        if (isEnumValue(this.DATA_TYPE, a)) {
          b = a
        } else {
          throw new TypeError('Unsupported dataType.');
        }
      }})
    } catch (e) {
      this.dataType = b
    }
    if (typeof(c) === 'object') {
      this.data = copyObject(c)
    } else {
      this.data = c
    }
  };
  w[A].prototype.Input.prototype.DATA_TYPE = {DEFAULT: 0, TEXT: 0, URL: 1, BOOKMARK: 2, CALL: 3, SMS: 4, EMAIL: 5, VCARD: 6, MECARD: 7, VEVENT: 8, GOOGLE_MAPS: 9, BING_MAPS: 10, GEO: 11, ITUNES: 12, ITUNES_REVIEW: 13, ANDROID_MARKET: 14, FACEBOOK_USER_PROFILE: 15, FOURSQUARE: 16, TWEET_FETCH: 17, TWEET: 18, BLACKBERRY_MESSENGER_USER: 19, ANDROID_WIFI: 20, WIKIPEDIA: 21, YOUTUBE_USER: 22, YOUTUBE_VIDEO: 23};
  w[A].prototype.DATA_TYPE = w[A].prototype.Input.prototype.DATA_TYPE;
  w[A].prototype.Input.prototype.toString = function () {
    var d = this, str, tmp, replaceObj;
    switch (this.dataType) {
      case this.DATA_TYPE.DEFAULT:
      case this.DATA_TYPE.TEXT:
        if (typeof(this.data) === 'object') {
          validateType('data.text', 'string', 'number');
          validateRequired('data.text');
          return dataStr('text')
        } else {
          validateType('data', 'string', 'number');
          validateRequired('data');
          return dataStr()
        }
      case this.DATA_TYPE.URL:
        switch (typeof(this.data)) {
          case'string':
            validateRequired('data');
            return(/^[a-zA-Z]+:\/\//.test(dataStr()) ? '' : 'http://') + dataStr();
          case'object':
            validateType('data.url', 'string');
            validateRequired('data.url');
            return(/^[a-zA-Z]+:\/\//.test(dataStr('url')) ? '' : 'http://') + dataStr('url');
          default:
            throw new TypeError('Unexcepted type of data.url (string).');
        }
      case this.DATA_TYPE.BOOKMARK:
        validateType('data', 'object');
        validateType('data.title', 'string', 'number');
        validateType('data.url', 'string');
        validateRequired('data.title', 'data.url');
        return'MEBKM:TITLE:' + dataStr('title') + ';URL:' + (/^[a-zA-Z]+:\/\//.test(dataStr('url')) ? '' : 'http://') + dataStr('url');
      case this.DATA_TYPE.CALL:
        switch (typeof(this.data)) {
          case'string':
          case'number':
            validateRequired('data');
            return'TEL:' + dataStr();
          case'object':
            switch (typeof(this.data.phoneNumber)) {
              case'string':
              case'number':
                validateRequired('data.phoneNumber');
                return'TEL:' + dataStr('phoneNumber');
              default:
                throw new TypeError('Unexcepted type of data (string|number).');
            }
          default:
            throw new TypeError('Unexcepted type of data.phoneNumber (string|number).');
        }
      case this.DATA_TYPE.SMS:
        validateType('data', 'object');
        validateType('data.phoneNumber', 'string', 'number');
        validateType('data.message', 'string', 'number');
        validateRequired('data.phoneNumber');
        return'SMSTO:' + dataStr('phoneNumber') + ':' + dataStr('message');
      case this.DATA_TYPE.EMAIL:
        validateType('data', 'object');
        validateType('data.recipient', 'string');
        validateType('data.subject', 'string');
        validateType('data.body', 'string');
        validateRequired('data.recipient');
        return'SMTP:' + dataStr('recipient').replace(':', '') + ':' + dataStr('subject').replace(/:/g, '\\:') + ':' + dataStr('body');
      case this.DATA_TYPE.VCARD:
        validateType('data', 'object');
        validateType('data.version', 'string', 'number');
        validateType('data.type', 'string');
        validateType('data.firstName', 'string', 'number');
        validateType('data.middleName', 'string', 'number');
        validateType('data.lastName', 'string', 'number');
        validateType('data.organization', 'string', 'number');
        validateType('data.title', 'string', 'number');
        validateType('data.mobilePhone', 'string', 'number');
        validateType('data.work', 'object');
        validateType('data.work.street', 'string', 'number');
        validateType('data.work.city', 'string');
        validateType('data.work.zip', 'string', 'number');
        validateType('data.work.state', 'string');
        validateType('data.work.country', 'string');
        validateType('data.work.phone', 'string', 'number');
        validateType('data.work.fax', 'string', 'number');
        validateType('data.work.eMail', 'string');
        validateType('data.work.url', 'string');
        validateType('data.home', 'object');
        validateType('data.home.street', 'string', 'number');
        validateType('data.home.city', 'string', 'number');
        validateType('data.home.zip', 'string', 'number');
        validateType('data.home.state', 'string', 'number');
        validateType('data.home.country', 'string');
        validateType('data.home.phone', 'string', 'number');
        validateType('data.home.eMail', 'string');
        validateType('data.home.url', 'string');
        validateType('data.birthday', Date, null);
        validateRequired('data.version', 'data.type');
        replaceObj = {'\\': '\\\\', ';': '\\;', ',': '\\,', '\n': '\\n'};
        str = [];
        switch (parseFloat(dataStr('version'))) {
          case 2.1:
            str[0] = '2.1';
            break;
          case 3:
            str[0] = '3.0';
            break;
          default:
            throw new Error('Unsupported VCARD.version (' + dataStr('version') + ').');
        }
        switch (dataStr('type').toLowerCase()) {
          case'person':
            str[1] = (dataStr('firstName').length > 0 || dataStr('middleName').length > 0 || dataStr('lastName').length > 0 ? 'FN:' + (translateChars(dataStr('firstName'), replaceObj) + ' ' + translateChars(dataStr('middleName'), replaceObj) + ' ' + translateChars(dataStr('lastName'), replaceObj)).replace(/\s{2,}/g, ' ').replace(/^\s+|\s+$/g, '') + '\n' : '') + (dataStr('organization').length > 0 ? 'ORG:' + translateChars(dataStr('organization'), replaceObj) + '\n' : '');
            break;
          case'company':
            str[1] = (dataStr('organization').length > 0 ? 'ORG:' + translateChars(dataStr('organization'), replaceObj) + '\n' : '') + (dataStr('organization').length > 0 ? 'FN:' + translateChars(dataStr('organization'), replaceObj) + '\n' : '') + 'X-ABShowAs:COMPANY\n';
            break;
          default:
            throw new Error('Unsupported VCARD.type (' + dataStr('type') + ').');
        }
        return'BEGIN:VCARD\n' + 'VERSION:' + str[0] + '\n' + (dataStr('lastName').length > 0 || dataStr('firstName').length > 0 || dataStr('middleName').length > 0 ? 'N:' + translateChars(dataStr('lastName'), replaceObj) + ';' + translateChars(dataStr('firstName'), replaceObj) + ';' + translateChars(dataStr('middleName'), replaceObj) + ';;\n' : '') + str[1] + (dataStr('title').length > 0 ? 'TITLE:' + translateChars(dataStr('title'), replaceObj) + '\n' : '') + (data('work') && dataStr('work.eMail').length > 0 ? 'EMAIL;' + (str[0] === '3.0' ? 'type=INTERNET;type=' : 'INTERNET;') + 'WORK:' + translateChars(dataStr('work.eMail'), replaceObj) + '\n' : '') + (data('home') && dataStr('home.eMail').length > 0 ? 'EMAIL;' + (str[0] === '3.0' ? 'type=INTERNET;type=' : 'INTERNET;') + 'HOME:' + translateChars(dataStr('home.eMail'), replaceObj) + '\n' : '') + (dataStr('mobilePhone').length > 0 ? 'TEL;' + (str[0] === '3.0' ? 'type=' : '') + 'CELL:' + translateChars(dataStr('mobilePhone'), replaceObj) + '\n' : '') + (data('work') && dataStr('work.phone').length > 0 ? 'TEL;' + (str[0] === '3.0' ? 'type=' : '') + 'WORK:' + translateChars(dataStr('work.phone'), replaceObj) + '\n' : '') + (data('home') && dataStr('home.phone').length > 0 ? 'TEL;' + (str[0] === '3.0' ? 'type=' : '') + 'HOME:' + translateChars(dataStr('home.phone'), replaceObj) + '\n' : '') + (data('work') && dataStr('work.fax').length > 0 ? 'TEL;' + (str[0] === '3.0' ? 'type=WORK,' : 'WORK;') + 'FAX:' + translateChars(dataStr('work.fax'), replaceObj) + '\n' : '') + (data('work') && (dataStr('work.street').length > 0 || dataStr('work.city').length > 0 || dataStr('work.state').length > 0 || dataStr('work.zip').length > 0 || dataStr('work.country').length > 0) ? 'ADR;' + (str[0] === '3.0' ? 'type=' : '') + 'WORK:;;' + translateChars(dataStr('work.street'), replaceObj) + ';' + translateChars(dataStr('work.city'), replaceObj) + ';' + translateChars(dataStr('work.state'), replaceObj) + ';' + translateChars(dataStr('work.zip'), replaceObj) + ';' + translateChars(dataStr('work.country'), replaceObj) + '\n' : '') + (data('home') && (dataStr('home.street').length > 0 || dataStr('home.city').length > 0 || dataStr('home.state').length > 0 || dataStr('home.zip').length > 0 || dataStr('home.country').length > 0) ? 'ADR;' + (str[0] === '3.0' ? 'type=' : '') + 'HOME:;;' + translateChars(dataStr('home.street'), replaceObj) + ';' + translateChars(dataStr('home.city'), replaceObj) + ';' + translateChars(dataStr('home.state'), replaceObj) + ';' + translateChars(dataStr('home.zip'), replaceObj) + ';' + translateChars(dataStr('home.country'), replaceObj) + '\n' : '') + (data('birthday') && data('birthday') !== null ? 'BDAY;value=date:' + data('birthday').getFullYear() + ('0' + (data('birthday').getMonth() + 1)).substr(-2) + ('0' + data('birthday').getDate()).substr(-2) + ';' : '') + (data('work') && dataStr('work.url').length > 0 ? 'URL;' + (str[0] === '3.0' ? 'type=' : '') + 'WORK:' + translateChars(dataStr('work.url'), replaceObj) + '\n' : '') + (data('home') && dataStr('home.url').length > 0 ? 'URL;' + (str[0] === '3.0' ? 'type=' : '') + 'HOME:' + translateChars(dataStr('home.url'), replaceObj) + '\n' : '') + 'END:VCARD';
      case this.DATA_TYPE.MECARD:
        validateType('data', 'object');
        validateType('data.firstName', 'string', 'number');
        validateType('data.lastName', 'string', 'number');
        validateType('data.eMail', 'string');
        validateType('data.phoneNumber', 'string', 'number');
        validateType('data.videoCall', 'string', 'number');
        validateType('data.birthday', Date, null);
        validateType('data.poBox', 'string', 'number');
        validateType('data.room', 'string', 'number');
        validateType('data.street', 'string', 'number');
        validateType('data.city', 'string');
        validateType('data.state', 'string');
        validateType('data.zip', 'string', 'number');
        validateType('data.country', 'string');
        validateType('data.url', 'string', 'number');
        validateType('data.memo', 'string', 'number');
        replaceObj = {'\\': '\\\\', ':': '\\:', ';': '\\;', ',': '\\,'};
        return'MECARD:' + (dataStr('lastName').length > 0 || dataStr('firstName') > 0 ? 'N:' + translateChars(dataStr('lastName'), replaceObj) + (dataStr('firstName').length > 0 ? ',' + translateChars(dataStr('firstName'), replaceObj) : '') + ';' : '') + (dataStr('phoneNumber').length > 0 ? 'TEL:' + translateChars(dataStr('phoneNumber'), replaceObj) + ';' : '') + (dataStr('videoCall').length > 0 ? 'TEL-AV:' + translateChars(dataStr('videoCall'), replaceObj) + ';' : '') + (dataStr('eMail').length > 0 ? 'EMAIL:' + translateChars(dataStr('eMail'), replaceObj) + ';' : '') + (dataStr('url').length > 0 ? 'URL:' + translateChars(dataStr('url'), replaceObj) + ';' : '') + (dataStr('memo').length > 0 ? 'NOTE:' + translateChars(dataStr('memo'), replaceObj) + ';' : '') + (data('birthday') && data('birthday') !== null ? 'BDAY:' + data('birthday').getFullYear() + ('0' + (data('birthday').getMonth() + 1)).substr(-2) + ('0' + data('birthday').getDate()).substr(-2) + ';' : '') + (dataStr('street').length > 0 ? 'ADR:' + translateChars(dataStr('poBox'), replaceObj) + ',' + translateChars(dataStr('room'), replaceObj) + ',' + translateChars(dataStr('street'), replaceObj) + ',' + translateChars(dataStr('city'), replaceObj) + ',' + translateChars(dataStr('state'), replaceObj) + ',' + translateChars(dataStr('zip'), replaceObj) + ',' + translateChars(dataStr('country'), replaceObj) + ';' : '') + ';';
      case this.DATA_TYPE.VEVENT:
        validateType('data', 'object');
        validateType('data.format', 'string');
        validateType('data.summary', 'string', 'number');
        validateType('data.description', 'string', 'number');
        validateType('data.locationName', 'string', 'number');
        validateType('data.fullDay', 'boolean');
        validateType('data.startDate', Date);
        validateType('data.endDate', Date);
        validateRequired('data.format', 'data.summary', 'data.fullDay', 'data.startDate', 'data.endDate');
        if (Date.parse(dataStr('startDate')) > Date.parse(dataStr('endDate'))) {
          throw new RangeError('VEVENT.startDate must be older than VEVENT.endDate.');
        }
        replaceObj = {'\\': '\\\\', ';': '\\;', ',': '\\,', '\n': '\\n'};
        str = 'BEGIN:VEVENT\n' + 'SUMMARY:' + translateChars(dataStr('summary'), replaceObj) + '\n' + (dataStr('description').length > 0 ? 'DESCRIPTION:' + translateChars(dataStr('description'), replaceObj) + '\n' : '') + (dataStr('locationName').length > 0 ? 'LOCATION:' + translateChars(dataStr('locationName'), replaceObj) + '\n' : '') + 'DTSTART:' + data('startDate').getFullYear() + ('0' + (data('startDate').getMonth() + 1)).substr(-2) + ('0' + data('startDate').getDate()).substr(-2) + (!data('fullDay') ? 'T' + ('0' + data('startDate').getHours()).substr(-2) + ('0' + data('startDate').getMinutes()).substr(-2) + ('0' + data('startDate').getSeconds()).substr(-2) : '') + '\n' + 'DTEND:' + data('endDate').getFullYear() + ('0' + (data('endDate').getMonth() + 1)).substr(-2) + ('0' + data('endDate').getDate()).substr(-2) + (!data('fullDay') ? 'T' + ('0' + data('endDate').getHours()).substr(-2) + ('0' + data('endDate').getMinutes()).substr(-2) + ('0' + data('endDate').getSeconds()).substr(-2) : '') + '\n' + 'END:VEVENT';
        switch (dataStr('format').toLowerCase()) {
          case'icalendar':
            return'BEGIN:VCALENDAR\n' + 'VERSION:2.0\n' + str + '\n' + 'END:VCALENDAR';
          case'zxing':
            return str;
          default:
            throw new Error('Unsupported VEVENT.format (' + dataStr('format') + ').');
        }
      case this.DATA_TYPE.GOOGLE_MAPS:
        validateType('data', 'object');
        validateType('data.locationName', 'string');
        validateType('data.longitude', 'string', 'number');
        validateType('data.latitude', 'string', 'number');
        validateRequired('data.longitude', 'data.latitude');
        return'http://maps.google.com/maps?f=q&q=' + dataStr('latitude') + '%2C' + dataStr('longitude') + '+%28' + encodeURIComponent(dataStr('locationName')) + '%29';
      case this.DATA_TYPE.BING_MAPS:
        validateType('data', 'object');
        validateType('data.longitude', 'string', 'number');
        validateType('data.latitude', 'string', 'number');
        validateRequired('data.longitude', 'data.latitude');
        return'http://www.bing.com/maps/?v=2&cp=' + dataStr('latitude') + '~' + dataStr('longitude') + '&lvl=16&dir=0&sty=r';
      case this.DATA_TYPE.GEO:
        validateType('data', 'object');
        validateType('data.longitude', 'string', 'number');
        validateType('data.latitude', 'string', 'number');
        validateRequired('data.longitude', 'data.latitude');
        return'GEO:' + dataStr('latitude') + ',' + dataStr('longitude');
      case this.DATA_TYPE.ITUNES:
        if (typeof(this.data) === 'object') {
          validateType('data.appId', 'string', 'number');
          validateRequired('data.appId');
          str = dataStr('appId')
        } else {
          validateType('data', 'string', 'number');
          validateRequired('data');
          str = dataStr()
        }
        if (!(/\d+$/).test(str)) {
          throw new Error('Invalid ITUNES.appId. The id must be numeric.');
        }
        return'http://itunes.apple.com/app/id' + (/\d+$/).exec(str)[0];
      case this.DATA_TYPE.ITUNES_REVIEW:
        if (typeof(this.data) === 'object') {
          validateType('data.appId', 'string', 'number');
          validateRequired('data.appId');
          str = dataStr('appId')
        } else {
          validateType('data', 'string', 'number');
          validateRequired('data');
          str = dataStr()
        }
        if (!(/\d+$/).test(str)) {
          throw new Error('Invalid ITUNES.appId. The id must be numeric.');
        }
        return'itms-apps://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=' + (/\d+$/).exec(str)[0];
      case this.DATA_TYPE.ANDROID_MARKET:
        validateType('data', 'object');
        validateType('data.searchType', 'string');
        validateType('data.linkType', 'string');
        validateType('data.search', 'string', 'number');
        validateRequired('data.searchType', 'data.linkType', 'data.search');
        switch (dataStr('linkType').toLowerCase()) {
          case'market':
            str = 'market://';
            break;
          case'website':
            str = 'http://market.android.com/';
            break;
          default:
            throw new Error('Unsupported ANDROID_MARKET.linkType (' + dataStr('linkType') + ').');
        }
        switch (dataStr('searchType').toLowerCase()) {
          case'raw':
            return str + 'search?q=' + encodeURIComponent(dataStr('search'));
          case'package':
            return str + 'search?q=pname%3A' + encodeURIComponent(dataStr('search'));
          case'publisher':
            return str + 'search?q=pub%3A' + encodeURIComponent(dataStr('search'));
          case'details':
            return str + 'details?id=' + encodeURIComponent(dataStr('search'));
          default:
            throw new Error('Unsupported ANDROID_MARKET.searchType (' + dataStr('searchType') + ').');
        }
      case this.DATA_TYPE.FACEBOOK_USER_PROFILE:
        if (typeof(this.data) === 'object') {
          validateType('data.profileId', 'string', 'number');
          validateRequired('data.profileId');
          str = dataStr('profileId')
        } else {
          validateType('data', 'string', 'number');
          validateRequired('data');
          str = dataStr()
        }
        if ((/^\d{15}$/).test(str)) {
          return'fb://profile/' + str
        } else if ((/(\/profile\/|(\?|&)id=)(\d{15})(%26|&|$)/).test(str)) {
          return'fb://profile/' + (/(\/profile\/|(\?|&)id=)(\d{15})(%26|&|$)/).exec(str)[3]
        }
        throw new Error('Invalid FACEBOOK_USER_PROFILE.videoId. The id must be numeric, 15 characters in length.');
      case this.DATA_TYPE.FOURSQUARE:
        if (typeof(this.data) === 'object') {
          validateType('data.venueId', 'string', 'number');
          validateRequired('data.venueId');
          str = dataStr('venueId')
        } else {
          validateType('data', 'string', 'number');
          validateRequired('data');
          str = dataStr()
        }
        if (!(/\d+$/).test(str)) {
          throw new Error('Invalid FOURSQUARE.venueId. The id must be numeric.');
        }
        return'http://foursquare.com/venue/' + (/\d+$/).exec(str)[0];
      case this.DATA_TYPE.WIKIPEDIA:
        if (typeof(this.data) === 'object') {
          validateType('data.url', 'string', 'number');
          validateRequired('data.url');
          str = dataStr('url')
        } else {
          validateType('data', 'string', 'number');
          validateRequired('data');
          str = dataStr()
        }
        replaceObj = {' ': '_'};
        tmp = (/\/\/([a-z\-]*)\.?wikipedia.org\/wiki\/(.*)/i).exec(str);
        if (tmp === null || tmp.length !== 3) {
          return'http://qrwp.org/' + translateChars(str, replaceObj)
        } else {
          return'http://' + (tmp[1].length > 0 ? tmp[1] + '.' : '') + 'qrwp.org/' + translateChars(tmp[2], replaceObj)
        }
      case this.DATA_TYPE.YOUTUBE_USER:
        if (typeof(this.data) === 'object') {
          validateType('data.userName', 'string', 'number');
          validateRequired('data.userName');
          str = dataStr('userName')
        } else {
          validateType('data', 'string', 'number');
          validateRequired('data');
          str = dataStr()
        }
        return'http://youtube.com/user/' + str;
      case this.DATA_TYPE.YOUTUBE_VIDEO:
        if (typeof(this.data) === 'object') {
          validateType('data.videoId', 'string', 'number');
          validateRequired('data.videoId');
          str = dataStr('videoId')
        } else {
          validateType('data', 'string', 'number');
          validateRequired('data');
          str = dataStr()
        }
        if ((/^[-_A-Za-z0-9]+$/).test(str)) {
          return'youtube://' + str
        } else if ((/(youtu.be\/|(\?|&)v=|\/v\/)([-_A-Za-z0-9]+)(%26|&|$)/).test(str)) {
          return'youtube://' + (/(youtu.be\/|(\?|&)v=|\/v\/)([-_A-Za-z0-9]+)(%26|&|$)/).exec(str)[3]
        }
        throw new Error('Invalid YOUTUBE.videoId. The id must be alphanumeric.');
      case this.DATA_TYPE.TWEET_FETCH:
        throw new Error('DATA_TYPE.TWEET_FETCH is currently unsupported.');
      case this.DATA_TYPE.TWEET:
        if (typeof(this.data) === 'object') {
          validateType('data.text', 'string', 'number');
          validateRequired('data.text');
          return'http://twitter.com/home?status=' + encodeURIComponent(dataStr('text'))
        } else {
          validateType('data', 'string', 'number');
          validateRequired('data');
          return'http://twitter.com/home?status=' + encodeURIComponent(dataStr())
        }
      case this.DATA_TYPE.BLACKBERRY_MESSENGER_USER:
        validateType('data', 'object');
        validateType('data.firstName', 'string');
        validateType('data.lastName', 'string');
        validateType('data.bbmPin', 'string');
        validateRequired('data.bbmPin');
        if (!(/^[A-Za-z0-9]{8}$/).test(dataStr('bbmPin'))) {
          throw new Error('Invalid BLACKBERRY_MESSENGER_USER.bbmPin. The pin must be alphanumeric, eight characters in length.');
        }
        return'bbm:' + dataStr('bbmPin') + '00000000' + dataStr('firstName') + ' ' + dataStr('lastName');
      case this.DATA_TYPE.ANDROID_WIFI:
        validateType('data', 'object');
        validateType('data.ssid', 'string');
        validateType('data.password', 'string', 'number');
        validateType('data.networkType', 'string');
        validateRequired('data.ssid', 'data.networkType');
        return'WIFI:S:' + dataStr('ssid') + ';T:' + dataStr('networkType') + (dataStr('password').length > 0 ? ';P:' + dataStr('password') : '') + ';;';
      default:
        throw new TypeError('Unsupported dataType.');
    }
    function data(a) {
      var b = d.data;
      if (typeof(a) === 'string') {
        var c = a.split('.'), i;
        for (i = 0; i < c.length; i++) {
          b = b[c[i]]
        }
      }
      return b
    }

    function dataStr(a) {
      var b = data(a);
      return(typeof(b) === 'undefined' ? '' : b.toString())
    }

    function translateChars(a, b) {
      for (var r in b) {
        a = a.replace(r, b[r], 'g')
      }
      return a
    }

    function validateType() {
      var a = arguments[0].split('.'), prop = d, i;
      for (i = 0; i < a.length; i++) {
        prop = prop[a[i]]
      }
      for (i = 1; i < arguments.length; i++) {
        if ((typeof(prop) === 'object' && typeof(arguments[i]) === 'function' && prop !== null && prop.constructor === arguments[i]) || (prop === null && arguments[i] === null) || (typeof(prop) === arguments[i])) {
          return true
        }
        if (typeof(arguments[i]) === 'function') {
          arguments[i] = arguments[i].name
        }
      }
      if (typeof(prop) === 'undefined') {
        throw new TypeError(arguments[0] + ' is undefined.');
      } else {
        throw new TypeError('Unexcepted type (' + typeof(prop) + ') of ' + arguments[0] + ' (' + [].slice.call(arguments, 1).join('|') + ').');
      }
    }

    function validateRequired() {
      var a, prop, i, j;
      for (i = 0; i < arguments.length; i++) {
        a = arguments[i].split('.');
        prop = d;
        for (j = 0; j < a.length; j++) {
          prop = prop[a[j]]
        }
        if (typeof(prop) === 'string' && prop.length === 0) {
          throw new Error('Required: ' + arguments[i]);
        }
      }
    }

    return''
  };
  w[A].prototype.Code = function (b, c, d) {
    if (typeof(b) === 'object' && typeof(c) === 'undefined' && typeof(d) === 'undefined') {
      d = b.errorCorrection;
      c = b.version;
      b = b.encodeMode
    }
    if (typeof(b) !== 'undefined') {
      if (!isEnumValue(this.ENCODE_MODE, b)) {
        throw new TypeError('Unsupported encodeMode.');
      }
    } else {
      b = this.ENCODE_MODE.UTF8
    }
    try {
      Object.defineProperty(this, 'encodeMode', {configurable: false, writeable: true, get: function () {
        return b
      }, set: function (a) {
        if (isEnumValue(this.ENCODE_MODE, a)) {
          b = a
        } else {
          throw new TypeError('Unsupported encodeMode.');
        }
      }})
    } catch (e) {
      this.encodeMode = b
    }
    if (typeof(c) !== 'undefined') {
      if (typeof(c) !== 'number') {
        throw new TypeError('Invalid version type.');
      } else if (c < -40 || c > 40) {
        throw new RangeError('Invalid version value.');
      }
    } else {
      c = this.DEFAULT
    }
    try {
      Object.defineProperty(this, 'version', {configurable: false, writeable: true, get: function () {
        return c
      }, set: function (a) {
        if (typeof(a) !== 'number') {
          throw new TypeError('Invalid version type.');
        } else if (a < -40 || a > 40) {
          throw new RangeError('Invalid version value.');
        } else {
          c = a;
        }
      }})
    } catch (e) {
      this.version = c
    }
    if (typeof(d) !== 'undefined') {
      if (!isEnumValue(this.ERROR_CORRECTION, d)) {
        throw new TypeError('Invalid errorCorrection.');
      }
    } else {
      d = this.ERROR_CORRECTION.M
    }
    try {
      Object.defineProperty(this, 'errorCorrection', {configurable: false, writeable: true, get: function () {
        return d
      }, set: function (a) {
        if (isEnumValue(this.ERROR_CORRECTION, a)) {
          d = a
        } else {
          throw new TypeError('Invalid errorCorrection.');
        }
      }})
    } catch (e) {
      this.errorCorrection = d
    }
  };
  w[A].prototype.Code.prototype.ENCODE_MODE = {NUMERIC: 1, ALPHA_NUMERIC: 2, BYTE: 4, UTF8: 0x14, UTF8_SIGNATURE: 0x24, STRUCTURED_APPEND: 3, FNC1_POS1: 5, ECI: 7, KANJI: 8, FNC1_POS2: 9};
  w[A].prototype.ENCODE_MODE = w[A].prototype.Code.prototype.ENCODE_MODE;
  w[A].prototype.Code.prototype.ERROR_CORRECTION = {L: 1, M: 0, Q: 3, H: 2};
  w[A].prototype.ERROR_CORRECTION = w[A].prototype.Code.prototype.ERROR_CORRECTION;
  w[A].prototype.Code.prototype.DEFAULT = 0;
  w[A].prototype.DEFAULT = w[A].prototype.Code.prototype.DEFAULT;
  w[A].prototype.Code.prototype.getVersion = function (a) {
    if (this.version > 0) {
      return this.version
    } else {
      return encodeMatrix(processInput(a, this), this, true)
    }
  };
  w[A].prototype.Code.prototype.getMinVersion = function (a) {
    var b = new w[A].prototype.Code(this.encodeMode, this.DEFAULT, this.errorCorrection);
    return encodeMatrix(processInput(a, b), b, true)
  };
  w[A].prototype.Matrix = function (f, g) {
    var h, matrix, i, _this = this;
    matrix = encodeMatrix(processInput(f, g), g);
    for (i = 0; i < matrix.length; i++) {
      this[i] = matrix[i]
    }
    try {
      Object.defineProperty(this, 'scale', {configurable: false, writeable: true, get: function () {
        return j
      }, set: function (a) {
        if (typeof(a) !== 'number') {
          throw new TypeError('Invalid scale type.');
        } else if (a <= 0 || a > 256) {
          throw new RangeError('Scale value out of range.');
        } else {
          j = a
        }
      }});
      var j = 4
    } catch (e) {
      this.scale = 4
    }
    try {
      Object.defineProperty(this, 'margin', {configurable: false, writeable: true, get: function () {
        return k
      }, set: function (a) {
        if (typeof(a) !== 'number') {
          throw new TypeError('Invalid margin type.');
        } else if (a < 0 || a > 256) {
          throw new RangeError('Margin value out of range.');
        } else {
          k = a
        }
      }});
      var k = 4
    } catch (e) {
      this.margin = 4
    }
    try {
      Object.defineProperty(this, 'color1', {configurable: false, writeable: true, get: function () {
        return l
      }, set: function (a) {
        if (typeof(a) === 'string') {
          l = a
        } else {
          throw new TypeError('Invalid color1 type.');
        }
      }});
      var l = 'rgb(0,0,0)'
    } catch (e) {
      this.color1 = 'rgb(0,0,0)'
    }
    try {
      Object.defineProperty(this, 'color0', {configurable: false, writeable: true, get: function () {
        return m
      }, set: function (a) {
        if (typeof(a) === 'string') {
          m = a
        } else {
          throw new TypeError('Invalid color2 type.');
        }
      }});
      var m = 'none'
    } catch (e) {
      this.color0 = 'none'
    }
    try {
      Object.defineProperty(this, 'length', {configurable: false, writeable: false, get: function () {
        return matrix.length
      }})
    } catch (e) {
      this.length = new function () {
        this.toString = function () {
          return matrix.length
        }
      }
    }
    try {
      Object.defineProperty(this, 'width', {configurable: false, writeable: false, get: function () {
        return matrix.length + (_this.margin << 1)
      }})
    } catch (e) {
      this.width = new function () {
        this.toString = function () {
          return matrix.length + (_this.margin << 1)
        }
      }
    }
    try {
      Object.defineProperty(this, 'pixelWidth', {configurable: false, writeable: false, get: function () {
        return(matrix.length + (_this.margin << 1)) * _this.scale
      }})
    } catch (e) {
      this.pixelWidth = new function () {
        this.toString = function () {
          return(matrix.length + (_this.margin << 1)) * _this.scale
        }
      }
    }
    this.draw = function (a, b, c) {
      var d = a.getContext('2d'), j = this.scale, k = this.margin, x, y;
      for (y = 0; y < matrix.length; y++) {
        for (x = 0; x < matrix[y].length; x++) {
          if (matrix[y][x]) {
            d.fillRect(b + (x + k) * j, c + (y + k) * j, j, j)
          }
        }
      }
    };
    this.drawHTML = function (a, b, c) {
      b = b || 'div';
      var d = this.scale, k = this.margin, background = this.color1, html = '<div style="position:relative; background:' + this.color2 + '">', x, y, xW;
      for (y = 0; y < matrix.length; y++) {
        for (x = 0; x < matrix.length; x = x + xW) {
          xW = 1;
          if (matrix[y][x] === 1) {
            while (x + xW < matrix.length && matrix[y][x + xW] === 1) {
              xW++
            }
            if (c) {
              html += '<' + b + ' style="width:' + (xW * d) + 'px; height:' + d + 'px; left:' + ((x + k) * d) + 'px; top:' + ((y + k) * d) + 'px;"></' + b + '>'
            } else {
              html += '<' + b + ' style="position:absolute; width:' + (xW * d) + 'px; height:' + d + 'px; left:' + ((x + k) * d) + 'px; top:' + ((y + k) * d) + 'px; background:' + background + ';"></' + b + '>'
            }
          }
        }
      }
      html += +'</div>';
      if (a && typeof(a.innerHTML) != 'undefined') {
        a.innerHTML = html
      }
      return html
    };
    this.toDataURL = function () {
    };
    this.toSVG = function () {
    };
    this.toArray = function () {
      var x, y, arr = typedArray(matrix.length + (k << 1), 0);
      for (y = 0; y < matrix.length; y++) {
        arr[y + k] = typedArray(matrix[y].length + (k << 1), 0);
        for (x = 0; x < matrix[y].length; x++) {
          arr[y + k][x + k] = matrix[y][x]
        }
      }
      return arr
    };
    this.toString = function () {
      return this.toArray().toString()
    };
    this.getDebuggingData = function () {
    }
  };
  var B = {
    TOTAL_BYTES: 0, REMAINDER_BITS: 1, ECC_BYTES: 2, EC_BLOCKS: 3, ALIGNMENT_PATTERN_POSITION_OFFSET: 4, VERSION_PATTERN: 5
  }, versionInfo = [null,
    [26, 0, [10, 7, 17, 13], [
      [1, 0],
      [1, 0],
      [1, 0],                     //1
      [1, 0]
    ], 0, null],
    [44, 7, [16, 10, 28, 22], [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ], 12, null],
    [70, 7, [26, 15, 44, 36], [
      [1, 0],
      [1, 0],
      [2, 0],
      [2, 0]
    ], 16, null],
    [100, 7, [36, 20, 64, 52], [
      [2, 0],
      [1, 0],
      [4, 0],
      [2, 0]
    ], 20, null],
    [134, 7, [48, 26, 88, 72], [
      [2, 0],
      [1, 0],
      [2, 2],                     // 5
      [2, 2]
    ], 24, null],
    [172, 7, [64, 36, 112, 96], [
      [4, 0],
      [2, 0],
      [4, 0],
      [4, 0]
    ], 28, null],
    [196, 0, [72, 40, 130, 108], [
      [4, 0],
      [2, 0],
      [4, 1],
      [2, 4]
    ], 16, 0x07c94],
    [242, 0, [88, 48, 156, 132], [
      [2, 2],
      [2, 0],
      [4, 2],
      [4, 2]
    ], 18, 0x085bc],
    [292, 0, [110, 60, 192, 160], [
      [3, 2],
      [2, 0],
      [4, 4],
      [4, 4]
    ], 20, 0x09a99],
    [346, 0, [130, 72, 224, 192], [
      [4, 1],
      [2, 2],
      [6, 2],                        // 10
      [6, 2]
    ], 22, 0x0a4d3],
    [404, 0, [150, 80, 264, 224], [
      [1, 4],
      [4, 0],
      [3, 8],
      [4, 4]
    ], 24, 0x0bbf6],
    [466, 0, [176, 96, 308, 260], [
      [6, 2],
      [2, 2],
      [7, 4],
      [4, 6]
    ], 26, 0x0c762],
    [532, 0, [198, 104, 352, 288], [
      [8, 1],
      [4, 0],
      [12, 4],
      [8, 4]
    ], 28, 0x0d847],
    [581, 3, [216, 120, 384, 320], [
      [4, 5],
      [3, 1],
      [11, 5],
      [11, 5]
    ], 20, 0x0e60d],
    [655, 3, [240, 132, 432, 360], [
      [5, 5],
      [5, 1],
      [11, 7],                      // 15
      [5, 7]
    ], 22, 0x0f928],
    [733, 3, [280, 144, 480, 408], [
      [7, 3],
      [5, 1],
      [3, 13],
      [15, 2]
    ], 24, 0x10b78],
    [815, 3, [308, 168, 532, 448], [
      [10, 1],
      [1, 5],
      [2, 17],
      [1, 15]
    ], 24, 0x1145d],
    [901, 3, [338, 180, 588, 504], [
      [9, 4],
      [5, 1],
      [2, 19],
      [17, 1]
    ], 26, 0x12a17],
    [991, 3, [364, 196, 650, 546], [
      [3, 11],
      [3, 4],
      [9, 16],
      [17, 4]
    ], 28, 0x13532],
    [1085, 3, [416, 224, 700, 600], [
      [3, 13],
      [3, 5],
      [15, 10],                        // 20
      [15, 5]
    ], 28, 0x149a6],
    [1156, 4, [442, 224, 750, 644], [
      [17, 0],
      [4, 4],
      [19, 6],
      [17, 6]
    ], 22, 0x15683],
    [1258, 4, [476, 252, 816, 690], [
      [17, 0],
      [2, 7],
      [34, 0],
      [7, 16]
    ], 24, 0x168c9],
    [1364, 4, [504, 270, 900, 750], [
      [4, 14],
      [4, 5],
      [16, 14],
      [11, 14]
    ], 24, 0x177ec],
    [1474, 4, [560, 300, 960, 810], [
      [6, 14],
      [6, 4],
      [30, 2],
      [11, 16]
    ], 26, 0x18ec4],
    [1588, 4, [588, 312, 1050, 870], [
      [8, 13],
      [8, 4],
      [22, 13],                     // 25
      [7, 22]
    ], 26, 0x191e1],
    [1706, 4, [644, 336, 1110, 952], [
      [19, 4],
      [10, 2],
      [33, 4],
      [28, 6]
    ], 28, 0x1afab],
    [1828, 4, [700, 360, 1200, 1020], [
      [22, 3],
      [8, 4],
      [12, 28],
      [8, 26]
    ], 28, 0x1b08e],
    [1921, 3, [728, 390, 1260, 1050], [
      [3, 23],
      [3, 10],
      [11, 31],
      [4, 31]
    ], 24, 0x1cc1a],
    [2051, 3, [784, 420, 1350, 1140], [
      [21, 7],
      [7, 7],
      [19, 26],
      [1, 37]
    ], 24, 0x1d33f],
    [2185, 3, [812, 450, 1440, 1200], [
      [19, 10],
      [5, 10],                           // 30
      [23, 25],
      [15, 25]
    ], 26, 0x1ed75],
    [2323, 3, [868, 480, 1530, 1290], [
      [2, 29],
      [13, 3],
      [23, 28],
      [42, 1]
    ], 26, 0x1f250],
    [2465, 3, [924, 510, 1620, 1350], [
      [10, 23],
      [17, 0],
      [19, 35],
      [10, 35]
    ], 26, 0x209d5],
    [2611, 3, [980, 540, 1710, 1440], [
      [14, 21],
      [17, 1],
      [11, 46],
      [29, 19]
    ], 28, 0x216f0],
    [2761, 3, [1036, 570, 1800, 1530], [
      [14, 23],
      [13, 6],
      [59, 1],
      [44, 7]
    ], 28, 0x228ba],
    [2876, 0, [1064, 570, 1890, 1590], [
      [12, 26],
      [12, 7],
      [22, 41],                      // 35
      [39, 14]
    ], 24, 0x2379f],
    [3034, 0, [1120, 600, 1980, 1680], [
      [6, 34],
      [6, 14],
      [2, 64],
      [46, 10]
    ], 26, 0x24b0b],
    [3196, 0, [1204, 630, 2100, 1770], [
      [29, 14],
      [17, 4],
      [24, 46],
      [49, 10]
    ], 26, 0x2542e],
    [3362, 0, [1260, 660, 2220, 1860], [
      [13, 32],
      [4, 18],
      [42, 32],
      [48, 14]
    ], 26, 0x26a64],
    [3532, 0, [1316, 720, 2310, 1950], [
      [40, 7],
      [20, 4],
      [10, 67],
      [43, 22]
    ], 28, 0x27541],
    [3706, 0, [1372, 750, 2430, 2040], [
      [18, 31],
      [19, 6],                          // 40
      [20, 61],
      [34, 34]
    ], 28, 0x28c69]], formatInfo = [
    [0x5412, 0x5125, 0x5e7c, 0x5b4b, 0x45f9, 0x40ce, 0x4f97, 0x4aa0],
    [0x77c4, 0x72f3, 0x7daa, 0x789d, 0x662f, 0x6318, 0x6c41, 0x6976],
    [0x1689, 0x13be, 0x1ce7, 0x19d0, 0x0762, 0x0255, 0x0d0c, 0x083b],
    [0x355f, 0x3068, 0x3f31, 0x3a06, 0x24b4, 0x2183, 0x2eda, 0x2bed]
  ], pdp = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1]
  ], ap = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1]
  ], maskPattern = [function (j, i) {
    return(i + j) % 2 === 0
  }, function (j, i) {
    return i % 2 === 0
  }, function (j, i) {
    return j % 3 === 0
  }, function (j, i) {
    return(i + j) % 3 === 0
  }, function (j, i) {
    return(Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0
  }, function (j, i) {
    return(i * j) % 2 + (i * j) % 3 === 0
  }, function (j, i) {
    return((i * j) % 2 + (i * j) % 3) % 2 === 0
  }, function (j, i) {
    return((i * j) % 3 + (i + j) % 2) % 2 === 0
  }], BIT_TYPE = {FINDER: 0x02, SEPARATOR: 0x04, TIMING: 0x08, ALIGNMENT: 0x10, VERSION: 0x20, FORMAT: 0x40, DATA: 0x80};

  function encodeMatrix(a, b, c) {
    var i, j, x, y, len, version = b.version, ecLevel = b.errorCorrection;
    var d = new Array(versionInfo[versionInfo.length - 1][B.TOTAL_BYTES] * 8), bitStreamLen = 0, cciLength, minVersion;
    switch (b.encodeMode) {
      case b.ENCODE_MODE.NUMERIC:
        var e = 0;
        for (i = 0; i < a.length; i++) {
          if (a[i] >= 0x30 && a[i] <= 0x39) {
            e = (e * 10) + (a[i] - 0x30);
            if ((i % 3) === 2) {
              bitStreamLen = arrayCopy(d, bitStreamLen, toBits(e, 10));
              e = 0
            }
          } else {
            throw new TypeError('Invalid data format.');
          }
        }
        switch (i % 3) {
          case 1:
            bitStreamLen = arrayCopy(d, bitStreamLen, toBits(e, 4));
            break;
          case 2:
            bitStreamLen = arrayCopy(d, bitStreamLen, toBits(e, 7));
            break;
          default:
            break
        }
        if (version > 0) {
          if (version >= 1 && version <= 9) {
            cciLength = 10
          } else if (version >= 10 && version <= 26) {
            cciLength = 12
          } else if (version >= 27 && version <= 40) {
            cciLength = 14
          }
        } else {
          minVersion = getMinVersionByBits(bitStreamLen + 4 + 10, ecLevel);
          if (minVersion > 0) {
            if (minVersion < Math.abs(version)) {
              minVersion = Math.abs(version)
            }
            if (minVersion >= 1 && minVersion <= 9) {
              cciLength = 10
            } else {
              minVersion = getMinVersionByBits(bitStreamLen + 4 + 12, ecLevel);
              if (minVersion > 0) {
                if (minVersion < Math.abs(version)) {
                  minVersion = Math.abs(version)
                }
                if (minVersion >= 10 && minVersion <= 26) {
                  cciLength = 12
                } else {
                  minVersion = getMinVersionByBits(bitStreamLen + 4 + 14, ecLevel);
                  if (minVersion > 0) {
                    if (minVersion < Math.abs(version)) {
                      minVersion = Math.abs(version)
                    }
                    if (minVersion >= 27 && minVersion <= 40) {
                      cciLength = 14
                    } else {
                      throw new RangeError('Bug in version detection.');
                    }
                  } else {
                    throw new RangeError('Too much data.');
                  }
                }
              } else {
                throw new RangeError('Too much data.');
              }
            }
          } else {
            throw new RangeError('Too much data.');
          }
          version = minVersion
        }
        break;
      case b.ENCODE_MODE.ALPHA_NUMERIC:
        var f = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 32, 36, 37, 42, 43, 45, 46, 47, 58], charCode1, charCode2;
        for (i = 0; i < a.length - 1; i += 2) {
          charCode1 = indexInArray((a[i] & 0x60) === 0x60 ? a[i] & 0x5f : a[i], f);
          charCode2 = indexInArray((a[i + 1] & 0x60) === 0x60 ? a[i + 1] & 0x5f : a[i + 1], f);
          if (charCode1 === -1 || charCode2 === -1) {
            throw new Error('Character not supported in ALPHA_NUMERIC encoding mode.');
          }
          bitStreamLen = arrayCopy(d, bitStreamLen, toBits((charCode1 * 45) + charCode2, 11))
        }
        if (i === (a.length - 1)) {
          charCode1 = indexInArray((a[i] & 0x60) === 0x60 ? a[i] & 0x5f : a[i], f);
          if (charCode1 === -1) {
            throw new Error('Character not supported in ALPHA_NUMERIC encoding mode.');
          }
          bitStreamLen = arrayCopy(d, bitStreamLen, toBits(charCode1, 6))
        }
        if (version > 0) {
          if (version >= 1 && version <= 9) {
            cciLength = 9
          } else if (version >= 10 && version <= 26) {
            cciLength = 11
          } else if (version >= 27 && version <= 40) {
            cciLength = 13
          }
        } else {
          minVersion = getMinVersionByBits(bitStreamLen + 4 + 9, ecLevel);
          if (minVersion > 0) {
            if (minVersion < Math.abs(version)) {
              minVersion = Math.abs(version)
            }
            if (minVersion >= 1 && minVersion <= 9) {
              cciLength = 9
            } else {
              minVersion = getMinVersionByBits(bitStreamLen + 4 + 11, ecLevel);
              if (minVersion > 0) {
                if (minVersion < Math.abs(version)) {
                  minVersion = Math.abs(version)
                }
                if (minVersion >= 10 && minVersion <= 26) {
                  cciLength = 11
                } else {
                  minVersion = getMinVersionByBits(bitStreamLen + 4 + 13, ecLevel);
                  if (minVersion > 0) {
                    if (minVersion < Math.abs(version)) {
                      minVersion = Math.abs(version)
                    }
                    if (minVersion >= 27 && minVersion <= 40) {
                      cciLength = 13
                    } else {
                      throw new RangeError('Bug in version detection.');
                    }
                  } else {
                    throw new RangeError('Too much data.');
                  }
                }
              } else {
                throw new RangeError('Too much data.');
              }
            }
          } else {
            throw new RangeError('Too much data.');
          }
          version = minVersion
        }
        break;
      case b.ENCODE_MODE.BYTE:
      case b.ENCODE_MODE.UTF8:
      case b.ENCODE_MODE.UTF8_SIGNATURE:
        for (i = 0; i < a.length; i++) {
          bitStreamLen = arrayCopy(d, bitStreamLen, toBits(a[i], 8))
        }
        if (version > 0) {
          if (version >= 0 && version <= 9) {
            cciLength = 8
          } else if (version >= 10 && version <= 40) {
            cciLength = 16
          }
        } else {
          minVersion = getMinVersionByBits(bitStreamLen + 4 + 8, ecLevel);
          if (minVersion > 0) {
            if (minVersion < Math.abs(version)) {
              minVersion = Math.abs(version)
            }
            if (minVersion >= 1 && minVersion <= 9) {
              cciLength = 8
            } else {
              minVersion = getMinVersionByBits(bitStreamLen + 4 + 16, ecLevel);
              if (minVersion > 0) {
                if (minVersion < Math.abs(version)) {
                  minVersion = Math.abs(version)
                }
                if (minVersion >= 10 && minVersion <= 40) {
                  cciLength = 16
                } else {
                  throw new RangeError('Bug in version detection.');
                }
              } else {
                throw new RangeError('Too much data.');
              }
            }
          } else {
            throw new RangeError('Too much data.');
          }
          version = minVersion
        }
        break;
      case b.ENCODE_MODE.KANJI:
        throw new Error('Encoding mode "KANJI" not supported yet.');
        break;
      default:
        throw new Error('Unsupported encoding mode.');
        break
    }
    if (c) {
      return version
    }
    d = toBits(b.encodeMode & 0xf, 4).concat(toBits(a.length, cciLength)).concat(d);
    bitStreamLen += (4 + cciLength);
    var g = versionInfo[version][B.TOTAL_BYTES] - versionInfo[version][B.ECC_BYTES][ecLevel] << 3;
    if (bitStreamLen > g) {
      throw new RangeError('Too much data for the selected version.');
    }
    var h = g - bitStreamLen;
    if (h > 4) {
      h = 4
    }
    bitStreamLen = arrayCopy(d, bitStreamLen, typedArray(h, 0));
    bitStreamLen = arrayCopy(d, bitStreamLen, typedArray((8 - (bitStreamLen % 8)) % 8, 0));
    for (i = 0, len = (g - bitStreamLen) >>> 3; i < len; i++) {
      bitStreamLen = arrayCopy(d, bitStreamLen, i & 1 ? [0, 0, 0, 1, 0, 0, 0, 1] : [1, 1, 1, 0, 1, 1, 0, 0])
    }
    var k = Math.floor((versionInfo[version][B.TOTAL_BYTES] - versionInfo[version][B.ECC_BYTES][ecLevel]) / (versionInfo[version][B.EC_BLOCKS][ecLevel][0] + versionInfo[version][B.EC_BLOCKS][ecLevel][1])), eccBlockSize = Math.floor(versionInfo[version][B.ECC_BYTES][ecLevel] / (versionInfo[version][B.EC_BLOCKS][ecLevel][0] + versionInfo[version][B.EC_BLOCKS][ecLevel][1])), dataBlocks = [], codeword = [];
    for (i = 0, len = versionInfo[version][B.EC_BLOCKS][ecLevel][0]; i < len; i++) {
      codeword = [];
      for (j = 0; j < k; j++) {
        codeword.push(toByte(d.splice(0, 8)))
      }
      dataBlocks.push(codeword)
    }
    for (i = 0, len = versionInfo[version][B.EC_BLOCKS][ecLevel][1]; i < len; i++) {
      codeword = [];
      for (j = 0; j <= k; j++) {
        codeword.push(toByte(d.splice(0, 8)))
      }
      dataBlocks.push(codeword)
    }
    var l = [], gfRev = [];
    j = 1;
    for (i = 0; i < 255; i++) {
      l.push(j);
      gfRev[j] = i;
      j <<= 1;
      if (j > 0xff) {
        j = 0x11d ^ j
      }
    }
    var m = [1];
    for (i = 0, len = eccBlockSize; i < len; i++) {
      m[i + 1] = 1;
      for (j = i; j > 0; j--) {
        if (m[j] > 0) {
          m[j] = m[j - 1] ^ l[(gfRev[m[j]] + i) % 0xff]
        } else {
          m[j] = m[j - 1]
        }
      }
      m[0] = l[(gfRev[m[0]] + i) % 0xff]
    }
    var n = [];
    for (i = m.length - 1; i >= 0; i--) {
      n.push(m[i])
    }
    var o = [];
    for (j = 0; j < dataBlocks.length; j++) {
      o[j] = [].concat(dataBlocks[j]).concat(typedArray(eccBlockSize, 0));
      var p;
      while (o[j].length >= n.length) {
        p = o[j][0];
        for (i = 0; i < n.length; i++) {
          o[j][i] ^= l[(gfRev[n[i]] + gfRev[p]) % 0xff]
        }
        if (o[j].shift() !== 0) {
          throw new Error('Bug while generating the ECC');
        }
      }
    }
    d = new Array(versionInfo[versionInfo.length - 1][B.TOTAL_BYTES] * 8);
    bitStreamLen = 0;
    for (i = 0; i <= k; i++) {
      for (j = 0; j < dataBlocks.length; j++) {
        if (i < dataBlocks[j].length) {
          bitStreamLen = arrayCopy(d, bitStreamLen, toBits(dataBlocks[j][i], 8))
        }
      }
    }
    for (i = 0; i < eccBlockSize; i++) {
      for (j = 0; j < o.length; j++) {
        if (i < o[j].length) {
          bitStreamLen = arrayCopy(d, bitStreamLen, toBits(o[j][i], 8))
        }
      }
    }
    var q = 17 + (version << 2), matrix = new Array(q);
    for (i = 0; i < q; i++) {
      matrix[i] = typedArray(q, 0)
    }
    matrixCopy(matrix, 0, 0, pdp, BIT_TYPE.FINDER);
    matrixCopy(matrix, 0, q - 7, pdp, BIT_TYPE.FINDER);
    matrixCopy(matrix, q - 7, 0, pdp, BIT_TYPE.FINDER);
    for (i = 0; i < 8; i++) {
      matrix[i][7] = BIT_TYPE.SEPARATOR;
      matrix[7][i] = BIT_TYPE.SEPARATOR;
      matrix[i][q - 8] = BIT_TYPE.SEPARATOR;
      matrix[7][(q - 1) - i] = BIT_TYPE.SEPARATOR;
      matrix[(q - 1) - i][7] = BIT_TYPE.SEPARATOR;
      matrix[q - 8][i] = BIT_TYPE.SEPARATOR
    }
    for (i = 8; i < (q - 8); i++) {
      matrix[i][6] = BIT_TYPE.TIMING | ((i + 1) % 2);
      matrix[6][i] = BIT_TYPE.TIMING | ((i + 1) % 2)
    }
    if (version > 1) {
      var r = versionInfo[version][B.ALIGNMENT_PATTERN_POSITION_OFFSET], appMax = (version * 4) + 10;
      y = appMax;
      while (true) {
        x = appMax;
        while (true) {
          if (!((x === 6 && y === 6) || (x === 6 && y === (q - 7)) || (x === (q - 7) && y === 6))) {
            matrixCopy(matrix, x - 2, y - 2, ap, BIT_TYPE.ALIGNMENT)
          }
          if (x === 6) {
            break
          }
          x -= r;
          if (x < 18) {
            x = 6
          }
        }
        if (y === 6) {
          break
        }
        y -= r;
        if (y < 18) {
          y = 6
        }
      }
    }
    if (version >= 7) {
      var v = versionInfo[version][B.VERSION_PATTERN];
      for (i = 0; i < 6; i++) {
        for (j = 0; j < 3; j++) {
          matrix[(q - 11) + j][i] = BIT_TYPE.VERSION | (v & 1);
          matrix[i][(q - 11) + j] = BIT_TYPE.VERSION | (v & 1);
          v = v >> 1
        }
      }
    }
    for (i = 0; i < 8; i++) {
      matrix[(q - 1) - i][8] = BIT_TYPE.FORMAT | 0;
      matrix[8][(q - 1) - i] = BIT_TYPE.FORMAT | 0;
      if (i !== 6) {
        matrix[8][i] = BIT_TYPE.FORMAT | 0;
        matrix[i][8] = BIT_TYPE.FORMAT | 0
      }
    }
    matrix[8][8] = BIT_TYPE.FORMAT | 0;
    matrix[q - 8][8] = BIT_TYPE.FORMAT | 1;
    var s = -1;
    x = y = q - 1;
    for (i = 0; i < bitStreamLen; i++) {
      matrix[y][x] = BIT_TYPE.DATA | d[i];
      do {
        if (((x > 6) && ((x & 1) === 0)) || ((x < 6) && ((x & 1) === 1))) {
          x--
        } else if (((s === -1) && (y === 0)) || ((s === 1) && (y === (q - 1)))) {
          if (x === 0) {
            if (i < bitStreamLen - 1) {
              throw new RangeError('Too much data while writing the symbol.');
            }
            break
          }
          s = -s;
          x--;
          if (x === 6) {
            x--
          }
        } else {
          y += s;
          x++
        }
      } while (matrix[y][x] !== 0)
    }
    var t = [], formatBits;
    for (i = 0; i < maskPattern.length; i++) {
      t[i] = [];
      for (y = 0; y < q; y++) {
        t[i][y] = [];
        for (x = 0; x < q; x++) {
          if (matrix[y][x] & BIT_TYPE.DATA) {
            t[i][y][x] = (matrix[y][x] ^ maskPattern[i](x, y)) & 1
          } else {
            t[i][y][x] = matrix[y][x] & 1
          }
        }
      }
      formatBits = toBits(formatInfo[ecLevel][i], 15);
      t[i][q - 1][8] = t[i][8][0] = formatBits[0];
      t[i][q - 2][8] = t[i][8][1] = formatBits[1];
      t[i][q - 3][8] = t[i][8][2] = formatBits[2];
      t[i][q - 4][8] = t[i][8][3] = formatBits[3];
      t[i][q - 5][8] = t[i][8][4] = formatBits[4];
      t[i][q - 6][8] = t[i][8][5] = formatBits[5];
      t[i][q - 7][8] = t[i][8][7] = formatBits[6];
      t[i][8][q - 8] = t[i][8][8] = formatBits[7];
      t[i][8][q - 7] = t[i][7][8] = formatBits[8];
      t[i][8][q - 6] = t[i][5][8] = formatBits[9];
      t[i][8][q - 5] = t[i][4][8] = formatBits[10];
      t[i][8][q - 4] = t[i][3][8] = formatBits[11];
      t[i][8][q - 3] = t[i][2][8] = formatBits[12];
      t[i][8][q - 2] = t[i][1][8] = formatBits[13];
      t[i][8][q - 1] = t[i][0][8] = formatBits[14]
    }
    var u = 0, selectedMaskScore = 0xffffffff, n1, n2, n3, n4, score;
    for (i = 0; i < maskPattern.length; i++) {
      n1 = n2 = n3 = n4 = score = 0;
      for (y = 0; y < q; y++) {
        for (x = 0; x < q; x++) {
          if ((x >= 6) && (((t[i][y][x - 6] & t[i][y][x - 5] & t[i][y][x - 4] & t[i][y][x - 3] & t[i][y][x - 2] & t[i][y][x - 1] & t[i][y][x]) === 1) || ((t[i][y][x - 6] | t[i][y][x - 5] | t[i][y][x - 4] | t[i][y][x - 3] | t[i][y][x - 2] | t[i][y][x - 1] | t[i][y][x]) === 0))) {
            n1++
          }
          if ((y >= 6) && (((t[i][y - 6][x] & t[i][y - 5][x] & t[i][y - 4][x] & t[i][y - 3][x] & t[i][y - 2][x] & t[i][y - 1][x] & t[i][y][x]) === 1) || ((t[i][y - 6][x] | t[i][y - 5][x] | t[i][y - 4][x] | t[i][y - 3][x] | t[i][y - 2][x] | t[i][y - 1][x] | t[i][y][x]) === 0))) {
            n1++
          }
          if ((x > 0 && y > 0) && (((t[i][y][x] & t[i][y][x - 1] & t[i][y - 1][x] & t[i][y - 1][x - 1]) === 1) || ((t[i][y][x] | t[i][y][x - 1] | t[i][y - 1][x] | t[i][y - 1][x - 1]) === 0))) {
            n2++
          }
          if ((x >= 6) && ((t[i][y][x - 6] === 1) && (t[i][y][x - 5] === 0) && (t[i][y][x - 4] === 1) && (t[i][y][x - 3] === 1) && (t[i][y][x - 2] === 1) && (t[i][y][x - 1] === 0) && (t[i][y][x] === 1))) {
            n3++
          }
          if ((y >= 6) && ((t[i][y - 6][x] === 1) && (t[i][y - 5][x] === 0) && (t[i][y - 4][x] === 1) && (t[i][y - 3][x] === 1) && (t[i][y - 2][x] === 1) && (t[i][y - 1][x] === 0) && (t[i][y][x] === 1))) {
            n3++
          }
          n4 += t[i][y][x]
        }
      }
      n4 = Math.abs(((100 * n4) / (q * q)) - 50) / 5;
      score = (n1 * 3) + (n2 * 3) + (n3 * 40) + (n4 * 10);
      if (score < selectedMaskScore) {
        selectedMaskScore = score;
        u = i
      }
    }
    for (y = 0; y < q; y++) {
      for (x = 0; x < q; x++) {
        if (matrix[y][x] & (BIT_TYPE.DATA | BIT_TYPE.FORMAT)) {
          matrix[y][x] = t[u][y][x]
        } else {
          matrix[y][x] = matrix[y][x] & 0x1
        }
      }
    }
    return matrix
  }

  function processInput(a, b) {
    var d, dataArr, i, c, len;
    switch (typeof(a)) {
      case'string':
        d = a;
        break;
      case'number':
        d = a.toString();
        break;
      case'object':
        if (a.constructor === w[A].prototype.Input) {
          d = a.toString()
        } else if ((Array.isArray || function (o) {
          return Object.prototype.toString.call(o) === '[object Array]'
        })(a)) {
          return a
        } else {
          d = (new w[A].prototype.Input(a.dataType, a.data)).toString()
        }
        break;
      default:
        throw new TypeError('Unsupported input parameter.');
    }
    dataArr = (b.encodeMode === b.ENCODE_MODE.UTF8_SIGNATURE ? [0xef, 0xbb, 0xbf] : []);
    if (b.encodeMode === b.ENCODE_MODE.UTF8_SIGNATURE || b.encodeMode === b.ENCODE_MODE.UTF8) {
      for (i = 0, len = d.length; i < len; i++) {
        c = d.charCodeAt(i);
        if (c < 128) {
          dataArr.push(c)
        } else if ((c > 127) && (c < 2048)) {
          dataArr.push((c >> 6) | 192, (c & 63) | 128)
        } else {
          dataArr.push((c >> 12) | 224, ((c >> 6) & 63) | 128, (c & 63) | 128)
        }
      }
    } else {
      for (i = 0, len = d.length; i < len; i++) {
        dataArr.push(d.charCodeAt(i))
      }
    }
    return dataArr
  }

  function getMinVersionByBits(a, b) {
    for (var i = 1; i < versionInfo.length; i++) {
      if (a <= ((versionInfo[i][B.TOTAL_BYTES] - versionInfo[i][B.ECC_BYTES][b]) << 3)) {
        return i
      }
    }
    return 0
  }

  function toBits(a, b) {
    var c = new Array(b);
    if ((typeof(a) === 'number') && (b > 0) && (b <= 32)) {
      for (var i = b - 1; i >= 0; i--) {
        c[i] = a & 0x1;
        a >>= 1
      }
      return c
    } else {
      throw new Error("Invalid parameters in toBits().");
    }
    return[]
  }

  function toByte(a, b) {
    b = b || 0;
    return((a[b] || 0) << 7) + ((a[b + 1] || 0) << 6) + ((a[b + 2] || 0) << 5) + ((a[b + 3] || 0) << 4) + ((a[b + 4] || 0) << 3) + ((a[b + 5] || 0) << 2) + ((a[b + 6] || 0) << 1) + ((a[b + 7] || 0))
  }

  function typedArray(a, b) {
    var c = new Array(a);
    for (var i = 0; i < a; i++) {
      c[i] = b
    }
    return c
  }

  function arrayCopy(a, b, c) {
    for (var i = 0; i < c.length; i++) {
      a[b + i] = c[i]
    }
    return b + c.length
  }

  function matrixCopy(a, b, c, d, e) {
    var x, xLen, y, yLen;
    for (y = 0, yLen = d.length; y < yLen; y++) {
      for (x = 0, xLen = d[y].length; x < xLen; x++) {
        a[c + y][b + x] = d[y][x] ^ e
      }
    }
  }

  function indexInArray(a, b) {
    if (typeof(b.indexOf) === 'function') {
      return b.indexOf(a)
    } else {
      for (var i = 0; i < b.length; i++) {
        if (b[i] === a) {
          return i
        }
      }
    }
    return-1
  }

  function isEnumValue(a, b) {
    for (var v in a) {
      if (a[v] === b) {
        return true
      }
    }
    return false
  }

  function copyObject(a) {
    if (typeof(a) != 'object') {
      return a
    }
    var b = {};
    for (var c in a) {
      if (typeof(a[c]) === 'object') {
        b[c] = copyObject(a[c])
      } else {
        b[c] = a[c]
      }
    }
    return b
  }

  return w;
};

function make_jsqr_ai() {
  var w = make_qrInterface();
  if (w == -1) {
    return;
  }
  var c = bench({f:make_qrMatrix, params:[w]});
  draw_qr(c);

  function make_qrInterface() {
    var str = '';

    for (; ;) {
      var qrInterface = qr_interface({editText: str});
      if (qrInterface.editText.text != 'null' && qrInterface.editText.text != '') {
        break;
      } else if (qrInterface.editText.text == 'null') {
        return -1;
      } else if (qrInterface.editText.text == '') {
        alert('Поле ввода пустое, попробуйте еще раз');
      }
    }
    return qrInterface;
  }

  function make_qrMatrix(qrInterface) {
    var _ = JSQRLib();
    // Initialize a new JSQR object.
    var qr = new _.JSQR();
    // Initialize a new Code object.
    var code = new qr.Code();
    // Set the code datatype.
    code.encodeMode = (function () {
      switch (qrInterface.encodeModeList.selection.text) {
        case qrInterface.encodeModeArr[0]:
          return code.ENCODE_MODE.NUMERIC;
          break;
        case qrInterface.encodeModeArr[1]:
          return code.ENCODE_MODE.ALPHA_NUMERIC;
          break;
        case qrInterface.encodeModeArr[2]:
          return code.ENCODE_MODE.BYTE;
          break;
        case qrInterface.encodeModeArr[3]:
          return code.ENCODE_MODE.UTF8;
          break;
        case qrInterface.encodeModeArr[4]:
          return code.ENCODE_MODE.UTF8_SIGNATURE;
          break;
        default:
          // default action
          break;
      }
    })();
    // Set the code version (DEFAULT = use the smallest possible version)
    code.version = code.DEFAULT;
    // Set the error correction level (H = High)
    code.errorCorrection = (function () {
      switch (+qrInterface.eccLavelList.selection.text) {
        case 0:
          return code.ERROR_CORRECTION.L;
          break;
        case 1:
          return code.ERROR_CORRECTION.M;
          break;
        case 2:
          return code.ERROR_CORRECTION.Q;
          break;
        case 3:
          return code.ERROR_CORRECTION.H;
          break;
        default:
          // default action
          break;
      }
    })();
    // Initialize a new Input object
    var input = new qr.Input();
    // Specify the data type of 'data'.  Here, 'data' contains only text
    input.dataType = input.DATA_TYPE.TEXT;
    // Specify the data which should be encoded
    input.data = qrInterface.editText.text;
    // Initialize a new Matrix_JSQR object using the input
    var matrix = new qr.Matrix(input, code);
    return matrix;
  }

  function draw_qr(matrix) {
    var qrLay_0 = matrix['0'];
    var len = qrLay_0.length;
    var arr = []
    /*new Array(len);*/
    for (var j = 0; j < len; j++) {
      arr[j] = matrix[j];
    }
    qr_draw(arr);
  }
}
//------------------------------->>
/**
 * benchmarking of the run-time of the functions
 * @param {Object} opts - the object with parameters
 * @return {Function()} f() - the result of function exec
 */
function bench(opts) {
  opts = opts || {};
  opts.f = opts.f || null; // benchmarkable function
  opts.params = opts.params || []; // array of parameters of the function
  opts.title = (opts.title) || ''; // optional, this text is in the first alert-string
  opts.flag = opts.flag || true; // true or -1 (false) benchmarking
  if (opts.flag != -1) {
    var start = new Date();
    var fResult = (opts.f).apply(null, opts.params);
    var end = new Date();
    var allMs = end - start;
    var min = Math.floor(allMs / 1000 / 60);
    var sec = Math.floor((allMs / 1000 % 60));
    var ms = Math.floor((allMs % 1000));
    var timeSlice = opts.title + min + ':' + sec + ':' + ms;
    showLog(timeSlice);
  } else {
    var fResult = (opts.f).apply(null, opts.params);
  }
  return fResult;
}
/**
 *  Interface-Window
 */
function qr_interface(opts) {
  opts = opts || {};
  var dialTitle = opts.dialTitle || 'qr-code generator';
  var statText = 'Ваш текст (ctrl+enter для перехода на новую строку):';
  var editText = opts.editText;
  var editTextChars = opts.editTextCharacters || 100;

  var w = new Window('dialog', dialTitle, undefined, {closeButton: false});
  w.statText = w.add('statictext', undefined, statText);
  w.editText = w.add("edittext", [0, 0, 250, 150], "", {multiline: true});

  w.editText.text = editText;
  w.editText.characters = editTextChars;
  w.editText.multiline = true;
  w.editText.active = true;

  var eccLavelGr = w.add('group');
  w.statTxt = eccLavelGr.add('statictext', undefined, 'уровень коррекции ошибок:')
  w.eccLavelList = eccLavelGr.add('dropdownlist', undefined, [0, 1, 2, 3]);
  w.eccLavelList.selection = 1;

  var encodeModeGr = w.add('group');
  w.encodeModeArr = ['Numeric', 'Alphanumeric', 'Byte', 'UTF8', 'UTF8 Signature'];
  w.encodeModeTitle = encodeModeGr.add('statictext', undefined, 'Режим кодирования:');
  w.encodeModeList = encodeModeGr.add('dropdownlist', undefined, w.encodeModeArr);
  w.encodeModeList.selection = 3;

  w.buttonsGroup = w.add('group');
  w.buttonsGroup.orientation = 'row';
  w.okButt = w.buttonsGroup.add('button', undefined, 'Ok');
  w.canselButt = w.buttonsGroup.add('button', undefined, 'Cancel');

  // the event hendlers
  w.canselButt.addEventListener('click', function () {
    w.editText.text = null;
  })
  w.addEventListener('keydown', function (k) {
    if (k.keyName == 'Enter' && !k.ctrlKey) {
      w.close();
    } else if (k.keyName == 'Escape') {
      w.editText.text = null;
    }
  })
  w.show();
  return w;
}
/**
 *  Paint on Layer
 */
function qr_draw(arr) {
  var docPreset = new DocumentPreset;
  docPreset.units = RulerUnits.Millimeters;
  docPreset.colorMode = DocumentColorSpace.CMYK;

  if (documents.length == 0) {
    documents.add(DocumentColorSpace.CMYK, 150, 150);
  }
  var aDoc = activeDocument;
  var aDocH = aDoc.height;
  var aDocW = aDoc.width;
  aDoc.rulerOrigin = [0, aDocH]; // Set Zero point ruler on Document

  var newLayer = aDoc.layers.add();
  var randStr = "@" + (" " + (+new Date()) * Math.random() * 10000).slice(-7, -1);

  newLayer.name = 'qr-' + randStr;

  var X_0 = 0; // верхний левый угол РАБОЧЕЙ области кода
  var Y_0 = 0;
  var COLOR_W = new CMYKColor();
  var COLOR_K = new CMYKColor();
  COLOR_K.black = 100;

  var qrGr = aDoc.groupItems.add();
  var qrBlock, top = Y_0, left = X_0;

  var whiteFrame = qrGr.pathItems.rectangle(top + 4, left - 4, arr.length + 8, arr.length + 8);
  whiteFrame.stroked = false;
  whiteFrame.fillColor = COLOR_W;
  whiteFrame.overprintFill = false;

  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === 1) {
        qrBlock = qrGr.pathItems.rectangle(top, left, 1, 1);
        _setFillColor(arr[i][j], qrBlock);
        left++;
      } else if (arr[i][j] === 0) {
        left++;
      }
    }
    left = X_0;
    top--;
  }

  function _setFillColor(numb, elem) {
    if (numb === 1) {
      elem.stroked = false;
      elem.fillColor = COLOR_K;
      elem.overprintFill = true;
    }
  }
}
/**
 * log string to ESTK console or browser console or alert
 * param {String} a - any string
 * return {undefined} nothing return
 */
function showLog(a) {
  try {
    if ($.writeln) {
      $.writeln(a);
    } else if (console.log) {
      console.log(a);
    }
  } catch (e) {
    try {
      (function (input, title) {
        title = title || 'Scrollable alert';
// if input is an array, convert it to a string
        if (input instanceof Array)
          input = input.join("\r");
        var w = new Window("dialog", title);
        var list = w.add("edittext", undefined, input, {multiline: true, scrolling: true});
// the list should not be bigger than the maximum possible height of the window
        list.maximumSize.height = w.maximumSize.height - 100;
        list.minimumSize.width = 800;
        w.add("button", undefined, "Уходим", {name: "ok"});
        w.show();
      })(a);
    } catch (e) {
      // alert('Error line: ' + e.line + '\n' + 'Error message: ' + e.message);
    }
    alert(a);
    // alert('Error line: ' + e.line + '\n' + 'Error message: ' + e.message);
  }
}
