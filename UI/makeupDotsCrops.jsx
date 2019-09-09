/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 18.07.2016
 *
 * makeup_dots_crops_v0.3.0
 */

//@target illustrator

addJSON();

makeFace();

focusToFile();

function makeFace() {

    {
        var w = new Window('dialog', 'Makeup Dots and Crops 0.3.0');
        w.preferredSize.width = 400;
        w.margins = 15;
        w.spacing = 6;

        var pn_layout = w.add('panel', undefined, 'Layout Name'),
            pn_file = w.add('panel', undefined, 'File Name'),
            pn_cols = w.add('panel', undefined, 'Colors'),
            pn_mainDims = w.add('panel', undefined, 'Main Dimensions'),
            pn_dots = w.add('panel', undefined, 'Dots'),
            pn_fm = w.add('panel', undefined, 'FM'),
            pn_cross = w.add('panel', undefined, 'Cross'),
            gr_btns = w.add('group'),
            panW = 390;

        pn_layout.preferredSize.width = panW;
        pn_file.preferredSize.width = panW;
        pn_cols.preferredSize.width = panW;
        pn_mainDims.preferredSize.width = panW;
        pn_dots.preferredSize.width = panW;
        pn_fm.preferredSize.width = panW;
        pn_cross.preferredSize.width = panW;

        /**
         * file neme panel
         * */
        w.layoutName = pn_layout.add(
            'edittext', [0, 0, 350, 50], '000000000 ЗАКАЗЧИК МАКЕТ', {multiline: true}
        );
        w.fileName = pn_file.add(
            'edittext', [0, 0, 350, 50], '000000000_ZAKAZCHIK_MAKET', {multiline: true}
        );


        /**
         * colors panel
         * */
        var gr_cmykAndServ = pn_cols.add('group');
        var gr_cmyk = gr_cmykAndServ.add('group');
        var gr_serv = gr_cmykAndServ.add('group');
        var gr_pant = pn_cols.add('group');

        gr_cmyk.add('statictext', [0, 0, 45, 20], 'cmyk:');
        w.colsCmyk = gr_cmyk.add('edittext', [0, 0, 115, 20], 'cmyk');
        gr_serv.add('statictext', [0, 0, 45, 20], 'Serv:');
        w.colsServ = gr_serv.add('edittext', [0, 0, 115, 20], 'W');
        gr_pant.add('statictext', [0, 0, 45, 20], 'Pant:');
        w.colsPant = gr_pant.add('edittext', [0, 0, 295, 40], '485', {multiline: true});

        /**
         * main dimensions panel
         * */
        var gr_dimsMarg = pn_mainDims.add('group'),
            gr_filmW = gr_dimsMarg.add('group'),
            gr_z = gr_dimsMarg.add('group'),
            gr_marg = gr_dimsMarg.add('group');

        gr_filmW.add('statictext', [0, 0, 45, 20], 'film w:');
        w.filmW = gr_filmW.add('edittext', [0, 0, 67, 20], '360');
        gr_z.add('statictext', [0, 0, 20, 20], 'z:');
        w.z = gr_z.add('edittext', [0, 0, 67, 20], '310');
        gr_marg.add('statictext', [0, 0, 35, 20], 'marg:');
        w.marg = gr_marg.add('edittext', [0, 0, 67, 20], '10');

        var gr_streamsAndFont = pn_mainDims.add('group'),
            gr_streams = gr_streamsAndFont.add('group'),
            gr_font = gr_streamsAndFont.add('group');

        gr_streams.add('statictext', [0, 0, 45, 20], 'bands:');
        w.streamsWidth = gr_streams.add('edittext', [0, 0, 200, 20], '360');
        gr_font.add('statictext', [0, 0, 35, 20], 'font:');
        w.fontSize = gr_font.add('edittext', [0, 0, 41, 20], '12');

        /**
         * dots panel
         * */
        pn_dots.alignChildren = 'left';
        pn_dots.margins = 0;
        var gr_dots = pn_dots.add('group'),
            gr_dotD = gr_dots.add('group'),
            gr_dotIndent = gr_dots.add('group');

        gr_dotD.add('group {preferredSize: [16, 20]}'); // nasty crutch
        gr_dotD.add('statictext', [0, 0, 35, 40], 'diam:');
        w.dotSize = gr_dotD.add('edittext', [0, 0, 40, 20], '0.3');
        gr_dotIndent.add('statictext', [0, 0, 45, 40], 'indent:');
        w.dotIndent = gr_dotIndent.add('edittext', [0, 0, 40, 20], '1.5');

        /**
         * FM panel
         * */
        pn_fm.alignChildren = 'left';
        pn_fm.margins = 0;
        var gr_fm = pn_fm.add('group'),
            gr_leftFM = gr_fm.add('group'),
            gr_rightFM = gr_fm.add('group');

        gr_leftFM.add('group {preferredSize: [16, 20]}'); // nasty crutch
        gr_leftFM.add('statictext', [0, 0, 35, 40], 'left:');
        w.FMLeft = gr_leftFM.add('edittext', [0, 0, 40, 20], '15');
        gr_rightFM.add('statictext', [0, 0, 45, 40], 'right:');
        w.FMRight = gr_rightFM.add('edittext', [0, 0, 40, 20], '0');

        /**
         * cross panel
         * */
        pn_cross.alignChildren = 'left';
        pn_cross.margins = 0;
        var gr_cross = pn_cross.add('group'),
            gr_crossSize = gr_cross.add('group'),
            gr_crossStroke = gr_cross.add('group');

        gr_crossSize.add('group {preferredSize: [16, 20]}'); // nasty crutch
        gr_crossSize.add('statictext', [0, 0, 35, 40], 'size:');
        w.crossLength = gr_crossSize.add('edittext', [0, 0, 40, 20], '5');
        gr_crossStroke.add('statictext', [0, 0, 45, 40], 'stroke:');
        w.crossStroke = gr_crossStroke.add('edittext', [0, 0, 40, 20], '0.15');

        /**
         * buttons panel
         * */
        gr_btns.margins = [0, 13, 0, 0];
        // gr_btns.alignment = 'right';
        var btn_ok = gr_btns.add('button', undefined, 'OK');
        var btn_cancel = gr_btns.add('button', undefined, 'Cancel');
    }

    /**
     * set interface
     * */
    var ini = readIni();
    if (ini) setFace(ini, w);

    /**
     * handlers
     * */
    w.layoutName.onChanging = function () {
        w.fileName.text = trnsRuToEn(w.layoutName.text);
    };

    btn_ok.onClick = function () {

        var z = function () {
            var arr = formatPantStr(w.z.text);
            for (var i = 0; i < arr.length; i++) {
                arr[i] = +arr[i];
            }
            return arr;
        }

        var opts = {
            fileName: w.fileName.text,
            layoutName: w.layoutName.text,
            colsCmyk: new Array(w.colsCmyk.text),
            colsPant: formatPantStr(w.colsPant.text),
            colsServ: formatPantStr(w.colsServ.text/*, 'low'*/),
            lays: ['color', 'test'],
            z: z(),
            marg: +w.marg.text,
            dotSize: +w.dotSize.text,
            dotIndent: +w.dotIndent.text,
            FMLeft: +w.FMLeft.text,
            FMRight: +w.FMRight.text,
            filmW: +w.filmW.text,
            streamsWidth: formatPantStr(w.streamsWidth.text),
            crossLength: +w.crossLength.text,
            crossStroke: +w.crossStroke.text,
            fontSize: +w.fontSize.text,
            fontNames: [
                'Arial-Bold ', 'Arial-BoldMT', 'Arial-Black',
                'ComicSansMS-Bold', 'Calibri-Bold', 'CourierNewPS-BoldMT', 'Courier-Bold', 'Charcoal',
                'DejaVuSans-Bold',
                'Geneva-Bold', 'Impact',
                'MyriadPro-Black', 'MyriadPro-Bold', 'Monaco-Bold',
                'Nimbus-Sans-Bold', 'NimbusMonoL-Bold',
                'TrebuchetMS-Bold', 'Tahoma-Bold',
                'Verdana-Bold'
            ],
            docW: +w.filmW.text + +w.marg.text * 2,
            docH: z() - 6 + +w.marg.text * 2
        };

        writeIni(opts);
        makeupDots(opts);
        w.close();
    }
    w.show();
}

/**
 * fix some user input errors in pantone field
 * @param {String} str - user input string from field of pantone names
 * @return {Array} arr - correct array of pantone names strings
 * */
function formatPantStr(str, firstLetterCase) {
    firstLetterCase = firstLetterCase || 'up';

    str = str.replace(/\s*[;,.]+\s*/g, ',');
    str = str.replace(/\s{2,}/g, ' ');
    str = str.replace(/^\s*/g, '');

    if (firstLetterCase == 'low') {
        str = str.toLowerCase();
    }

    var arr = str.split(',');

    if (firstLetterCase == 'up') {
        for (var i = 0; i < arr.length; i++) {
            var nameArr = arr[i].split(' ');

            for (var j = 0; j < nameArr.length; j++) {
                nameArr[j] = nameArr[j].slice(0, 1).toUpperCase() + nameArr[j].slice(1).toLowerCase();
            }
            arr[i] = nameArr.join(' ');
        }
    }
    return arr;
}

function writeIni(opts) {
    var optsJsonStr = JSON.stringify(opts);
    var jsxName = new File($.fileName).name.slice(0, -4);
    var iniName = jsxName + '.ini';
    var iniFoldPath = Folder.userData + '/LocalStore/' + jsxName + '/';

    if ((new File(iniFoldPath + iniName).exists)) {
        (new File(iniFoldPath + iniName)).remove();
    }

    var iniFolder = new Folder(iniFoldPath);

    if (!iniFolder.exists) iniFolder.create();

    var ini = new File(iniFoldPath + iniName);

    ini.open('e');

    ini.writeln(optsJsonStr);
    ini.close();

    return ini;
}

function readIni() {
    var result = false;
    var jsxName = new File($.fileName).name.slice(0, -4);
    var iniName = jsxName + '.ini';
    var iniFoldPath = Folder.userData + '/LocalStore/' + jsxName + '/';
    var ini = new File(iniFoldPath + iniName);

    if (ini.exists) {
        ini.open('r');
        result = ini.readln();
        ini.close();
    }
    return JSON.parse(result);
}

function focusToFile() {
    illustrator.reveal(new File(activeDocument.fullName));
}

function setFace(opts, w) {
    for (var key in opts) {
        if (w[key] != undefined) {
            w[key].text = opts[key];
        }

    }
}

/**
 * use to methods from this json lib:
 * JSON.stringify(object)
 * JSON.parse(json_string)
 */
function addJSON() {
    if (typeof JSON !== 'object') {
        JSON = {};
    }

    (function () {
        'use strict';

        function f(n) {

            return n < 10 ? '0' + n : n;
        }

        if (typeof Date.prototype.toJSON !== 'function') {

            Date.prototype.toJSON = function (key) {

                return isFinite(this.valueOf())
                    ? this.getUTCFullYear() + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate()) + 'T' +
                    f(this.getUTCHours()) + ':' +
                    f(this.getUTCMinutes()) + ':' +
                    f(this.getUTCSeconds()) + 'Z'
                    : null;
            };

            String.prototype.toJSON =
                Number.prototype.toJSON =
                    Boolean.prototype.toJSON = function (key) {
                        return this.valueOf();
                    };
        }

        var cx,
            escapable,
            gap,
            indent,
            meta,
            rep;

        function quote(string) {

            escapable.lastIndex = 0;
            return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string'
                    ? c
                    : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' : '"' + string + '"';
        }

        function str(key, holder) {

            var i,          // The loop counter.
                k,          // The member key.
                v,          // The member value.
                length,
                mind = gap,
                partial,
                value = holder[key];

            if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
                value = value.toJSON(key);
            }

            if (typeof rep === 'function') {
                value = rep.call(holder, key, value);
            }

            switch (typeof value) {
                case 'string':
                    return quote(value);

                case 'number':

                    return isFinite(value) ? String(value) : 'null';

                case 'boolean':
                case 'null':

                    return String(value);

                case 'object':

                    if (!value) {
                        return 'null';
                    }

                    gap += indent;
                    partial = [];

                    if (Object.prototype.toString.apply(value) === '[object Array]') {

                        length = value.length;
                        for (i = 0; i < length; i += 1) {
                            partial[i] = str(i, value) || 'null';
                        }

                        v = partial.length === 0
                            ? '[]'
                            : gap
                                ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                                : '[' + partial.join(',') + ']';
                        gap = mind;
                        return v;
                    }

                    if (rep && typeof rep === 'object') {
                        length = rep.length;
                        for (i = 0; i < length; i += 1) {
                            k = rep[i];
                            if (typeof k === 'string') {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    } else {

                        for (k in value) {
                            if (Object.prototype.hasOwnProperty.call(value, k)) {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    }

                    v = partial.length === 0 ? '{}'
                        : gap
                            ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                            : '{' + partial.join(',') + '}';
                    gap = mind;
                    return v;
            }
        }

        if (typeof JSON.stringify !== 'function') {
            escapable =
                /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
            meta = {    // table of character substitutions
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"': '\\"',
                '\\': '\\\\'
            };
            JSON.stringify = function (value, replacer, space) {

                var i;
                gap = '';
                indent = '';

                if (typeof space === 'number') {
                    for (i = 0; i < space; i += 1) {
                        indent += ' ';
                    }

                } else if (typeof space === 'string') {
                    indent = space;
                }

                rep = replacer;
                if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                        typeof replacer.length !== 'number')) {
                    throw new Error('JSON.stringify');
                }

                return str('', {'': value});
            };
        }

        if (typeof JSON.parse !== 'function') {
            cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
            JSON.parse = function (text, reviver) {

                var j;

                function walk(holder, key) {

                    var k, v, value = holder[key];
                    if (value && typeof value === 'object') {
                        for (k in value) {
                            if (Object.prototype.hasOwnProperty.call(value, k)) {
                                v = walk(value, k);
                                if (v !== undefined) {
                                    value[k] = v;
                                } else {
                                    delete value[k];
                                }
                            }
                        }
                    }
                    return reviver.call(holder, key, value);
                }

                text = String(text);
                cx.lastIndex = 0;
                if (cx.test(text)) {
                    text = text.replace(cx, function (a) {
                        return '\\u' +
                            ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                    });
                }

                if (/^[\],:{}\s]*$/
                        .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                            .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                            .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

                    j = eval('(' + text + ')');

                    return typeof reviver === 'function'
                        ? walk({'': j}, '')
                        : j;
                }

                throw new SyntaxError('JSON.parse');
            };
        }

        if (!Object.prototype.toJSONString) {
            Object.prototype.toJSONString = function (filter) {
                return JSON.stringify(this, filter);
            };
            Object.prototype.parseJSON = function (filter) {
                return JSON.parse(this, filter);
            };
        }
    }());
}

function makeupDots(o) {

    var PT_TO_MM = 2.834645668,
        book = new ColorBooks(),
        bookPant = book.pant(),
        bookServ = book.serv(),
        bookCmyk = book.cmyk();

    _makeDoc(o);

    for (var i = 0; i < o.colsPant.length; i++) {
        setSpotByName('PANTONE ' + o.colsPant[i] + ' C', (bookPant[o.colsPant[i]]).split(','));
    }
    for (var i = 0; i < o.colsServ.length; i++) {
        setSpotByName(o.colsServ[i], bookServ[o.colsServ[i]].split(','));
    }

    _makeLays(o);
    _makeLines(o);
    _makeDots(o);
    _makeGuides(o);
    var crossGroup = _makeCross(o);
    var title = _makeTitle(o);

    function _makeDoc(o) {

        var dPres = 'dots',
            pSet = new DocumentPreset,
            newDoc;

        pSet.units = RulerUnits.Millimeters;
        pSet.colorMode = DocumentColorSpace.CMYK;
        pSet.height = o.docH * PT_TO_MM;
        pSet.width = o.docW * PT_TO_MM;
        pSet.title = o.fileName;

        newDoc = documents.addDocument(dPres, pSet, false);

        return newDoc;
    }

    function _makeLays(o) {
        activeDocument.layers[0].name = o.lays[0];
        var layTest = activeDocument.layers.add();
        layTest.name = o.lays[1];
    }

    function _makeLines(o) {
        var group = activeDocument.activeLayer.groupItems.add(),
            marg = o.marg * PT_TO_MM,
            docW = o.docW * PT_TO_MM,
            docH = o.docH * PT_TO_MM,
            lines = [
                [[marg, docH - marg], [docW - marg, docH - marg]],
                [[marg, marg], [docW - marg, marg]]
            ]

        for (var i = 0; i < lines.length; i++) {
            var line = group.pathItems.add();
            line.setEntirePath(lines[i]);
            paintInSpot({
                item: line,
                stroked: true,
                strokeWidth: o.strokeWidth,
                strokeOverprint: true
            });
        }
    }

    function _makeDots(o) {

        var group = activeDocument.activeLayer.groupItems.add(),
            groupTop = activeDocument.activeLayer.groupItems.add(),
            groupBot = activeDocument.activeLayer.groupItems.add(),
            lay = activeDocument.layers[0],
            top = (o.docH / 2 ) * PT_TO_MM,
            indent = o.dotIndent * PT_TO_MM,
            docW = o.docW * PT_TO_MM,
            dotSize = o.dotSize * PT_TO_MM,
            marg = o.marg * PT_TO_MM,
            lefts = [indent + marg + o.FMLeft * PT_TO_MM, docW - indent - marg - o.FMRight * PT_TO_MM];

        var currWidth = marg + o.streamsWidth[0] * PT_TO_MM;
        for (var i = 0; i < o.streamsWidth.length - 1; i++) {
            lefts.push(currWidth - indent - o.FMRight * PT_TO_MM, currWidth + indent + o.FMLeft * PT_TO_MM);
            currWidth += o.streamsWidth[i + 1] * PT_TO_MM;
        }

        groupBot.move(group, ElementPlacement.INSIDE);
        groupTop.move(group, ElementPlacement.INSIDE);

        for (var i = 0; i < o.streamsWidth.length * 2; i++) {
            var bottDot = _makeDot(lefts[i], dotSize + 0.1 * PT_TO_MM, groupBot);
            paintInCMYK({
                item: bottDot,
                filled: true,
                fillColor: 'white'
            })
        }
        for (var i = 0; i < o.streamsWidth.length * 2; i++) {
            var topDot = _makeDot(lefts[i], dotSize, groupTop);
            paintInSpot({
                item: topDot,
                filled: true,
            })
        }

        function _makeDot(left, dotSize, group) {
            var dotTop = group.pathItems.ellipse(top + dotSize / 2, left - dotSize / 2, dotSize, dotSize);
            return dotTop;
        }
    }

    function _makeGuides(o) {
        var LIMIT = 2000 * PT_TO_MM,
            h = o.docH * PT_TO_MM,
            w = o.docW * PT_TO_MM,
            marg = o.marg * PT_TO_MM,
            vGuides = [
                [[marg, -LIMIT + h / 2], [marg, LIMIT + h / 2]],
                /*[ [ w / 2, -LIMIT + h / 2 ], [ w / 2, LIMIT + h / 2 ] ],*/                    // центральная направляющая
                [[w - marg, -LIMIT + h / 2], [w - marg, LIMIT + h / 2]]
            ],
            hGuides = [
                [[-LIMIT + w / 2, h - marg], [LIMIT + w / 2, h - marg]],
                [[-LIMIT + w / 2, h / 2], [LIMIT + w / 2, h / 2]],
                [[-LIMIT + w / 2, marg], [LIMIT + w / 2, marg]]
            ];

        var currWidth = marg + o.streamsWidth[0] * PT_TO_MM;
        for (var i = 0; i < o.streamsWidth.length - 1; i++) {                              // направляющие между ручьями
            vGuides.push([[currWidth, -LIMIT + h / 2], [currWidth, LIMIT + h / 2]]);
            currWidth += o.streamsWidth[i + 1] * PT_TO_MM;
        }

        for (var i = 0; i < vGuides.length; i++) {
            var vGuide = activeDocument.activeLayer.pathItems.add();
            vGuide.setEntirePath(vGuides[i]);
            vGuide.guides = true;
        }

        for (var j = 0; j < hGuides.length; j++) {
            var hGuide = activeDocument.activeLayer.pathItems.add();
            hGuide.setEntirePath(hGuides[j]);
            hGuide.guides = true;
        }
    }

    function _makeTitle(o) {
        var top = 0,
            left = 0,
            fileName = ((o.layoutName).replace(/_/g, ' ') + ' ' + formatDate(new Date())).toUpperCase(),
            titleGroup = activeDocument.activeLayer.groupItems.add(),
            contentsCmyk = o.colsCmyk[0].split(''),
            fontName = (getFontsAvailable(o.fontNames))[0],
            fontSize = o.fontSize,
            container, contents, newFrame,
            fileNameFrame = addTxtFrame(fileName, titleGroup, top, left, fontSize, fontName);
        paintInSpot({
            item: fileNameFrame,
            filled: true,
            fillOverprint: true
        });

        left += fileNameFrame.width + 10;

        for (var i = 0; i < contentsCmyk.length; i++) {
            container = titleGroup;
            contents = _setPantAlias(contentsCmyk[i]).toUpperCase();
            newFrame = addTxtFrame(contents, container, top, left, fontSize, fontName);
            paintInCMYK({
                item: newFrame,
                filled: true,
                cmykComponents: bookCmyk[contentsCmyk[i]].split(','),
                fillOverprint: true
            });
            left += newFrame.width;
        }

        for (i = 0; i < o.colsPant.length; i++) {
            container = titleGroup;
            contents = _setPantAlias(o.colsPant[i]).toUpperCase();
            newFrame = addTxtFrame(contents, container, top, left, fontSize, fontName);
            paintInSpot({
                item: newFrame,
                filled: true,
                spotName: 'PANTONE ' + o.colsPant[i] + ' C',
                fillOverprint: true
            });
            left += newFrame.width;
        }

        for (i = 0; i < o.colsServ.length; i++) {
            container = titleGroup;
            contents = _setPantAlias(o.colsServ[i]).toUpperCase();
            newFrame = addTxtFrame(contents, container, top, left, fontSize, fontName);
            paintInSpot({
                item: newFrame,
                filled: true,
                spotName: o.colsServ[i],
                fillOverprint: true
            });
            left += newFrame.width;
        }

        titleGroup.position = [activeDocument.width / 2 - titleGroup.width / 2,
            activeDocument.height - o.marg / 2 - titleGroup.height / 2
        ];

        (function makeTitleMini() {
            var titleMini = titleGroup.duplicate();
            var num = titleMini.pageItems[titleMini.pageItems.length - 1].textRange.contents.replace(
                /[^0-9]/g, '').slice(0, 9);
            titleMini.pageItems[titleMini.pageItems.length - 1].textRange.contents = num;
            titleMini.rotate(90/*, true, false, false, false, Transformation.TOPLEFT*/);

            for (var i = 0; i < titleMini.pageItems.length; i++) {
                titleMini.pageItems[i].createOutline();
            }
            var a = titleMini.width;
            var scaleFactor = 3.5 * 100 / a;
            titleMini.resize(scaleFactor, scaleFactor);

            titleMini.pageItems[titleMini.pageItems.length - 1].position =
                [
                    titleMini.pageItems[titleMini.pageItems.length - 2].position[0],
                    titleMini.pageItems[titleMini.pageItems.length - 2].position[1] -
                    titleMini.pageItems[titleMini.pageItems.length - 2].width - 6 * PT_TO_MM
                ];
            titleMini.position = [-titleMini.width / 2,
                crossGroup.position[1] + (titleMini.height -
                    titleMini.pageItems[titleMini.pageItems.length - 1].height - 5.5 * PT_TO_MM)
            ];
            titleMini.move(crossGroup, ElementPlacement.INSIDE);

            crossGroup.translate(
                o.marg * PT_TO_MM + o.dotIndent * PT_TO_MM + crossGroup.width,
                activeDocument.height / 2 - o.crossLength * PT_TO_MM / 2
            )
        })();

        function _setPantAlias(name) {

            if (name.length < 3 || isNum(name)) return name;

            var str1 = name.match(/\b[^0-9 ]/g).join(''),
                str2 = name.match(/[0-9]{1,3}/g) || '';

            name == 'Rubine Red' ? str1 = 'Rub' : '';
            name == 'Rhodamine Red' ? str1 = 'Rod' : '';
            name == "Process Yellow" ? str1 = 'Y2' : '';
            name == "Process Magenta" ? str1 = 'M2' : '';
            name == "Process Cyan" ? str1 = 'C2' : '';
            name == "Black" ? str1 = 'K2' : '';
            name == "Reflex Blue" ? str1 = 'Rf' : '';
            name == "Process Blue" ? str1 = 'PrBlue' : '';
            name == "Orange 021" ? (str1 = '021', str2 = '') : '';
            name == "Blue 072" ? (str1 = '072', str2 = '') : '';

            return str1 + str2;
        }
    }

    function _makeCross(o) {
        var crossGr = activeDocument.activeLayer.groupItems.add(),
            cross, crossServ, crossCmyk, crossPant,
            scalePct = 100;

        for (var i = 0; i < o.colsServ.length; i++) {
            crossServ = _makeOneEl(o.crossLength * PT_TO_MM);
            crossServ.move(crossGr, ElementPlacement.INSIDE);
            crossServ.resize(scalePct, scalePct);
            scalePct -= 10;
            paintInSpot({
                item: crossServ,
                strokeOverprint: true,
                stroked: true,
                strokeWidth: o.crossStroke * 2,
                spotName: o.colsServ[i]
            })
        }

        crossCmyk = _makeOneEl(o.crossLength * PT_TO_MM);
        crossCmyk.move(crossGr, ElementPlacement.INSIDE);
        paintInCMYK({
            item: crossCmyk,
            strokeOverprint: true,
            stroked: true,
            strokeWidth: o.crossStroke,
            cmykComponents: bookCmyk[o.colsCmyk].split(',')
        })

        scalePct = 95;
        for (i = 0; i < o.colsPant.length; i++) {
            crossPant = _makeOneEl(o.crossLength * PT_TO_MM);
            crossPant.move(crossGr, ElementPlacement.INSIDE);
            crossPant.resize(scalePct, scalePct);
            scalePct -= 5;
            paintInSpot({
                item: crossPant,
                strokeOverprint: true,
                stroked: true,
                strokeWidth: o.crossStroke,
                spotName: 'PANTONE ' + o.colsPant[i] + ' C'
            })
        }

        return crossGr;

        function _makeOneEl(len, color) {
            var lineGr = activeDocument.activeLayer.groupItems.add(),
                lineH = lineGr.pathItems.add();

            lineH.setEntirePath([[0, 0], [0, len]]);

            var lineV = lineH.duplicate();
            lineV.rotate(90);
            lineV.resize(200 / o.crossLength, 100);

            return lineGr;
        }

    }

    /**
     *** LIBRARY ***
     **/

    /**
     * добавляет пантон в палитру
     *
     * @param{String} spotName имя пантона
     * @param{Array} cmykComponents цветовые компоненты класса Number [ c, m, y, k ]
     * @return{SpotColor}  объект класса SpotColor
     */
    function setSpotByName(spotName, cmykComponents) {

        if (documents.length == 0) return;

        var spot = _getSpotByNameStrict(spotName),
            sameSpot = _getSameSpot(spotName);

        if (spot) { // точное совпадение
            //  $.writeln ( spot.spotName );
            spot = _modifySpot(spot, false, cmykComponents);
            return spot;
        } else if (sameSpot) {
            sameSpot = _modifySpot(sameSpot, spotName, cmykComponents);
            //  $.writeln ( sameSpot.spotName );
            return sameSpot;
        } else {
            var newSpot = _addNewSpot(spotName, cmykComponents);
            //  $.writeln ( newSpot.spot.spotName );
            return sw;
        }

        function _getSpotByNameStrict(spotName) {
            for (var i = 0; i < activeDocument.spots.length; i++) {
                if (activeDocument.spots[i].name == spotName) {
                    return activeDocument.spots[i];
                } else {
                    continue;
                }
            }
            return false;
        }

        function _getSameSpot(spotName) {
            try {
                return activeDocument.spots.getByName(spotName);
            } catch (e) {
                return false;
            }
        }

        function _addNewSpot(spotName, cmykComponents) {

            var newSpot = activeDocument.spots.add(),
                newColor = new CMYKColor(),
                newSpotColor = new SpotColor();

            newColor.cyan = +cmykComponents[0];
            newColor.magenta = +cmykComponents[1];
            newColor.yellow = +cmykComponents[2];
            newColor.black = +cmykComponents[3];

            sw.name = spotName;
            sw.colorType = ColorModel.SPOT;
            sw.color = newColor;

            newSpotColor.spot = sw;
            newSpotColor.tint = 100;

            return newSpotColor;
        }

        function _modifySpot(spot, spotName, cmykComponents) {

            spot.color.cyan = +cmykComponents[0];
            spot.color.magenta = +cmykComponents[1];
            spot.color.yellow = +cmykComponents[2];
            spot.color.black = +cmykComponents[3];

            if (spotName) {
                spot.name = spotName;
            }

            return spot;
        }
    }

    /**
     * красит один элемент (path или textFrame) цветом пантона из палитры swatches
     *
     * @param {Object} o объект с параметрами (
     * item, spotName, stroked, filled, strokeWidth, tint, fillOverprint, strokeOverprint )
     */
    function paintInSpot(o) {
        var o = o || {},
            item = o.item || false,
            spotName = o.spotName || '[Registration]',
            stroked = o.stroked || false,
            filled = o.filled || false,
            strokeWidht = o.strokeWidth * PT_TO_MM || 0.15 * PT_TO_MM,
            tint = o.tint || 100,
            fillOverprint = o.fillOverprint || false,
            strokeOverprint = o.strokeOverprint || false;

        if (!item) return;

        var spotItem = activeDocument.spots.getByName(spotName),
            spotCol = spotItem.color,
            newSpotColor = new SpotColor();

        newSpotColor.spot = spotItem;
        newSpotColor.tint = tint;

        _paint(item);

        function _paint(item) {
            try {
                var items = item.pageItems.length;
            } catch (e) {
                var items = 1;
            }

            for (var i = 0; i < items; i++) {
                try {
                    switch (item.typename) {

                        case 'GroupItem':
                            _paint(item.pageItems[i]);
                            break;

                        case 'PathItem':
                            item.filled = filled;
                            item.stroked = stroked;
                            if (filled) {
                                item.fillColor = newSpotColor;
                                item.fillOverprint = fillOverprint;
                            }
                            if (stroked) {
                                item.strokeWidth = strokeWidht;
                                item.strokeColor = newSpotColor;
                                item.strokeOverprint = strokeOverprint;
                            }
                            break;

                        case 'TextFrame':
                            var frameChars = item.textRange;
                            if (filled) {
                                frameChars.characterAttributes.fillColor = newSpotColor;
                                frameChars.characterAttributes.overprintFill = fillOverprint;
                            }
                            if (stroked) {
                                frameChars.characterAttributes.strokeWeight = strokeWidht;
                                frameChars.characterAttributes.strokeColor = newSpotColor;
                                frameChars.characterAttributes.overprintStroke = overprintStroke;
                            }
                            break;

                        default:
                            break;
                    }
                } catch (e) {
                }
            }

        }
    }

    /**
     * красит один элемент (path или textFrame) цветом CMYK
     *
     * @param {Object} o объект с параметрами (
     * item, cmykComponents, stroked, filled, strokeWidth, fillOverprint, strokeOverprint )
     */
    function paintInCMYK(o) {

        var o = o || {},
            item = o.item || false,
            cmykComponents = o.cmykComponents || [0, 0, 0, 0],
            stroked = o.stroked || false,
            filled = o.filled || false,
            strokeWidht = o.strokeWidth * PT_TO_MM || 0.15 * PT_TO_MM,
            fillOverprint = o.fillOverprint || false,
            strokeOverprint = o.strokeOverprint || false;

        if (!item) return;

        var newCMYK = new CMYKColor();

        newCMYK.cyan = +cmykComponents[0];
        newCMYK.magenta = +cmykComponents[1];
        newCMYK.yellow = +cmykComponents[2];
        newCMYK.black = +cmykComponents[3];

        _paint(item);

        function _paint(item) {

            var items;
            if (item.pageItems) {
                items = item.pageItems.length
            } else {
                items = 1;
            }

            for (var i = 0; i < items; i++) {
                try {
                    switch (item.typename) {

                        case 'GroupItem' :
                            _paint(item.pageItems[i]);
                            break;

                        case 'PathItem':
                            item.filled = filled;
                            item.stroked = stroked;
                            if (filled) {
                                item.fillColor = newCMYK;
                                item.fillOverprint = fillOverprint;
                            }
                            if (stroked) {
                                item.strokeWidth = strokeWidht;
                                item.strokeColor = newCMYK;
                                item.strokeOverprint = strokeOverprint;
                            }
                            break;

                        case 'TextFrame':
                            var frameChars = item.textRange;
                            if (filled) {
                                frameChars.characterAttributes.fillColor = newCMYK;
                                frameChars.characterAttributes.overprintFill = fillOverprint;
                            }
                            if (stroked) {
                                frameChars.characterAttributes.strokeColor = newCMYK;
                                frameChars.characterAttributes.strokeWeight = strokeWidht;
                                frameChars.characterAttributes.overprintStroke = strokeOverprint;
                            }
                            break;

                        default:
                            break;
                    }
                } catch (e) {
                }
            }

        }
    }

    function paintInReg(o) {
        return (app.activeDocument.swatches.getByName('[Registration]')).color;
    }

    function addTxtFrame(contents, container, top, left, fontSize, fontName/*, color*//*, overprint*/) {
        var pointText = container.textFrames.add();

        pointText.textRange.size = fontSize;
        pointText.contents = contents;
        pointText.top = top;
        pointText.left = left;

        for (var i = 0; i < pointText.characters.length; i++) {
            pointText.characters[i].characterAttributes.textFont = textFonts.getByName(fontName);
        }

        return pointText;
    }

    function makeRandStr() {
        return ("" + (+new Date()) * Math.random() * 10000).slice(-7, -1);
    }

    function formatDate(date) {

        var dd = date.getDate()
        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1
        if (mm < 10) mm = '0' + mm;

        var yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        var hh = date.getHours();
        if (hh < 10) hh = '0' + hh;

        var mn = date.getMinutes();
        if (mn < 10) mn = '0' + mn;

        return dd + '.' + mm + '.' + yy /*+ '   ' + hh + ':' + mn*/;
    }

    function isNum(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function getFontsAvailable(fontNamesArray) {
        var fonts = [];

// записать шрифты с поддержкой всех символов логических операций в массив
        for (var i = 0; i < fontNamesArray.length; i++) {
            try {
                fonts.push((textFonts.getByName(fontNamesArray[i]).name));
            } catch (e) {
            }
        }
        return fonts;
    }

    function Engines() {

        return {
            soloflex: {
                z: [ // формный цилиндр Soloflex
                    260, 265, 270, 275, 280, 285, 290,
                    300, 305, 310, 315, 320, 330, 340, 350, 355, 360, 365, 370, 380, 390,
                    400, 410, 420, 430, 440, 450, 460, 480, 495,
                    500, 510, 520, 540, 560, 580,
                    600
                ]
            },
            miraflex: {
                z: [ // формный цилиндр Miraflex
                    300, 320, 330, 340, 350, 360, 370, 380, 390,
                    400, 410, 420, 430, 440, 450, 460, 480,
                    500, 520, 530, 540, 550, 560, 580,
                    600, 640
                ]
            },
            propheteer: {
                z: [ // формный цилиндр Propheteer
                    215.9, 225.425, 228.6, 241.3, 247.65,
                    250.825, 254, 260.35, 279.4, 285.75,
                    288.93, 292.10, 295.275, 298.45, 304.8,
                    314.33, 327.025, 330.2, 336.55, 339.73,
                    361.95, 381, 400.05, 403.225, 412.75,
                    419.1, 609.6
                ],
                distort: [ // коэфициент дисторции для профитира
                    95.41, 95.61, 95.67, 95.89, 96,
                    96.05, 96.1, 96.2, 96.49, 96.57,
                    96.61, 96.65, 96.52, 96.72, 96.78,
                    96.88, 97, 97.02, 97.08, 97.11,
                    97.29, 97.42, 97.54, 97.56, 97.62,
                    97.65, 98.38
                ]
            },

            getNames: function () {
                var arr = [];
                for (var key in this) {
                    if (typeof this[key] == 'function') continue;
                    arr.push(key);
                }
                return arr;
            }

        }
    }

    /**
     * три группы цветов для меток: cmyk, служебные и pantone
     *
     * @constructor
     */
    function ColorBooks() {
        this.cmyk = function () {
            return {
                "c": '100,0,0,0',
                "m": '0,100,0,0',
                "y": '0,0,100,0',
                "k": '0,0,0,100',
                "cm": '100,100,0,0',
                "cy": '100,0,100,0',
                "ck": '100,0,0,100',
                "my": '0,100,100,0',
                "mk": '0,100,0,100',
                "yk": '0,0,100,100',
                "cmy": '100,100,100,0',
                "cyk": '100,0,100,100',
                "myk": '0,100,100,100',
                "cmk": '100,100,0,100',
                "cmyk": '100,100,100,100',
                "white": '0,0,0,0'
            }
        }
        this.serv = function () {
            return {
                "Film": '0,0,0,20',
                "W": '81,61,5,5',
                "W2": '61,5,81,5',
                "L": '5,81,61,5',
                "Pr": '5,5,81,61',
            }
        }
        this.pant = function () {
            return {
                "Process Yellow": '0,0,100,0',
                "Process Magenta": '0,100,0,0',
                "Process Cyan": '100,0,0,0',
                "Process Black": '0,0,0,100',
                "Yellow 012": '0,1,100,0',
                "Orange 021": '0,53,100,0',
                "Warm Red": '0,75,90,0',
                "Red 032": '0,90,86,0',
                "Rubine Red": '0,100,15,4',
                "Rhodamine Red": '3,89,0,0',
                "Purple": '38,88,0,0',
                "Violet": '98,100,0,0',
                "Blue 072": '100,88,0,5',
                "Reflex Blue": '100,73,0,2',
                "Process Blue": '100,10,0,10',
                "Green": '100,0,59,0',
                "Black": '0,13,49,98',
                "Black 2": '0,3,55,87',
                "Black 3": '60,0,60,91',
                "Black 4": '0,22,100,89',
                "Black 5": '0,40,22,87',
                "Black 6": '100,35,0,100',
                "Black 7": '0,0,15,82',
                "Warm Gray 1": '0,2,3,6',
                "Warm Gray 2": '0,2,5,9',
                "Warm Gray 3": '0,4,8,17',
                "Warm Gray 4": '0,4,9,24',
                "Warm Gray 5": '0,5,10,29',
                "Warm Gray 6": '0,6,12,31',
                "Warm Gray 7": '0,8,14,38',
                "Warm Gray 8": '0,9,16,43',
                "Warm Gray 9": '0,11,20,47',
                "Warm Gray 10": '0,14,28,55',
                "Warm Gray 11": '0,17,34,62',
                "Cool Gray 1": '0,0,0,6',
                "Cool Gray 2": '0,0,0,10',
                "Cool Gray 3": '0,0,0,17',
                "Cool Gray 4": '0,0,0,24',
                "Cool Gray 5": '0,0,0,29',
                "Cool Gray 6": '0,0,0,31',
                "Cool Gray 7": '0,0,0,37',
                "Cool Gray 8": '0,1,0,43',
                "Cool Gray 9": '0,1,0,51',
                "Cool Gray 10": '0,2,0,60',
                "Cool Gray 11": '0,2,0,68',
                100: '0,0,56,0',
                101: '0,0,68,0',
                102: '0,0,95,0',
                103: '5,5,100,16',
                104: '7,13,100,28',
                105: '13,18,88,45',
                106: '0,0,75,0',
                107: '0,0,92,0',
                108: '0,5,98,0',
                109: '0,9,100,0',
                110: '2,22,100,8',
                111: '8,21,100,28',
                112: '10,20,100,40',
                113: '0,2,83,0',
                114: '0,4,87,0',
                115: '0,6,87,0',
                116: '0,14,100,0',
                117: '6,27,100,12',
                118: '7,28,100,30',
                119: '17,22,100,47',
                120: '0,5,64,0',
                121: '0,8,70,0',
                122: '0,11,80,0',
                123: '0,19,89,0',
                124: '0,30,100,0',
                125: '6,32,100,24',
                126: '11,31,100,36',
                127: '0,4,62,0',
                128: '0,7,75,0',
                129: '0,11,78,0',
                130: '0,32,100,0',
                131: '2,39,100,10',
                132: '9,38,100,32',
                133: '19,37,100,59',
                134: '0,12,60,0',
                135: '0,21,76,0',
                136: '0,28,87,0',
                137: '0,41,100,0',
                138: '0,52,100,0',
                139: '7,49,100,25',
                140: '19,49,100,54',
                141: '0,16,65,0',
                142: '0,24,78,0',
                143: '0,32,87,0',
                144: '0,51,100,0',
                145: '4,53,100,8',
                146: '7,50,100,34',
                147: '19,38,90,58',
                148: '0,17,43,0',
                149: '0,24,51,0',
                150: '0,41,78,0',
                151: '0,60,100,0',
                152: '0,66,100,0',
                153: '5,64,100,17',
                154: '8,66,100,41',
                155: '0,12,34,0',
                156: '0,23,49,0',
                157: '0,42,74,0',
                158: '0,62,95,0',
                159: '1,72,100,7',
                160: '6,71,100,31',
                161: '16,67,100,71',
                162: '0,25,35,0',
                163: '0,44,52,0',
                164: '0,59,80,0',
                165: '0,70,100,0',
                166: '0,76,100,0',
                167: '5,77,100,15',
                168: '12,80,100,60',
                169: '0,30,26,0',
                170: '0,48,50,0',
                171: '0,61,72,0',
                172: '0,73,87,0',
                173: '0,82,94,2',
                174: '8,86,100,36',
                175: '18,79,78,56',
                176: '0,35,18,0',
                177: '0,54,38,0',
                178: '0,70,58,0',
                179: '0,87,85,0',
                180: '3,91,86,12',
                181: '21,93,88,50',
                182: '0,31,8,0',
                183: '0,49,17,0',
                184: '0,73,32,0',
                185: '0,93,79,0',
                186: '2,100,85,6',
                187: '7,100,82,26',
                188: '16,100,65,58',
                189: '0,39,10,0',
                190: '0,56,18,0',
                191: '0,79,36,0',
                192: '0,94,64,0',
                193: '2,99,62,11',
                194: '8,100,55,37',
                195: '19,90,50,55',
                196: '0,23,6,0',
                197: '0,46,12,0',
                198: '0,82,37,0',
                199: '0,100,72,0',
                200: '3,100,70,12',
                201: '7,100,68,32',
                202: '9,100,64,48',
                203: '0,37,2,0',
                204: '0,59,5,0',
                205: '0,83,16,0',
                206: '0,100,50,0',
                207: '5,100,48,22',
                208: '15,100,37,45',
                209: '20,97,40,58',
                210: '0,45,4,0',
                211: '0,61,6,0',
                212: '0,78,8,0',
                213: '0,92,18,0',
                214: '0,100,24,4',
                215: '6,100,26,24',
                216: '13,96,26,52',
                217: '1,32,0,0',
                218: '2,63,0,0',
                219: '1,92,4,0',
                220: '5,100,25,24',
                221: '9,100,26,38',
                222: '20,100,22,61',
                223: '1,50,0,0',
                224: '3,70,0,0',
                225: '4,88,0,0',
                226: '0,100,2,0',
                227: '7,100,10,21',
                228: '16,100,14,42',
                229: '26,100,19,61',
                230: '1,41,0,0',
                231: '3,60,0,0',
                232: '6,70,0,0',
                233: '12,100,0,0',
                234: '18,100,6,18',
                235: '20,100,11,41',
                236: '3,37,0,0',
                237: '6,53,0,0',
                238: '12,74,0,0',
                239: '16,82,0,0',
                240: '20,89,0,0',
                241: '30,100,2,2',
                242: '32,100,11,41',
                243: '4,32,0,0',
                244: '9,45,0,0',
                245: '16,56,0,0',
                246: '31,88,0,0',
                247: '35,95,0,0',
                248: '42,100,0,0',
                249: '42,95,10,31',
                250: '7,28,0,0',
                251: '17,43,0,0',
                252: '27,67,0,0',
                253: '42,91,0,0',
                254: '48,96,0,0',
                255: '53,96,10,24',
                256: '9,22,0,0',
                257: '18,36,0,0',
                258: '51,79,0,0',
                259: '67,100,4,5',
                260: '66,100,8,27',
                261: '62,100,9,44',
                262: '58,92,12,54',
                263: '10,17,0,0',
                264: '26,37,0,0',
                265: '52,66,0,0',
                266: '76,90,0,0',
                267: '82,97,0,0',
                268: '82,98,0,12',
                269: '80,98,5,27',
                270: '29,25,0,0',
                271: '49,44,0,0',
                272: '61,56,0,0',
                273: '100,100,0,22',
                274: '100,100,7,38',
                275: '100,100,7,56',
                276: '100,100,10,79',
                277: '35,9,0,0',
                278: '45,14,0,0',
                279: '68,34,0,0',
                280: '100,85,5,22',
                281: '100,85,5,36',
                282: '100,90,13,68',
                283: '42,9,0,0',
                284: '59,17,0,0',
                285: '90,48,0,0',
                286: '100,75,0,0',
                287: '100,75,2,18',
                288: '100,80,6,32',
                289: '100,76,12,70',
                290: '23,0,1,0',
                291: '38,4,0,0',
                292: '59,11,0,0',
                293: '100,69,0,4',
                294: '100,69,7,30',
                295: '100,69,8,54',
                296: '100,73,28,86',
                297: '52,0,1,0',
                298: '67,2,0,0',
                299: '86,8,0,0',
                300: '99,50,0,0',
                301: '100,53,4,19',
                302: '100,48,12,58',
                303: '100,47,22,82',
                304: '34,0,6,0',
                305: '54,0,6,0',
                306: '75,0,5,0',
                307: '100,22,2,18',
                308: '100,18,8,50',
                309: '99,27,22,80',
                310: '48,0,9,0',
                311: '68,0,13,0',
                312: '88,0,11,0',
                313: '100,0,11,2',
                314: '100,5,14,17',
                315: '100,12,21,44',
                316: '97,21,33,73',
                317: '23,0,10,0',
                318: '40,0,14,0',
                319: '59,0,22,0',
                320: '96,0,31,2',
                321: '96,3,35,12',
                322: '97,9,39,34',
                323: '96,16,42,57',
                324: '35,0,14,0',
                325: '53,0,23,0',
                326: '81,0,39,0',
                327: '100,2,60,14',
                328: '100,10,61,38',
                329: '100,14,60,49',
                330: '90,21,60,65',
                331: '27,0,15,0',
                332: '33,0,18,0',
                333: '49,0,28,0',
                334: '99,0,70,0',
                335: '97,6,69,19',
                336: '95,11,70,44',
                337: '39,0,22,0',
                338: '50,0,31,0',
                339: '84,0,59,0',
                340: '99,0,84,0',
                341: '95,5,82,24',
                342: '93,10,75,43',
                343: '89,19,72,60',
                344: '32,0,30,0',
                345: '43,0,41,0',
                346: '53,0,51,0',
                347: '93,0,100,0',
                348: '96,2,100,12',
                349: '90,12,95,40',
                350: '80,21,79,64',
                351: '27,0,23,0',
                352: '37,0,31,0',
                353: '41,0,36,0',
                354: '81,0,92,0',
                355: '91,0,100,0',
                356: '91,4,100,25',
                357: '92,18,94,61',
                358: '34,0,42,0',
                359: '40,0,50,0',
                360: '63,0,84,0',
                361: '77,0,100,0',
                362: '78,0,100,2',
                363: '76,3,100,18',
                364: '71,4,100,45',
                365: '24,0,44,0',
                366: '31,0,51,0',
                367: '41,0,68,0',
                368: '65,0,100,0',
                369: '68,0,100,0',
                370: '62,1,100,25',
                371: '50,9,98,61',
                372: '16,0,41,0',
                373: '21,0,48,0',
                374: '30,0,64,0',
                375: '46,0,90,0',
                376: '54,0,100,0',
                377: '50,1,100,20',
                378: '47,11,99,64',
                379: '13,0,61,0',
                380: '18,0,82,0',
                381: '25,0,98,0',
                382: '28,0,100,0',
                383: '29,1,100,18',
                384: '26,4,99,35',
                385: '24,14,94,55',
                386: '9,0,66,0',
                387: '12,0,80,0',
                388: '15,0,80,0',
                389: '21,0,85,0',
                390: '27,0,100,3',
                391: '23,5,100,33',
                392: '24,11,100,48',
                393: '6,0,55,0',
                394: '6,0,72,0',
                395: '9,0,90,0',
                396: '10,0,95,0',
                397: '14,2,100,15',
                398: '14,6,100,24',
                399: '16,9,100,36',
                400: '6,7,13,16',
                401: '10,11,17,27',
                402: '13,16,21,36',
                403: '18,21,27,47',
                404: '20,25,30,59',
                405: '26,31,35,72',
                406: '5,8,10,16',
                407: '9,14,13,28',
                408: '12,19,19,40',
                409: '17,25,22,51',
                410: '22,33,28,60',
                411: '30,42,34,75',
                412: '52,59,45,90',
                413: '9,5,12,14',
                414: '13,8,17,26',
                415: '22,14,23,38',
                416: '28,18,29,51',
                417: '33,23,35,63',
                418: '38,26,40,72',
                419: '86,70,69,95',
                420: '6,4,7,13',
                421: '13,8,11,26',
                422: '19,12,13,34',
                423: '22,14,18,45',
                424: '30,20,19,58',
                425: '48,29,26,76',
                426: '94,77,53,94',
                427: '7,3,5,8',
                428: '10,4,4,14',
                429: '21,11,9,23',
                430: '33,18,13,40',
                431: '45,25,16,59',
                432: '65,43,26,78',
                433: '90,68,41,90',
                434: '5,11,8,12',
                435: '9,16,8,19',
                436: '12,24,9,28',
                437: '21,40,18,56',
                438: '42,56,47,77',
                439: '53,61,47,83',
                440: '63,62,59,88',
                441: '22,4,15,8',
                442: '25,7,19,20',
                443: '33,12,18,30',
                444: '45,16,25,50',
                445: '52,23,30,74',
                446: '54,27,36,82',
                447: '50,30,40,90',
                448: '33,43,80,82',
                449: '31,38,75,76',
                450: '32,39,87,74',
                451: '21,15,54,31',
                452: '16,11,45,25',
                453: '11,7,35,15',
                454: '11,5,29,8',
                455: '23,38,89,70',
                456: '10,23,100,43',
                457: '9,24,100,32',
                458: '5,4,73,7',
                459: '5,3,64,4',
                460: '2,2,55,3',
                461: '2,1,45,2',
                462: '28,48,71,73',
                463: '14,54,95,62',
                464: '11,53,94,53',
                465: '9,29,66,24',
                466: '8,23,52,15',
                467: '6,15,41,10',
                468: '6,13,41,4',
                469: '24,79,100,73',
                470: '7,70,99,38',
                471: '5,71,100,23',
                472: '1,46,63,1',
                473: '0,32,42,0',
                474: '0,25,36,0',
                475: '0,21,30,0',
                476: '30,71,75,81',
                477: '23,75,78,69',
                478: '19,79,84,61',
                479: '14,48,53,26',
                480: '8,29,32,13',
                481: '5,23,27,10',
                482: '4,17,21,7',
                483: '21,80,81,69',
                484: '8,92,100,33',
                485: '0,95,100,0',
                486: '0,55,50,0',
                487: '0,43,40,0',
                488: '0,31,26,0',
                489: '0,20,21,0',
                490: '26,85,85,72',
                491: '18,85,65,55',
                492: '11,85,60,48',
                493: '2,57,17,3',
                494: '0,47,10,0',
                495: '0,32,6,0',
                496: '0,27,5,0',
                497: '30,73,74,78',
                498: '23,78,77,65',
                499: '21,73,58,56',
                500: '6,50,21,14',
                501: '1,39,11,5',
                502: '0,26,9,1',
                503: '0,20,6,1',
                504: '29,82,44,73',
                505: '19,82,44,65',
                506: '19,86,38,57',
                507: '4,51,7,6',
                508: '1,41,4,2',
                509: '1,36,3,0',
                510: '0,30,3,0',
                511: '50,99,9,59',
                512: '53,99,3,18',
                513: '53,99,0,0',
                514: '16,55,0,0',
                515: '8,42,0,0',
                516: '4,31,0,0',
                517: '2,25,0,0',
                518: '55,86,20,63',
                519: '65,95,9,40',
                520: '67,95,4,16',
                521: '34,56,0,0',
                522: '24,44,0,0',
                523: '16,33,0,0',
                524: '10,23,0,0',
                525: '69,100,4,45',
                526: '73,100,0,0',
                527: '69,99,0,0',
                528: '35,58,0,0',
                529: '23,45,0,0',
                530: '15,33,0,0',
                531: '9,24,0,0',
                532: '88,76,30,82',
                533: '95,72,15,67',
                534: '95,74,7,44',
                535: '43,25,3,8',
                536: '34,17,2,7',
                537: '21,7,2,3',
                538: '14,4,1,3',
                539: '100,65,22,80',
                540: '100,57,12,66',
                541: '100,58,9,46',
                542: '60,19,1,4',
                543: '37,9,0,1',
                544: '27,4,1,1',
                545: '21,2,0,1',
                546: '100,41,35,87',
                547: '100,35,32,82',
                548: '100,21,28,76',
                549: '56,8,9,21',
                550: '42,7,8,8',
                551: '35,3,8,7',
                552: '24,3,7,2',
                553: '82,30,65,76',
                554: '84,22,77,60',
                555: '80,17,76,51',
                556: '54,8,47,14',
                557: '44,4,37,10',
                558: '36,3,28,4',
                559: '29,2,24,3',
                560: '79,30,63,80',
                561: '84,20,58,54',
                562: '85,12,53,36',
                563: '54,0,29,2',
                564: '43,0,23,0',
                565: '30,0,18,0',
                566: '17,0,12,0',
                567: '88,33,69,72',
                568: '90,14,62,43',
                569: '90,9,60,15',
                570: '57,0,36,0',
                571: '40,0,25,0',
                572: '27,0,18,0',
                573: '20,0,14,0',
                574: '56,22,98,72',
                575: '55,9,95,45',
                576: '54,5,94,24',
                577: '35,2,58,0',
                578: '27,0,48,0',
                579: '24,0,43,0',
                580: '20,0,36,0',
                581: '25,19,100,70',
                582: '25,9,100,39',
                583: '26,1,100,10',
                584: '21,0,89,0',
                585: '14,0,68,0',
                586: '10,0,59,0',
                587: '9,0,50,0',
                600: '2,0,39,0',
                601: '4,0,47,0',
                602: '5,0,55,0',
                603: '6,0,82,0',
                604: '5,0,94,0',
                605: '0,2,100,9',
                606: '0,6,100,16',
                607: '3,0,34,0',
                608: '5,0,45,0',
                609: '6,0,55,1',
                610: '8,1,74,2',
                611: '7,1,89,10',
                612: '7,5,100,20',
                613: '8,11,100,28',
                614: '6,2,32,1',
                615: '8,3,41,3',
                616: '10,5,49,6',
                617: '11,6,64,13',
                618: '14,10,85,27',
                619: '17,14,93,38',
                620: '17,17,97,48',
                621: '12,1,12,2',
                622: '25,2,19,5',
                623: '37,4,26,10',
                624: '48,8,34,20',
                625: '64,16,45,30',
                626: '80,18,56,54',
                627: '93,33,68,85',
                628: '20,0,7,0',
                629: '36,0,9,0',
                630: '48,0,10,0',
                631: '74,0,13,0',
                632: '93,2,15,7',
                633: '98,6,10,29',
                634: '100,13,10,41',
                635: '30,0,7,0',
                636: '39,0,7,0',
                637: '62,0,8,0',
                638: '86,0,9,0',
                639: '99,1,5,5',
                640: '100,10,3,16',
                641: '100,23,0,19',
                642: '13,2,1,1',
                643: '20,3,1,2',
                644: '42,10,2,6',
                645: '56,21,2,8',
                646: '72,31,3,12',
                647: '96,54,5,27',
                648: '100,71,9,56',
                649: '10,3,1,0',
                650: '18,6,1,2',
                651: '38,14,1,2',
                652: '58,26,2,5',
                653: '94,57,4,18',
                654: '100,71,10,47',
                655: '100,79,12,59',
                656: '10,2,0,0',
                657: '22,6,0,0',
                658: '37,11,0,0',
                659: '59,27,0,0',
                660: '88,50,0,0',
                661: '100,75,0,6',
                662: '100,87,0,20',
                663: '3,6,0,2',
                664: '5,8,0,3',
                665: '17,20,0,1',
                666: '36,39,2,5',
                667: '56,59,4,14',
                668: '70,77,7,23',
                669: '87,97,8,49',
                670: '1,17,0,0',
                671: '3,28,0,0',
                672: '6,46,0,0',
                673: '9,55,0,0',
                674: '16,83,0,0',
                675: '18,100,0,8',
                676: '9,100,14,33',
                677: '1,16,0,2',
                678: '3,23,0,1',
                679: '4,29,0,0',
                680: '9,49,0,6',
                681: '16,68,1,9',
                682: '24,86,4,28',
                683: '26,99,12,50',
                684: '3,22,2,1',
                685: '0,29,0,4',
                686: '6,42,1,2',
                687: '10,55,2,10',
                688: '17,68,3,12',
                689: '24,89,5,37',
                690: '30,98,13,68',
                691: '0,14,5,1',
                692: '2,26,7,2',
                693: '3,39,9,6',
                694: '5,50,14,13',
                695: '8,60,21,24',
                696: '17,82,42,40',
                697: '19,85,48,46',
                698: '0,16,4,0',
                699: '0,28,5,0',
                700: '0,40,8,0',
                701: '0,58,13,0',
                702: '4,78,30,2',
                703: '6,91,53,16',
                704: '8,97,76,31',
                705: '0,11,3,0',
                706: '0,23,7,0',
                707: '0,36,8,0',
                708: '0,53,17,0',
                709: '0,69,29,0',
                710: '0,84,46,0',
                711: '0,97,75,0',
                712: '0,20,30,0',
                713: '0,27,40,0',
                714: '0,40,59,0',
                715: '0,54,87,0',
                716: '0,61,99,0',
                717: '0,68,100,0',
                718: '0,74,100,8',
                719: '0,14,26,1',
                720: '0,25,38,2',
                721: '0,35,52,4',
                722: '2,50,76,13',
                723: '6,60,98,20',
                724: '7,70,100,42',
                725: '9,75,100,55',
                726: '1,15,26,3',
                727: '2,21,32,6',
                728: '5,32,46,10',
                729: '7,45,66,18',
                730: '10,55,83,35',
                731: '11,68,100,61',
                732: '16,69,100,71',
                1205: '0,3,43,0',
                1215: '0,6,53,0',
                1225: '0,19,79,0',
                1235: '0,31,98,0',
                1245: '6,35,99,18',
                1255: '9,35,98,30',
                1265: '14,36,95,46',
                1345: '0,17,50,0',
                1355: '0,22,60,0',
                1365: '0,34,76,0',
                1375: '0,45,94,0',
                1385: '2,56,100,3',
                1395: '9,55,100,39',
                1405: '20,55,100,60',
                1485: '0,34,58,0',
                1495: '0,46,78,0',
                1505: '0,56,90,0',
                1525: '2,77,100,9',
                1535: '10,75,100,42',
                1545: '20,76,100,70',
                1555: '0,26,36,0',
                1565: '0,39,51,0',
                1575: '0,51,77,0',
                1585: '0,61,97,0',
                1595: '0,71,100,3',
                1605: '6,71,100,32',
                1615: '10,72,100,46',
                1625: '0,41,42,0',
                1635: '0,51,55,0',
                1645: '0,63,75,0',
                1655: '0,73,98,0',
                1665: '0,79,100,0',
                1675: '5,83,100,27',
                1685: '11,82,100,48',
                1765: '0,42,18,0',
                1767: '0,33,10,0',
                1775: '0,49,23,0',
                1777: '0,66,29,0',
                1785: '0,76,54,0',
                1787: '0,82,53,0',
                1788: '0,88,82,0',
                1795: '0,96,93,2',
                1797: '2,97,85,7',
                1805: '5,96,80,22',
                1807: '10,93,71,33',
                1815: '16,97,86,54',
                1817: '30,85,59,70',
                1895: '0,30,2,0',
                1905: '0,47,9,0',
                1915: '0,75,21,0',
                1925: '0,97,50,0',
                1935: '1,100,55,6',
                1945: '5,100,55,28',
                1955: '9,100,54,43',
                2001: '0,3,48,0',
                2002: '0,4,58,0',
                2003: '0,1,70,0',
                2004: '0,8,61,0',
                2005: '0,13,60,0',
                2006: '0,22,77,0',
                2007: '0,33,92,2',
                2008: '0,25,78,0',
                2009: '0,35,87,0',
                2010: '0,35,100,0',
                2011: '0,48,99,0',
                2012: '0,45,100,0',
                2013: '0,46,100,0',
                2014: '0,51,100,26',
                2015: '0,16,32,0',
                2016: '0,33,57,0',
                2017: '0,34,57,0',
                2018: '0,58,95,0',
                2019: '0,69,100,2',
                2020: '0,68,100,22',
                2021: '0,80,100,35',
                2022: '0,38,44,0',
                2023: '0,48,54,0',
                2024: '0,58,65,0',
                2025: '0,50,71,0',
                2026: '0,68,76,0',
                2027: '0,76,75,0',
                2028: '0,84,98,0',
                2029: '0,63,49,0',
                2030: '0,68,51,0',
                2031: '4,71,54,0',
                2032: '4,78,61,2',
                2033: '4,83,68,9',
                2034: '0,85,80,0',
                2035: '0,97,100,3',
                2036: '0,29,1,0',
                2037: '2,51,0,0',
                2038: '0,68,0,0',
                2039: '0,83,3,0',
                2040: '0,96,43,0',
                2041: '0,98,39,40',
                2042: '20,91,44,58',
                2043: '2,23,4,0',
                2044: '0,53,3,0',
                2045: '0,67,5,0',
                2046: '0,80,7,3',
                2047: '18,85,17,21',
                2048: '16,88,24,34',
                2049: '19,90,36,47',
                2050: '3,15,3,0',
                2051: '8,23,5,0',
                2052: '18,39,11,0',
                2053: '28,55,16,2',
                2054: '40,59,28,4',
                2055: '44,68,32,14',
                2056: '47,74,34,23',
                2057: '9,49,0,0',
                2058: '26,53,6,0',
                2059: '26,58,10,0',
                2060: '19,70,0,0',
                2061: '25,80,5,3',
                2062: '28,88,0,0',
                2063: '35,94,0,0',
                2064: '13,45,0,0',
                2065: '15,38,0,0',
                2066: '23,49,0,0',
                2067: '34,63,0,0',
                2068: '40,71,0,0',
                2069: '47,81,0,0',
                2070: '59,89,0,0',
                2071: '23,29,0,0',
                2072: '34,42,0,0',
                2073: '39,44,0,0',
                2074: '51,62,0,0',
                2075: '56,60,0,0',
                2076: '60,70,0,0',
                2077: '76,85,0,0',
                2078: '30,41,2,0',
                2079: '45,53,10,0',
                2080: '45,55,0,0',
                2081: '60,72,0,0',
                2082: '70,81,0,0',
                2083: '46,58,0,0',
                2084: '66,79,0,0',
                2085: '9,16,0,0',
                2086: '41,45,0,0',
                2087: '45,49,0,0',
                2088: '58,60,0,0',
                2089: '72,74,0,0',
                2090: '77,79,0,0',
                2091: '86,88,0,0',
                2092: '29,32,0,0',
                2093: '38,38,1,0',
                2094: '53,52,3,0',
                2095: '66,63,0,0',
                2096: '76,75,0,0',
                2097: '77,74,0,0',
                2098: '88,86,0,0',
                2099: '36,38,1,0',
                2100: '43,42,0,0',
                2101: '54,52,0,0',
                2102: '76,71,0,0',
                2103: '84,82,0,0',
                2104: '92,87,0,0',
                2105: '100,100,0,3',
                2106: '31,18,5,0',
                2107: '44,28,12,2',
                2108: '58,38,15,7',
                2109: '74,51,22,8',
                2110: '81,60,19,13',
                2111: '86,65,21,26',
                2112: '97,96,0,41',
                2113: '39,23,0,0',
                2114: '52,38,0,0',
                2115: '64,46,0,0',
                2116: '76,56,0,0',
                2117: '92,79,0,0',
                2118: '99,89,0,7',
                2119: '97,85,0,37',
                2120: '26,9,0,0',
                2121: '51,21,0,0',
                2122: '47,25,0,0',
                2123: '63,39,0,0',
                2124: '67,49,0,0',
                2125: '74,55,0,0',
                2126: '93,78,0,0',
                2127: '30,8,0,0',
                2128: '49,20,0,0',
                2129: '69,35,0,0',
                2130: '78,51,0,0',
                2131: '87,64,0,0',
                2132: '92,64,0,0',
                2133: '96,64,0,0',
                2134: '46,26,0,0',
                2135: '62,39,0,0',
                2136: '58,33,14,2',
                2137: '69,41,15,8',
                2138: '70,46,31,12',
                2139: '79,49,17,15',
                2140: '93,61,9,42',
                2141: '49,9,0,0',
                2142: '54,20,0,0',
                2143: '77,34,0,0',
                2144: '95,53,0,0',
                2145: '98,62,0,14',
                2146: '100,72,0,20',
                2147: '99,86,0,7',
                2148: '66,29,14,4',
                2149: '79,37,17,2',
                2150: '83,39,15,13',
                2151: '93,51,6,4',
                2152: '92,44,13,22',
                2153: '97,49,11,38',
                2154: '100,58,0,42',
                2155: '38,15,8,0',
                2156: '51,23,11,0',
                2157: '63,31,14,0',
                2158: '74,38,17,4',
                2159: '79,43,18,8',
                2160: '85,47,20,13',
                2161: '93,55,16,25',
                2162: '42,23,18,1',
                2163: '52,29,26,3',
                2164: '58,32,27,3',
                2165: '68,39,30,9',
                2166: '75,45,33,14',
                2167: '79,46,34,16',
                2168: '91,44,30,57',
                2169: '52,13,5,0',
                2170: '69,21,6,0',
                2171: '72,17,0,0',
                2172: '86,42,0,0',
                2173: '88,31,0,0',
                2174: '94,43,0,0',
                2175: '99,47,0,0',
                2176: '33,12,17,0',
                2177: '54,20,24,3',
                2178: '68,29,30,7',
                2179: '76,35,34,18',
                2180: '83,40,34,30',
                2181: '89,42,29,50',
                2182: '93,44,32,57',
                2183: '88,21,13,2',
                2184: '94,29,0,0',
                2185: '100,38,17,2',
                2186: '100,46,0,46',
                2187: '100,47,0,48',
                2188: '100,39,0,63',
                2189: '94,24,0,85',
                2190: '70,3,0,0',
                2191: '82,11,0,0',
                2192: '89,18,0,0',
                2193: '92,24,0,0',
                2194: '95,26,0,0',
                2195: '98,40,0,0',
                2196: '100,35,0,12',
                2197: '50,0,12,0',
                2198: '61,0,15,0',
                2199: '77,0,16,0',
                2200: '82,1,17,3',
                2201: '84,0,16,0',
                2202: '92,0,6,0',
                2203: '94,1,14,15',
                2204: '33,5,8,2',
                2205: '55,11,18,3',
                2206: '59,21,17,4',
                2207: '73,18,22,8',
                2208: '71,30,23,9',
                2209: '79,23,23,19',
                2210: '97,45,24,55',
                2211: '62,22,35,2',
                2212: '75,29,42,12',
                2213: '82,34,49,24',
                2214: '84,34,47,22',
                2215: '89,46,44,40',
                2216: '88,50,45,50',
                2217: '88,0,28,88',
                2218: '63,9,28,2',
                2219: '68,10,30,3',
                2220: '76,13,34,9',
                2221: '80,16,34,19',
                2222: '85,17,38,19',
                2223: '91,11,38,40',
                2224: '96,0,31,57',
                2225: '45,0,18,0',
                2226: '60,0,23,0',
                2227: '60,0,25,0',
                2228: '92,0,34,0',
                2229: '96,0,36,0',
                2230: '96,3,41,13',
                2231: '100,5,40,21',
                2232: '61,7,31,0',
                2233: '71,8,35,4',
                2234: '75,10,37,6',
                2235: '81,9,41,15',
                2236: '79,14,43,11',
                2237: '86,16,44,21',
                2238: '100,2,46,49',
                2239: '59,0,39,0',
                2240: '74,0,49,0',
                2241: '73,7,51,6',
                2242: '95,0,74,0',
                2243: '90,5,63,6',
                2244: '86,14,63,20',
                2245: '100,0,81,18',
                2246: '35,0,33,0',
                2247: '54,0,48,0',
                2248: '59,0,53,0',
                2249: '73,0,62,0',
                2250: '79,0,67,0',
                2251: '87,0,74,0',
                2252: '88,0,86,0',
                2253: '21,0,22,0',
                2254: '29,0,35,0',
                2255: '43,0,49,0',
                2256: '57,0,62,0',
                2257: '87,0,91,0',
                2258: '91,0,100,8',
                2259: '87,0,99,32',
                2260: '31,0,39,0',
                2261: '46,4,52,0',
                2262: '54,9,62,2',
                2263: '65,12,75,14',
                2264: '64,13,72,8',
                2265: '73,12,89,34',
                2266: '71,0,100,68',
                2267: '32,0,42,0',
                2268: '42,0,51,0',
                2269: '51,0,71,0',
                2270: '61,0,73,0',
                2271: '74,0,85,0',
                2272: '87,0,100,2',
                2273: '84,0,100,39',
                2274: '15,0,34,0',
                2275: '24,0,48,0',
                2276: '48,8,83,9',
                2277: '63,0,97,20',
                2278: '62,0,98,35',
                2279: '54,0,96,51',
                2280: '61,0,99,56',
                2281: '15,0,46,0',
                2282: '22,0,42,0',
                2283: '35,0,61,0',
                2284: '33,0,60,0',
                2285: '43,0,70,0',
                2286: '48,0,86,0',
                2287: '61,0,93,0',
                2288: '24,0,57,0',
                2289: '24,0,60,0',
                2290: '34,0,78,0',
                2291: '38,0,82,0',
                2292: '48,0,92,0',
                2293: '49,0,90,0',
                2294: '50,0,95,13',
                2295: '12,0,49,0',
                2296: '17,0,54,0',
                2297: '29,0,72,0',
                2298: '33,0,72,0',
                2299: '41,0,84,0',
                2300: '40,0,89,0',
                2301: '46,0,100,14',
                2302: '33,7,74,5',
                2303: '43,11,76,0',
                2304: '37,9,83,11',
                2305: '25,0,100,32',
                2306: '39,4,100,38',
                2307: '34,0,100,60',
                2308: '10,7,98,77',
                2309: '3,15,29,0',
                2310: '11,20,30,0',
                2311: '15,31,45,2',
                2312: '25,37,50,4',
                2313: '18,41,62,6',
                2314: '32,58,85,7',
                2315: '0,71,100,49',
                2316: '25,39,50,3',
                2317: '26,45,62,6',
                2318: '29,52,72,15',
                2319: '21,63,98,46',
                2320: '25,69,97,54',
                2321: '0,44,75,74',
                2322: '32,72,99,81',
                2323: '26,20,40,0',
                2324: '30,30,53,5',
                2325: '36,36,56,6',
                2326: '45,44,67,14',
                2327: '50,42,67,16',
                2328: '47,49,73,33',
                2329: '46,50,78,46',
                2330: '13,9,13,0',
                2331: '32,26,29,3',
                2332: '50,42,44,6',
                2333: '66,55,58,10',
                2334: '62,56,56,16',
                2335: '70,65,73,27',
                2336: '76,69,68,33',
                2337: '0,27,22,0',
                2338: '4,39,29,0',
                2339: '0,49,32,0',
                2340: '9,66,40,0',
                2341: '23,64,51,2',
                2342: '16,73,46,7',
                2343: '24,75,44,10',
                2344: '0,56,50,0',
                2345: '0,59,50,0',
                2346: '0,65,50,0',
                2347: '0,88,100,0',
                2348: '0,76,65,0',
                2349: '0,82,100,10',
                2350: '0,95,100,21',
                2351: '24,59,0,0',
                2352: '29,69,0,0',
                2353: '24,77,0,0',
                2354: '48,78,9,7',
                2355: '55,100,0,0',
                2356: '50,98,0,32',
                2357: '23,100,0,58',
                2358: '34,28,19,4',
                2359: '52,48,31,15',
                2360: '55,45,27,10',
                2361: '62,50,23,9',
                2362: '59,52,28,13',
                2363: '63,58,30,19',
                2364: '59,59,36,20',
                2365: '2,30,0,0',
                2366: '64,55,0,0',
                2367: '80,72,0,0',
                2368: '82,70,0,0',
                2369: '87,77,0,0',
                2370: '97,96,0,0',
                2371: '94,100,0,0',
                2372: '97,99,0,14',
                2373: '58,42,18,5',
                2374: '72,55,20,18',
                2375: '16,60,0,0',
                2376: '71,55,33,23',
                2377: '84,54,29,28',
                2378: '83,63,26,34',
                2379: '81,64,41,38',
                2380: '91,71,36,56',
                2381: '61,29,0,0',
                2382: '78,30,0,0',
                2383: '83,40,3,6',
                2384: '99,48,1,14',
                2385: '23,83,0,0',
                2386: '83,54,0,0',
                2387: '88,56,0,0',
                2388: '100,66,0,0',
                2389: '68,17,8,0',
                2390: '86,31,11,5',
                2391: '86,23,16,9',
                2392: '87,38,24,19',
                2393: '94,11,5,0',
                2394: '100,12,0,2',
                2395: '26,90,0,0',
                2396: '91,5,24,0',
                2397: '74,0,29,0',
                2398: '71,0,36,0',
                2399: '90,0,43,0',
                2400: '80,0,49,0',
                2401: '73,4,45,0',
                2402: '96,0,58,0',
                2403: '100,0,56,11',
                2404: '36,12,41,1',
                2405: '36,100,0,0',
                2406: '53,20,53,2',
                2407: '61,29,60,3',
                2408: '73,29,75,14',
                2409: '72,42,81,22',
                2410: '77,46,88,28',
                2411: '72,2,100,76',
                2412: '48,0,45,0',
                2413: '67,0,53,0',
                2414: '70,0,65,0',
                2415: '38,100,0,6',
                2416: '78,0,68,0',
                2417: '79,7,71,2',
                2418: '100,0,97,13',
                2419: '97,13,78,16',
                2420: '65,0,73,0',
                2421: '65,0,96,0',
                2422: '80,0,100,0',
                2423: '78,0,99,0',
                2424: '69,0,98,7',
                2425: '40,100,10,26',
                2426: '89,0,100,10',
                2427: '87,0,100,50',
                2562: '19,35,0,0',
                2563: '22,39,0,0',
                2567: '29,45,0,0',
                2572: '29,55,0,0',
                2573: '35,52,0,0',
                2577: '40,54,0,0',
                2582: '48,80,0,0',
                2583: '47,72,0,0',
                2587: '58,76,0,0',
                2592: '58,90,0,0',
                2593: '66,92,0,0',
                2597: '80,99,0,0',
                2602: '65,100,0,0',
                2603: '72,99,0,3',
                2607: '83,99,0,2',
                2612: '67,100,0,5',
                2613: '74,99,5,11',
                2617: '84,99,0,12',
                2622: '65,100,5,40',
                2623: '75,100,8,26',
                2627: '85,100,6,38',
                2635: '24,29,0,0',
                2645: '40,44,0,0',
                2655: '54,61,0,0',
                2665: '70,76,0,0',
                2685: '90,99,0,8',
                2695: '91,100,8,59',
                2705: '40,36,0,0',
                2706: '19,10,0,0',
                2707: '20,6,0,0',
                2708: '30,13,0,0',
                2715: '56,52,0,0',
                2716: '40,29,0,0',
                2717: '34,15,0,0',
                2718: '65,45,0,0',
                2725: '76,76,0,0',
                2726: '81,70,0,0',
                2727: '70,47,0,0',
                2728: '90,68,0,0',
                2735: '97,100,0,4',
                2736: '97,95,0,0',
                2738: '100,92,0,1',
                2745: '97,100,0,18',
                2746: '100,98,0,0',
                2747: '100,95,0,16',
                2748: '100,95,2,10',
                2755: '97,100,0,30',
                2756: '100,98,0,15',
                2757: '100,95,4,42',
                2758: '100,95,5,39',
                2765: '100,100,9,57',
                2766: '100,100,6,60',
                2767: '100,90,10,77',
                2768: '100,90,13,71',
                2905: '45,1,0,1',
                2915: '60,9,0,0',
                2925: '85,21,0,0',
                2935: '100,52,0,0',
                2945: '100,53,2,16',
                2955: '100,60,10,53',
                2965: '100,63,16,78',
                2975: '34,0,5,0',
                2985: '60,0,3,0',
                2995: '83,1,0,0',
                3005: '100,31,0,0',
                3015: '100,35,3,21',
                3025: '100,27,10,56',
                3035: '100,30,19,76',
                3105: '44,0,11,0',
                3115: '59,0,14,0',
                3125: '84,0,18,0',
                3135: '100,0,20,0',
                3145: '100,10,29,20',
                3155: '100,9,29,47',
                3165: '100,16,33,66',
                3242: '44,0,20,0',
                3245: '42,0,24,0',
                3248: '48,0,22,0',
                3252: '49,0,23,0',
                3255: '48,0,25,0',
                3258: '59,0,30,0',
                3262: '76,0,38,0',
                3265: '66,0,39,0',
                3268: '86,0,53,0',
                3272: '94,0,48,0',
                3275: '90,0,52,0',
                3278: '99,0,69,0',
                3282: '100,4,56,8',
                3285: '98,0,59,0',
                3288: '99,3,68,12',
                3292: '98,14,65,51',
                3295: '100,5,65,26',
                3298: '99,11,72,35',
                3302: '90,21,65,69',
                3305: '92,25,70,68',
                3308: '94,28,74,73',
                3375: '36,0,24,0',
                3385: '43,0,28,0',
                3395: '66,0,48,0',
                3405: '88,0,68,0',
                3415: '97,10,86,18',
                3425: '93,13,85,44',
                3435: '93,24,85,68',
                3935: '2,0,60,0',
                3945: '3,0,90,0',
                3955: '4,0,100,0',
                3965: '7,0,100,0',
                3975: '8,7,100,25',
                3985: '12,13,100,43',
                3995: '23,25,100,67',
                4485: '24,42,91,75',
                4495: '19,35,90,55',
                4505: '16,27,83,42',
                4515: '13,19,62,28',
                4525: '9,12,47,18',
                4535: '6,8,35,12',
                4545: '5,6,30,4',
                4625: '30,72,74,80',
                4635: '12,58,81,42',
                4645: '11,46,64,30',
                4655: '8,41,51,20',
                4665: '5,30,38,12',
                4675: '5,20,28,6',
                4685: '2,15,23,5',
                4695: '24,85,100,76',
                4705: '24,70,71,58',
                4715: '17,59,60,45',
                4725: '13,42,43,31',
                4735: '7,28,27,16',
                4745: '5,22,23,14',
                4755: '3,16,20,9',
                4975: '36,84,59,85',
                4985: '22,74,38,47',
                4995: '15,62,30,38',
                5005: '10,52,25,29',
                5015: '5,35,14,10',
                5025: '3,30,13,7',
                5035: '1,18,8,3',
                5115: '51,91,21,70',
                5125: '42,81,11,49',
                5135: '36,68,10,31',
                5145: '25,51,5,20',
                5155: '13,31,2,8',
                5165: '7,19,2,3',
                5175: '5,16,2,3',
                5185: '53,81,26,75',
                5195: '44,74,21,58',
                5205: '30,59,13,41',
                5215: '15,38,7,22',
                5225: '8,25,4,14',
                5235: '5,18,4,8',
                5245: '3,10,3,5',
                5255: '97,100,15,72',
                5265: '86,83,9,45',
                5275: '74,68,7,31',
                5285: '44,40,5,15',
                5295: '26,22,2,9',
                5305: '18,15,2,6',
                5315: '10,7,1,4',
                5395: '100,71,39,90',
                5405: '68,35,17,40',
                5415: '56,24,11,34',
                5425: '45,16,9,24',
                5435: '31,8,6,11',
                5445: '21,5,4,8',
                5455: '17,4,6,4',
                5463: '100,45,38,90',
                5467: '86,33,57,92',
                5473: '86,20,32,51',
                5477: '66,24,43,66',
                5483: '65,11,25,27',
                5487: '51,16,35,50',
                5493: '47,4,16,16',
                5497: '38,9,23,32',
                5503: '39,2,14,10',
                5507: '27,5,17,18',
                5513: '29,1,10,5',
                5517: '20,4,13,10',
                5523: '22,1,9,2',
                5527: '12,2,9,8',
                5535: '79,34,62,84',
                5545: '62,19,45,50',
                5555: '51,12,39,37',
                5565: '44,12,34,24',
                5575: '37,9,28,13',
                5585: '23,3,19,8',
                5595: '20,3,17,4',
                5605: '82,36,83,90',
                5615: '52,16,52,54',
                5625: '46,18,44,37',
                5635: '34,10,33,20',
                5645: '26,6,24,12',
                5655: '20,4,20,9',
                5665: '14,2,15,7',
                5743: '54,24,86,73',
                5747: '50,27,98,76',
                5753: '42,16,80,58',
                5757: '34,12,91,54',
                5763: '37,13,71,50',
                5767: '31,11,76,35',
                5773: '29,10,52,32',
                5777: '26,9,56,20',
                5783: '24,8,41,19',
                5787: '18,4,41,10',
                5793: '19,6,34,12',
                5797: '15,4,37,9',
                5803: '12,2,24,9',
                5807: '11,3,25,3',
                5815: '35,30,100,75',
                5825: '22,15,86,47',
                5835: '18,11,70,32',
                5845: '18,10,60,23',
                5855: '12,5,44,15',
                5865: '9,3,37,10',
                5875: '9,4,31,5',
                7401: '0,4,27,0',
                7402: '1,4,45,1',
                7403: '1,11,58,2',
                7404: '0,8,86,0',
                7405: '0,11,97,2',
                7406: '0,20,100,2',
                7407: '6,36,79,12',
                7408: '0,29,100,0',
                7409: '0,31,100,0',
                7410: '0,41,59,0',
                7411: '0,42,75,2',
                7412: '2,58,96,10',
                7413: '1,60,98,4',
                7414: '6,66,100,21',
                7415: '0,28,26,1',
                7416: '0,72,70,0',
                7417: '1,83,85,0',
                7418: '8,83,55,5',
                7419: '9,76,40,26',
                7420: '13,100,54,30',
                7421: '18,100,45,67',
                7422: '0,16,3,0',
                7423: '0,73,15,0',
                7424: '0,90,9,0',
                7425: '6,96,32,13',
                7426: '5,99,44,22',
                7427: '8,100,70,33',
                7428: '20,96,36,62',
                7429: '1,26,1,1',
                7430: '2,38,1,2',
                7431: '4,54,4,7',
                7432: '8,73,9,15',
                7433: '8,90,16,24',
                7434: '11,94,25,34',
                7435: '15,100,21,48',
                7436: '2,14,0,0',
                7437: '14,35,0,0',
                7438: '18,47,0,0',
                7439: '27,52,0,0',
                7440: '36,60,0,0',
                7441: '44,70,0,0',
                7442: '58,87,0,0',
                7443: '9,8,0,1',
                7444: '27,21,0,0',
                7445: '36,33,0,3',
                7446: '50,46,0,0',
                7447: '77,85,6,18',
                7448: '67,79,24,59',
                7449: '65,98,21,83',
                7450: '25,13,0,0',
                7451: '46,23,0,0',
                7452: '55,37,0,0',
                7453: '53,26,0,0',
                7454: '62,23,4,12',
                7455: '90,66,0,0',
                7456: '72,55,0,0',
                7457: '18,0,5,0',
                7458: '53,3,8,9',
                7459: '72,9,9,13',
                7460: '100,6,2,10',
                7461: '98,24,1,3',
                7462: '100,48,6,30',
                7463: '100,63,12,67',
                7464: '35,0,18,0',
                7465: '58,0,36,0',
                7466: '86,0,32,0',
                7467: '97,0,30,0',
                7468: '90,18,7,29',
                7469: '100,31,8,42',
                7470: '96,20,25,53',
                7471: '37,0,17,0',
                7472: '54,0,27,0',
                7473: '75,5,48,3',
                7474: '96,9,32,29',
                7475: '69,12,30,36',
                7476: '89,22,34,65',
                7477: '86,29,21,67',
                7478: '28,0,25,0',
                7479: '56,0,58,0',
                7480: '75,0,71,0',
                7481: '82,0,86,0',
                7482: '90,0,93,0',
                7483: '82,16,85,56',
                7484: '91,14,78,60',
                7485: '9,0,18,0',
                7486: '28,0,45,0',
                7487: '42,0,62,0',
                7488: '52,0,82,0',
                7489: '56,2,78,5',
                7490: '57,6,92,19',
                7491: '47,11,92,39',
                7492: '17,1,47,3',
                7493: '25,4,44,3',
                7494: '35,5,42,14',
                7495: '42,5,98,29',
                7496: '46,6,100,42',
                7497: '22,23,47,57',
                7498: '46,23,84,68',
                7499: '1,2,24,0',
                7500: '3,5,26,2',
                7501: '6,10,30,2',
                7502: '6,14,39,8',
                7503: '10,15,50,29',
                7504: '17,36,52,38',
                7505: '17,44,62,49',
                7506: '0,7,25,1',
                7507: '0,13,35,0',
                7508: '2,19,46,4',
                7509: '4,29,57,4',
                7510: '5,41,77,10',
                7511: '5,52,100,24',
                7512: '7,58,100,30',
                7513: '0,26,26,1',
                7514: '3,35,36,5',
                7515: '5,43,49,11',
                7516: '11,72,92,36',
                7517: '11,78,100,50',
                7518: '21,56,49,60',
                7519: '24,42,45,68',
                7520: '1,26,21,0',
                7521: '6,32,32,12',
                7522: '8,62,54,16',
                7523: '10,67,49,23',
                7524: '12,78,62,25',
                7525: '13,56,61,32',
                7526: '9,83,100,46',
                7527: '3,4,14,8',
                7528: '5,10,17,16',
                7529: '7,14,20,22',
                7530: '10,18,25,32',
                7531: '16,29,38,53',
                7532: '23,37,45,65',
                7533: '37,53,68,83',
                7534: '5,5,15,8',
                7535: '10,11,23,19',
                7536: '11,13,30,32',
                7537: '18,8,20,24',
                7538: '24,11,24,33',
                7539: '24,13,18,38',
                7540: '41,28,22,70',
                7541: '7,1,3,2',
                7542: '24,4,8,13',
                7543: '24,9,8,22',
                7544: '35,14,11,34',
                7545: '58,32,18,54',
                7546: '73,45,24,66',
                7547: '99,74,31,84',
                7548: '0,12,98,0',
                7549: '0,22,100,2',
                7550: '0,34,98,12',
                7551: '0,40,96,32',
                7552: '19,42,100,59',
                7553: '26,46,76,72',
                7554: '37,53,68,81',
                7555: '0,28,98,11',
                7556: '7,35,99,19',
                7557: '11,31,100,37',
                7558: '13,36,95,41',
                7559: '14,39,95,46',
                7560: '19,37,95,55',
                7561: '21,40,90,64',
                7562: '8,29,66,19',
                7563: '0,32,87,8',
                7564: '0,45,100,4',
                7565: '0,53,98,11',
                7566: '7,67,98,23',
                7567: '10,66,98,57',
                7568: '15,67,100,65',
                7569: '0,45,100,6',
                7570: '0,48,98,10',
                7571: '0,48,97,21',
                7572: '0,50,93,32',
                7573: '10,55,89,33',
                7574: '12,55,92,36',
                7575: '14,53,94,55',
                7576: '6,50,76,0',
                7577: '2,55,69,0',
                7578: '0,67,100,0',
                7579: '0,74,100,0',
                7580: '0,77,97,15',
                7581: '0,64,70,60',
                7582: '0,49,66,75',
                7583: '0,69,98,12',
                7584: '0,70,100,17',
                7585: '0,67,90,24',
                7586: '0,69,89,41',
                7587: '0,70,89,48',
                7588: '0,55,69,65',
                7589: '30,67,65,74',
                7590: '11,27,33,0',
                7591: '17,54,68,0',
                7592: '0,69,85,24',
                7593: '0,79,91,40',
                7594: '0,67,70,60',
                7595: '0,57,69,66',
                7596: '28,79,90,76',
                7597: '0,85,100,4',
                7598: '0,85,100,10',
                7599: '0,85,98,20',
                7600: '0,78,83,55',
                7601: '14,82,100,50',
                7602: '11,68,95,62',
                7603: '16,69,98,73',
                7604: '0,8,5,4',
                7605: '0,22,15,4',
                7606: '0,41,29,6',
                7607: '0,59,49,14',
                7608: '0,76,72,31',
                7609: '0,81,73,54',
                7610: '0,77,60,72',
                7611: '0,19,17,6',
                7612: '14,39,37,0',
                7613: '21,47,46,0',
                7614: '35,50,49,0',
                7615: '50,61,57,13',
                7616: '50,65,57,28',
                7617: '44,69,58,60',
                7618: '12,63,72,0',
                7619: '0,78,85,12',
                7620: '0,95,94,28',
                7621: '0,98,91,30',
                7622: '0,97,89,45',
                7623: '0,97,87,53',
                7624: '0,97,87,60',
                7625: '0,82,80,0',
                7626: '0,93,95,2',
                7627: '5,94,88,22',
                7628: '8,93,78,33',
                7629: '23,87,73,61',
                7630: '26,86,80,69',
                7631: '29,82,50,73',
                7632: '0,9,4,8',
                7633: '0,27,9,18',
                7634: '15,68,23,0',
                7635: '0,90,25,8',
                7636: '0,100,45,12',
                7637: '0,93,38,45',
                7638: '0,91,33,52',
                7639: '0,42,15,48',
                7640: '0,79,24,41',
                7641: '0,95,27,44',
                7642: '0,86,5,64',
                7643: '0,84,2,70',
                7644: '5,81,0,79',
                7645: '9,79,0,82',
                7646: '33,61,26,0',
                7647: '31,88,18,0',
                7648: '22,100,0,16',
                7649: '30,100,0,20',
                7650: '34,98,0,41',
                7651: '42,92,0,47',
                7652: '42,92,0,50',
                7653: '8,21,0,40',
                7654: '34,55,10,0',
                7655: '33,72,0,0',
                7656: '45,90,0,4',
                7657: '47,94,0,36',
                7658: '40,86,0,50',
                7659: '32,75,0,64',
                7660: '37,37,17,0',
                7661: '47,60,12,0',
                7662: '60,87,5,0',
                7663: '69,100,0,8',
                7664: '74,100,0,10',
                7665: '64,84,0,32',
                7666: '75,80,50,0',
                7667: '64,47,16,0',
                7668: '67,56,8,0',
                7669: '73,66,0,2',
                7670: '80,74,0,0',
                7671: '83,81,0,4',
                7672: '85,84,0,6',
                7673: '81,74,16,0',
                7674: '50,41,4,0',
                7675: '55,48,6,0',
                7676: '61,64,3,0',
                7677: '68,78,0,0',
                7678: '74,85,0,0',
                7679: '87,97,0,0',
                7680: '87,99,0,8',
                7681: '42,23,2,0',
                7682: '63,37,2,0',
                7683: '83,55,0,0',
                7684: '90,64,0,0',
                7685: '95,69,0,0',
                7686: '100,73,0,10',
                7687: '100,78,0,18',
                7688: '69,19,4,0',
                7689: '77,25,6,0',
                7690: '95,41,10,0',
                7691: '100,43,0,30',
                7692: '100,45,0,45',
                7693: '100,57,9,47',
                7694: '100,57,9,52',
                7695: '43,9,8,8',
                7696: '56,9,9,21',
                7697: '76,34,21,0',
                7698: '65,9,0,53',
                7699: '73,13,0,57',
                7700: '84,17,0,57',
                7701: '89,14,0,56',
                7702: '68,1,8,8',
                7703: '79,2,10,11',
                7704: '93,4,8,24',
                7705: '100,13,5,41',
                7706: '100,16,10,44',
                7707: '100,18,12,52',
                7708: '100,18,12,59',
                7709: '62,0,18,6',
                7710: '81,0,23,0',
                7711: '98,0,28,4',
                7712: '100,0,28,20',
                7713: '100,0,30,26',
                7714: '96,0,30,45',
                7715: '97,0,35,57',
                7716: '83,0,40,11',
                7717: '96,0,47,19',
                7718: '98,0,48,40',
                7719: '96,0,49,50',
                7720: '89,0,45,60',
                7721: '89,0,43,65',
                7722: '89,0,45,72',
                7723: '69,0,54,7',
                7724: '82,0,67,11',
                7725: '97,0,86,15',
                7726: '100,0,93,29',
                7727: '100,0,94,46',
                7728: '93,0,75,55',
                7729: '95,0,75,65',
                7730: '68,0,71,18',
                7731: '79,0,89,22',
                7732: '89,0,96,30',
                7733: '89,0,91,43',
                7734: '77,0,82,65',
                7735: '59,0,69,75',
                7736: '56,0,58,78',
                7737: '60,0,98,7',
                7738: '74,0,98,2',
                7739: '78,0,95,5',
                7740: '75,0,95,15',
                7741: '76,4,100,21',
                7742: '71,5,100,45',
                7743: '71,8,100,50',
                7744: '18,0,98,10',
                7745: '16,0,91,28',
                7746: '17,0,88,39',
                7747: '19,0,86,48',
                7748: '20,2,86,50',
                7749: '25,12,97,52',
                7750: '25,15,94,58',
                7751: '2,7,75,17',
                7752: '2,13,88,14',
                7753: '0,17,94,27',
                7754: '0,16,85,50',
                7755: '0,14,78,62',
                7756: '0,14,75,70',
                7757: '0,8,58,77',
                7758: '1,0,97,14',
                7759: '6,3,100,20',
                7760: '16,17,97,48',
                7761: '22,15,86,55',
                7762: '40,20,80,60',
                7763: '46,26,84,66',
                7764: '46,29,84,68',
                7765: '14,4,100,16',
                7766: '14,5,100,24',
                7767: '14,12,100,34',
                7768: '15,19,82,45',
                7769: '23,29,87,58',
                7770: '32,37,75,68',
                7771: '35,38,86,77',
                801: '90,5,5,0',
                802: '35,0,60,0',
                803: '0,0,70,0',
                804: '0,20,35,0',
                805: '0,40,25,0',
                806: '0,50,0,0',
                807: '15,75,0,0',
                808: '80,0,40,0',
                809: '10,0,100,0',
                810: '0,10,35,0',
                811: '0,25,25,0',
                812: '0,50,15,0',
                813: '0,70,0,0',
                814: '55,60,0,0',
                871: '20,25,60,25',
                872: '20,30,70,15',
                873: '30,30,60,10',
                874: '0,20,50,30',
                875: '30,40,70,0',
                876: '30,50,85,0',
                877: '0,0,0,40',
                8003: '30, 25, 40, 20',
                8021: '0, 20, 30, 25',
                8062: '5, 35, 15, 25',
                8100: '10, 15, 5, 20',
                8201: '25, 0, 0, 25',
                8281: '35, 0, 20, 25',
                8321: '20, 0, 30, 25'
            };
        }
    }
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

/**
 * DEBUG LIB
 * */
function scrollWin(input) {
    if (input instanceof Array) input = input.join("\r");

    var w = new Window("dialog", 'Scrollable alert'),
        list = w.add("edittext", undefined, input, {multiline: true, scrolling: true});

    list.maximumSize.height = w.maximumSize.height - 100;
    list.minimumSize.width = 600;

    w.add("button", undefined, "Close", {name: "ok"});
    w.show();
}

function showObjDeep(obj) {
    var str = '{\n';
    var indent = 1;

    showObj(obj);

    function showObj(obj) {

        for (var key in obj) {
            if (typeof obj[key] == 'object' /*&& !obj[key].splice*/) {
                str += addIndent(indent) + key + ':\n';
                ++indent;
                showObj(obj[key]);
            } else {
                str += addIndent(indent) + key + ': ' + obj[key] + ' [' + typeof obj[key] + '],\n';
            }
        }
        indent--;
    }

    return str + '}';

    function addIndent(i) {
        return new Array(i).join('_');
    }
}
