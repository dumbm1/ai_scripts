/**
 * Adobe ExtendScript for Illustrator CS4+
 * (c) Marat Shagiev
 * e-mail: m_js@bk.ru
 * 15.12.2016
 *
 * Random resize selected PageItems
 * */

(function() {
  var store           = new Store();
  var previewFlag     = false;
  var scaleAboutCases = ['Random', 'BOTTOM', 'LEFT', 'BOTTOMLEFT', 'RIGHT', 'BOTTOMRIGHT', 'TOP', 'CENTER', 'TOPLEFT', 'TOPRIGHT', 'DOCUMENTORIGIN'];

  var win = new Window('dialog', 'Random Transform');

  var pan = win.add('panel', undefined, 'Transform Range');

  var grTransfRange = pan.add('group');
  var grScaleAbout  = pan.add('group');
  var grBtn         = win.add('group');

  grTransfRange.add('statictext', undefined, 'Min Scale %');
  win.scaleFrom = grTransfRange.add('edittext', [0, 0, 50, 20]);
  grTransfRange.add('statictext', undefined, 'Max Scale %');
  win.scaleTo = grTransfRange.add('edittext', [0, 0, 50, 20]);
  grScaleAbout.add('statictext', undefined, 'Scale About');
  win.scaleAbout           = grScaleAbout.add('dropdownlist', undefined, scaleAboutCases);
  win.scaleAbout.selection = 0;
  var btnOk                = grBtn.add('button', undefined, 'Ok');
  var btnPr                = grBtn.add('button', undefined, 'Preview');
  var btCns                = grBtn.add('button', undefined, 'Cancel');

  store.setFaceValues(win);

  btnOk.onClick = function() {
    store.setIniValues(win);
    if (!previewFlag) {
      var opts = store.getFaceValues(win);
      var core = new Core(opts);
      core.main();
    }
    win.close();
  }

  btnPr.onClick = function() {
    var opts = store.getFaceValues(win);
    var core = new Core(opts);
    if (previewFlag) {
      undo();
      core.main();
      win.update();
      redraw();
    } else {
      core.main();
      win.update();
      redraw();
      previewFlag = true;
    }
  }

  btCns.onClick = function() {
    if (previewFlag) {
      undo();
    }
    win.close();
  }

  win.show();

  /**
   * operating with varlues of the panel
   * and save settings on ini-file
   * path to save is relatively:
   * * userData/LocalStorage/boxFingerJoints/boxFingerJoints.ini
   *
   * @method{setFaceValues} load the values to interface from ini-file or from defaults object
   * @method{
   * @constructor
   *
   * */
  function Store() {
    /**
     * @public
     * @param {Window} win - ExtendScript UI class object
     * */
    this.setFaceValues = function(win) {
      var values = _getIniValues();

      for (var key in values) {
        if (key == "scaleAbout") {
          win[key].selection = +values[key];
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
        if (key == "scaleAbout") {
          opts[key] = win[key].selection.index;
          continue;
        }
        opts[key] = win[key].text;
      }
      return opts;
    }
    /**
     * make the default values for the interface
     *
     * @constructor
     * */
    function Defaults() {
      this.scaleFrom  = 50;
      this.scaleTo    = 150;
      this.scaleAbout = 0;
    }

    /**
     * get or create ini-file where storing the interface values
     *
     * @private
     * */
    function _getIniFile() {
      var storageFolder = new Folder(Folder.userData + '/LocalStorage/RandomTransform/');
      if (!storageFolder.exists) {
        storageFolder.create();
      }
      var iniFile = new File(storageFolder.fullName + '/RandomTransform.ini');
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

  function Core(opts) {
    var d              = activeDocument;
    var scale,
        scaleFrom      = +opts.scaleFrom,
        scaleTo        = +opts.scaleTo,
        chngPos        = true,
        chngFillPatt   = true,
        chngFillGrad   = true,
        chngStrokePatt = true,
        scaleAbout;

    this.main = function() {
      for (var i = 0; i < selection.length; i++) {
        var item   = selection[i];
        scaleAbout = getScaleAbout(+opts.scaleAbout);
        scale      = randInt(scaleFrom, scaleTo);
        item.resize(scale, scale, chngPos, chngFillPatt, chngFillGrad, chngStrokePatt, scale, scaleAbout);
      }
    }

    function randInt(min, max) {
      var rand = min - 0.5 + Math.random() * (max - min + 1);
      rand     = Math.round(rand);
      return rand;
    }

    function getScaleAbout(scaleAboutCase/**@param {Number} scaleAboutCase*/) {

      var scaleCase;

      if (!scaleAboutCase) {
        scaleCase = scaleAboutCases[randInt(1, scaleAboutCases.length - 2)];
      } else {
        scaleCase = scaleAboutCases[scaleAboutCase];
      }
      return Transformation[scaleCase];
    }
  }

}());
