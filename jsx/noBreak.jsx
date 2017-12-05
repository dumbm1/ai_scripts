/**
 * Adobe ExtendScript for Illustrator
 * v0.2.0
 * http://forum.rudtp.ru/threads/vydelenie-teksta-na-dva-simvola-vlevo-i-vpravo-ot-polozhenija-kursora.66940/#post-904865
 * (c) Oleg Butrin
 * (c) Marat Shagiev
 * e-mail: m_js@bk.ru
 * */

//@target illustrator-19

var SCRIPT_NAME = 'noBreak';

noBreakSel();


function noBreakSel() {
    if (selection.constructor.name == 'TextRange') {
        var tr = selection;
        try {
            if (tr.characterAttributes.noBreak == true) {
                tr.characterAttributes.noBreak = false;
            } else {
                tr.characterAttributes.noBreak = true;
            }
        } catch (error) {
        }
    }

    if (!selection.length) return;

    var store = new Store();
    var iniValue = store.getIniValue();
    var noBreakFlag = true;
    if (iniValue == 'true') {
        noBreakFlag = false;
    }
    for (var k = 0; k < selection.length; ++k) {
        var fr = selection[k];
        var selects = fr.textSelection;
        for (var i = 0; i < selects.length; ++i) {
            selects[i].characterAttributes.noBreak = noBreakFlag;
        }
    }
    store.switchIniValue();

    return noBreakFlag;
}

function Store() {

    this.getIniValue = function () {
        var iniFile = _getIniFile();

        iniFile.open('r');
        var val = iniFile.readln();
        iniFile.close();
        return val;
    }

    this.switchIniValue = function () {
        var iniFile = _getIniFile();

        iniFile.open('r');
        var currVal = iniFile.readln();
        iniFile.close();


        if (currVal == 'true') {
            _clearIniFile(iniFile);
            iniFile.open('w');
            iniFile.writeln('false');
        } else {
            _clearIniFile(iniFile);
            iniFile.open('w');
            iniFile.writeln('true');
        }
        iniFile.close();
    }

    function _getIniFile() {
        var storageFolder = new Folder(Folder.userData + '/LocalStorage/' + SCRIPT_NAME + '/');
        if (!storageFolder.exists) {
            storageFolder.create();
        }
        var iniFile = new File(storageFolder.fullName + '/' + SCRIPT_NAME + '.ini');
        if (!iniFile.exists) {
            iniFile.open('w');
            // iniFile.writeln('false');
            iniFile.close();
        }
        return iniFile;
    }

    function _clearIniFile(iniFile) {
        iniFile.remove();
        iniFile.open('w');
        // iniFile.writeln('false');
        iniFile.close();
    }
}


/*
* function noBreakCursorArea(c) {
    var count = c || 2;
    var doc = app.activeDocument;
    if (doc.selection.constructor.name == 'TextRange') {
        var tr = doc.selection;
        try {
            tr.characterOffset = tr.characterOffset - (count + count / 2);
            tr.length = 2 * count;
            tr.select();
            tr.characterAttributes.noBreak = true;
        } catch (error) {
        }
    }
}

function noBreakSelection() {
    var doc = app.activeDocument;
    if (doc.selection.constructor.name == 'TextRange') {
        var tr = doc.selection;
        try {
            if (tr.characterAttributes.noBreak == true) {
                tr.characterAttributes.noBreak = false;
            } else {
                tr.characterAttributes.noBreak = true;
            }
        } catch (error) {
        }
    }
}*/