/**
 * Adobe ExtendScript for Illustrator CS4+
 * (c) Marat Shagiev
 * e-mail: m_js@bk.ru
 * 13.11.2016
 *
 * swap position of two first selected element
 * about centers or top-left corners
 * */
(function swapTwoSelectedItems() {
  /**
   * API
   * */
  var errHand = new ErrHand();
  try {
    errHand.errCheck();
  } catch (e) {
    alert(e.message);
    return;
  }

  var store = new Store('swapTwoSelectedItems');
  var swap  = new Swap();
  var face  = new Face();

  face.makeFace(swap.swap, store);

  /**
   * LIB
   * */
  /**
   * make window of UI class Dialog
   *
   * @constructor
   * */
  function Face() {
    this.makeFace = function(swapMethod, store) {
      var w      = new Window('dialog', 'Swap to selected items');
      var mainGr = w.add('group');
      mainGr.add('statictext', undefined, 'Swap about:');
      w.aboutLst           = mainGr.add('dropdownlist', undefined, ['center', 'top-left']);
      w.aboutLst.selection = 0;

      w.ok = w.add('button', undefined, 'Ok');

      store.setFaceValues(w);

      w.ok.onClick = function() {
        try {
          store.setIniValues(w);
          swapMethod(w.aboutLst.selection.text);
        } catch (e) {
          alert(e);
        } finally {
          w.close();
        }
      }
      w.show();
    }
  }

  /**
   * handling some known errors
   *
   * @constructor
   * */
  function ErrHand() {
    this.errCheck = function() {
      if (!documents.length) {
        throw new Error(
          'Something went wrong. Perhaps the reason is the following:\n\n' +
          'No open documents.\n' +
          'Open or create new document, then select two objects and run the script again.');
      }
      if (!selection.length && typeof selection.contents !== 'string') {
        throw  new Error(
          'Something went wrong. Perhaps the reason is the following:\n\n' +
          'No selected objects.\n' +
          'Select two objects and run the script again.');
      }
      if (typeof selection.contents == 'string') {
        throw new Error(
          'Something went wrong. Perhaps the reason is the following:\n\n' +
          'Selection mode is "Text selection"\n' +
          'Select two objects by "Selection tool" or "Group selection tool" and run the script again.');
      }
      if (selection.length < 2) {
        throw  new Error(
          'Something went wrong. Perhaps the reason is the following:\n\n' +
          'There is only one selected object.\n' +
          'Select two objects and run the script again.');
      }
      if (selection.length > 2) {
        throw  new Error(
          'Something went wrong. Perhaps the reason is the following:\n\n' +
          'There is so many selected objects.\n' +
          'Select two objects and run the script again.');
      }
    }
  }

  /**
   * core function - swap to selected objects
   *
   * @constructor
   * */
  function Swap() {

    this.swap = function(about) {

      var a  = selection[0];
      var b  = selection[1];
      var aX = a.position[0];
      var aY = a.position[1];
      var bX = b.position[0];
      var bY = b.position[1];
      var aW = a.width;
      var aH = a.height;
      var bW = b.width;
      var bH = b.height;
      var aX_new, aY_new, bX_new, bY_new;

      switch (about) {
        case 'center':
          aX_new                 = bX - (aW - bW) / 2;
          aY_new                 = bY + (aH - bH) / 2;
          bX_new                 = aX - (bW - aW) / 2;
          bY_new                 = aY + (bH - aH) / 2;
          selection [0].position = [aX_new, aY_new];
          selection [1].position = [bX_new, bY_new];
          break;
        case 'top-left' :
          selection[0].position = [bX, bY];
          selection[1].position = [aX, aY];
          break;
        default :
          break;
      }
    }
  }

  /**
   * operating with varlues of the panel
   * and save settings on ini-file
   * path to save is relatively:
   * * userData/LocalStorage/<storeName>/<storeName>.ini
   *
   * @method{setFaceValues} load the values to interface from ini-file or from defaults object
   * @method{setIniValues} write the ini-file
   * @method{getFaceValues} get the values from interface to object
   * @constructor
   *
   * */
  function Store(storeName) {
    /**
     * @public
     * @param {Window} win - ExtendScript UI class object
     * */
    this.setFaceValues = function(win) {
      var values = _getIniValues();

      for (var key in values) {
        if (key == "aboutLst") {
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
        if (key == "aboutLst") {
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
      this.aboutLst = 0;
    }

    /**
     * get or create ini-file where storing the interface values
     *
     * @private
     * */
    function _getIniFile() {
      var storageFolder = new Folder(Folder.userData + '/LocalStorage/' + storeName + '/');
      if (!storageFolder.exists) {
        storageFolder.create();
      }
      var iniFile = new File(storageFolder.fullName + '/' + storeName + '.ini');
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

}());
