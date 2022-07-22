// alert('Бля!!!!!');

(function saveLayout() {
  var d          = activeDocument,
      layoutName = prompt('Edit file name', d.name.slice(0, -3));

  if (!layoutName) return;
  if (layoutName == d.name.slice(0, -3)) return;

  var tFrames = d.textFrames,
      reLayoutNumb, replacerLayoutNumb,
      reName, dName, dPath, str, str_compatible, str_trnsRu2En;

  dName = trnsRuToEn(layoutName) + '.ai';

  dPath = d.path;
  str = (dPath + '/' + dName);
  str_compatible = encodeStrToAnsii(new File(str).fsName);

  for (var i = 0; i < tFrames.length; i++) {
    var tFrame = tFrames[i];
    if (tFrame.contents.length <= 9) continue;
    if (!tFrame.contents.match(/\d{9}/)) continue;
    tFrame.contents = layoutName.replace(/^\s*DN(_?)+/, '') + ' ' + formatDate();
  }

  if (d.fullName == str) return;

  for (var i = documents.length - 1; i >= 0; i--) {
    var currDoc = documents[i];
    if (currDoc.fullName != str) continue;
    currDoc.close(SaveOptions.DONOTSAVECHANGES);
  }

  {
    var actStr = '' +
      '/version 3' +
      '/name [ 8' + ' 536574204e616d65' + ']' + '/isOpen 1' + '/actionCount 1' + '/action-1 {' + ' /name [ 11' + ' 416374696f6e204e616d65' + ' ]' +
      ' /keyIndex 0' +
      ' /colorIndex 0' +
      ' /isOpen 1' +
      ' /eventCount 1' +
      ' /event-1 {' +
      ' /useRulersIn1stQuadrant 0' +
      ' /internalName (adobe_saveACopyAs)' +
      ' /localizedName [ 11' +
      ' 53617665204120436f7079' +
      ' ]' +
      ' /isOpen 0' +
      ' /isOn 1' +
      ' /hasDialog 1' +
      ' /showDialog 0' +
      ' /parameterCount 11' +
      ' /parameter-1 {' +
      ' /key 1668116594' +
      ' /showInPalette -1' +
      ' /type (boolean)' +
      ' /value 1' + // compression
      ' }' +
      ' /parameter-2 {' +
      ' /key 1885627936' +
      ' /showInPalette -1' +
      ' /type (boolean)' +
      ' /value 0' + // pdf compatible
      ' }' +
      ' /parameter-3 {' +
      ' /key 1668445298' +
      ' /showInPalette -1' +
      ' /type (integer)' +
      ' /value 17' +
      ' }' +
      ' /parameter-4 {' +
      ' /key 1702392878' +
      ' /showInPalette -1' +
      ' /type (integer)' +
      ' /value 1' +
      ' }' +
      ' /parameter-5 {' +
      ' /key 1768842092' +
      ' /showInPalette -1' +
      ' /type (integer)' +
      ' /value 0' +
      ' }' +
      ' /parameter-6 {' +
      ' /key 1918989423' +
      ' /showInPalette -1' +
      ' /type (real)' +
      ' /value 100.0' +
      ' }' +
      ' /parameter-7 {' +
      ' /key 1886545516' +
      ' /showInPalette -1' +
      ' /type (integer)' +
      ' /value 0' +
      ' }' +
      ' /parameter-8 {' +
      ' /key 1936548194' +
      ' /showInPalette -1' +
      ' /type (boolean)' +
      ' /value 0' + // save artboards
      ' }' +
      ' /parameter-9 {' +
      ' /key 1851878757' +
      ' /showInPalette -1' +
      ' /type (ustring)' +
      ' /value [ ' + str_compatible.length / 2 + '' + // string length
      '               ' + str_compatible +
      ' ]' +
      ' }' +
      ' /parameter-10 {' +
      ' /key 1718775156' +
      ' /showInPalette -1' +
      ' /type (ustring)' +
      ' /value [ 35' +
      ' 41646f626520496c6c7573747261746f7220416e7920466f726d617420577269' +
      ' 746572' +
      ' ]' +
      ' }' +
      ' /parameter-11 {' +
      ' /key 1702392942' +
      ' /showInPalette -1' +
      ' /type (ustring)' +
      ' /value [ 6' +
      ' 61692c616974' +
      ' ]' +
      ' }' +
      ' }' +
      '}';
  }

  runAction(actStr, 'Action Name', 'Set Name');

  open(new File(str));
  d.close(SaveOptions.DONOTSAVECHANGES);

  function runAction(aiActionString, aiActionName, aiActionSetName) {
    var f = new File('~/ScriptAction.aia');
    f.open('w');
    f.write(aiActionString);
    f.close();
    app.loadAction(f);
    f.remove();

    app.doScript(aiActionName, aiActionSetName, false); // action name, set name
    app.unloadAction(aiActionSetName, ''); // set name
  }

  function encodeStrToAnsii(str) {
    var result = '';
    for (var i = 0; i < str.length; i++) {
      var chr = File.encode(str[i]);
      chr = chr.replace(/%/gmi, '');
      if (chr.length == 1) {
        result += chr.charCodeAt(0).toString(16);
      } else {
        result += chr.toLowerCase();
      }
    }
    return result;
  }

  function formatDate(date) {
    var d = date || new Date();
    // форматировать дату, с учетом того, что месяцы начинаются с 0
    d = [
      '0' + d.getDate(),
      '0' + (d.getMonth() + 1),
      '' + d.getFullYear()
    ];
    for (var i = 0; i < d.length; i++) {
      d[i] = d[i].slice(-2);
    }
    return d.slice(0, 3).join('-') + d.slice(3).join(':');
  }

  function trnsRuToEn(text) {
    var txtArr = text.split('');
    var res = '';
    var trans = {
      А: 'A', а: 'a', Б: 'B', б: 'b', В: 'V', в: 'v', Г: 'G', г: 'g', Д: 'D', д: 'd',
      Е: 'E', е: 'e', Ё: 'YO', ё: 'yo', Ж: 'ZH', ж: 'zh', З: 'Z', з: 'z', И: 'I', и: 'i',
      Й: 'J', й: 'j', К: 'K', к: 'k', Л: 'L', л: 'l', М: 'M', м: 'm', Н: 'N', н: 'n',
      О: 'O', о: 'o', П: 'P', п: 'p', Р: 'R', р: 'r', С: 'S', с: 's', Т: 'T', т: 't', У: 'U',
      у: 'u', Ф: 'F', ф: 'f', Х: 'H', х: 'h', Ц: 'C', ц: 'c', Ч: 'CH', ч: 'ch', Ш: 'SH',
      ш: 'sh', Щ: 'SH', щ: 'sh', Ъ: '', ъ: '', Ы: 'IY', ы: 'iy', Ь: '', ь: '',
      Э: 'E', э: 'e', Ю: 'YU', ю: 'yu', Я: 'YA', я: 'ya'
    };
    outer:  for (var i = 0; i < txtArr.length; i++) {
      var item = txtArr[i];
      for (var key in trans) {
        if (item !== key) continue;
        res += trans[key];
        continue outer;
      }
      res += item;
    }
    return res.replace(/ /g, '_');
  }

  function isNum(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
}());
