/**
 * Adobe ExtendScript for Illustrator CS6+
 * (c) Marat Shagiev
 * e-mail: m_js@bk.ru
 * 04.12.2016
 *
 * moveExtend_v1.1
 * */
//@target illustrator

(function duplicateItems() {
  if (!selection.length) {
    alert('Select an item[s] that you need to duplicate.\nRun the script.');
    return;
  }
  if (!documents.length) {
    alert('Open/make document.\nSelect item[s] that you need to duplicate.\nRun the script.');
  }

  var store       = new Store('duplicateItems');
  var previewFlag = false;
  var duplicates  = [];

  var win = new Window('dialog', 'Move Extend');
  var pan = win.add('panel', undefined, 'Move parameters');

  pan.alignChildren = 'right';

  var unitsGr    = pan.add('group');
  var horValGr   = pan.add('group');
  var vertValGr  = pan.add('group');
  var horStepGr  = pan.add('group');
  var vertSterGr = pan.add('group');

  var chkGr = pan.add('group');

  var btnGr = win.add('group');

  unitsGr.add('statictext', undefined, 'Units');
  horValGr.add('statictext', undefined, 'Horizontal value');
  vertValGr.add('statictext', undefined, 'Vertical value');
  horStepGr.add('statictext', undefined, 'Horizontal step');
  vertSterGr.add('statictext', undefined, 'Vertical step');

  win.units = unitsGr.add('dropdownlist', [0, 0, 100, 20], ['mm', 'pt']);
  win.hVal  = horValGr.add('edittext', [0, 0, 100, 20]);
  win.vVal  = vertValGr.add('edittext', [0, 0, 100, 20]);
  win.hStep = horStepGr.add('edittext', [0, 0, 100, 20]);
  win.vStep = vertSterGr.add('edittext', [0, 0, 100, 20]);

  win.units.selection = 1;

  win.gr = chkGr.add('checkbox', [0, 0, 100, 20], 'Group all');

  var okBtn      = btnGr.add('button', undefined, 'OK');
  var cancelBtn  = btnGr.add('button', undefined, 'Cancel');
  var previewBtn = btnGr.add('button', undefined, 'Preview');

  store.setFaceValues(win);

  okBtn.onClick = function() {
    store.setIniValues(win);
    if (!previewFlag) {
      var opts = store.getFaceValues(win);
      var core = new Core(opts);
      core.duplicate();
    }
    if (win.gr.value === true) {
      executeMenuCommand('group');
    }
    win.close();
  }

  previewBtn.onClick = function() {
    var opts = store.getFaceValues(win);
    var core = new Core(opts);
    if (previewFlag) {
      core.clearPrevious(duplicates);
      duplicates = core.duplicate();
      win.update();
      redraw();
    } else {
      duplicates = core.duplicate();
      win.update();
      redraw();
      previewFlag = true;
    }
  }

  cancelBtn.onClick = function() {
    if (previewFlag) {
      for (var i = duplicates.length - 1; i >= 0; i--) {
        var item = duplicates[i];
        item.remove();
      }
    }
    win.close();
  }

  win.show();

  /**
   * operating with varlues of the panel
   * and save settings on ini-file
   * path to save is relatively:
   * * userData/LocalStorage/duplicateItems/duplicateItems.ini
   *
   * @method{setFaceValues} load the values to interface from ini-file or from defaults object
   * @method{getFaceValues}
   * @method{setIniValues}
   * @constructor
   *
   * */
  function Store(scriptName) {
    /**
     * make the default values for the interface
     *
     * @constructor
     * */
    function Defaults() {
      this.units = 1;
      this.hVal  = 10;
      this.vVal  = 10;
      this.hStep = 2;
      this.vStep = 2;
      this.gr    = "false";
    }

    /**
     * @public
     * @param {Window} win - ExtendScript UI class object
     * */
    this.setFaceValues = function(win) {
      var values = _getIniValues();

      for (var key in values) {
        if (key == "units") {
          win[key].selection = +values[key];
          continue;
        }
        if (key == "gr") {
          var boolValue = false;
          if (values[key] == 'true') {
            boolValue = true;
          }
          win[key].value = boolValue;
          continue;
        }
        win[key].text = values[key];
      }
    }

    /**
     * @public
     * @param {Window} win - ExtendScript UI class object
     * */
    this.setIniValues = function(win) {
      var iniFile  = _getIniFile();
      var faceOpts = this.getFaceValues(win);
      var defaults = new Defaults();

      _clearIni(iniFile);

      iniFile.open('w');

      for (var key in defaults) {
        var iniKey = key;
        var iniVal = faceOpts[key];

        if (iniVal === '') {
          iniVal = defaults[key];
        }
        iniFile.writeln(iniKey);
        iniFile.writeln(iniVal);
      }
      iniFile.close();
    }

    /**
     * @public
     * @param {Window} win - ExtendScript UI class object
     * @return {Object} opts - values of interface
     * */
    this.getFaceValues = function(win) {
      var opts = new Defaults();
      for (var key in opts) {
        if (key == "units") {
          opts[key] = win[key].selection.index;
          continue;
        }
        if (key == "gr") {
          opts[key] = win[key].value;
          continue;
        }
        opts[key] = win[key].text;
      }
      return opts;
    }

    /**
     * get or create ini-file where storing the interface values
     *
     * @private
     * */
    function _getIniFile() {
      var storageFolder = new Folder(Folder.userData + '/LocalStorage/' + scriptName + '/');
      if (!storageFolder.exists) {
        storageFolder.create();
      }
      var iniFile = new File(storageFolder.fullName + '/' + scriptName + '.ini');
      if (!iniFile.exists) {
        iniFile.open('w');
        iniFile.close();
      }
      return iniFile;
    }

    /**
     * clear ini-file through deletion and recreation
     *
     * @private
     * @param {File} f - Object of the ExtendScript File class
     * */
    function _clearIni(f) {
      f.remove();
      f.open('w');
      f.close();
    }

    /**
     * read {key: value} from ini-file
     * odd lines are keys, even lines are values
     *
     * @private
     * @return {Object} opts - values that paste to interface
     * */
    function _getIniValues() {
      var opts    = new Defaults();
      var iniFile = _getIniFile();

      iniFile.open('r');

      for (var value in opts) {
        var key = iniFile.readln();
        var val = iniFile.readln();
        if (key === '') continue;
        if (val === '') continue;
        opts[key] = val;
      }
      iniFile.close();
      return opts;
    }

  }

  /**
   * move copyes of the object[s]
   *
   * @constructor
   * @method {duplicate}
   * @method {clearPrevious}
   * */
  function Core(opts) {

    var PT_TO_MM = 2.834645668,
        PT       = 1,
        unitsFactor;

    var units = +opts.units;

    switch (units) {
      case 0:
        unitsFactor = PT_TO_MM;
        break;
      case 1:
        unitsFactor = PT;
        break;
      default:
        unitsFactor = PT;
        break;
    }

    var hVal  = opts.hVal.replace(',', '.'),
        vVal  = opts.vVal.replace(',', '.'),
        hStep = +opts.hStep,
        vStep = +opts.vStep,
        gr    = opts.gr;

    hVal *= unitsFactor;
    vVal *= unitsFactor;

    this.duplicate = function() {
      var dupls     = [];
      var duplsHor  = _moveHoriz(hVal, hStep);
      var duplsVert = _moveVert(vVal, vStep);

      return dupls.concat(duplsHor, duplsVert);
    }

    this.clearPrevious = function(previousItems) {
      for (var i = previousItems.length - 1; i >= 0; i--) {
        var item = previousItems[i];
        item.remove();
      }
    }

    function _moveHoriz(hVal, hStep) {
      var sel   = selection;
      var dupls = [];

      if (hStep === 0) return dupls;

      for (var i = 0; i < sel.length; i++) {
        var currSel = sel[i];

        for (var j = 0; j < hStep; j++) {
          var dupl      = currSel.duplicate();
          dupl.position = [dupl.position[0] + hVal, dupl.position[1]];
          currSel       = dupl;
          dupls.push(dupl);
        }
      }
      return dupls;
    }

    function _moveVert(vVal, vStep) {
      var sel   = selection;
      var dupls = [];

      if (vStep === 0) return dupls;

      for (var i = 0; i < sel.length; i++) {
        var currSel = sel[i];

        for (var j = 0; j < vStep; j++) {
          var dupl      = currSel.duplicate();
          dupl.position = [dupl.position[0], dupl.position[1] - vVal];
          currSel       = dupl;
          dupls.push(dupl);
        }
      }
      return dupls;
    }

  }
}() );
