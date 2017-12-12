function trnsRuToEn(text) {
    var txtArr = text.split('');
    var res = '';
    var trans = {
        А: 'A', а: 'a', Б: 'B', б: 'b', В: 'V', в: 'v', Г: 'G', г: 'g', Д: 'D', д: 'd',
        Е: 'E', е: 'e', Ё: 'YO', ё: 'yo', Ж: 'ZH', ж: 'zh', З: 'Z', з: 'z', И: 'I', и: 'i',
        Й: 'J', й: 'j', К: 'K', к: 'k', Л: 'L', л: 'l', М: 'M', м: 'm', Н: 'N', н: 'n',
        О: 'O', о: 'o', П: 'P', п: 'p', Р: 'R', р: 'r', С: 'S', с: 's', Т: 'T', т: 't', У: 'U',
        у: 'u', Ф: 'F', ф: 'f', Х: 'H', х: 'h', Ц: 'C', ц: 'c', Ч: 'CH', ч: 'ch', Ш: 'SH',
        ш: 'sh', Щ: 'SHH', щ: 'shh', Ъ: '', ъ: '', Ы: 'IY', ы: 'iy', Ь: '', ь: '',
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