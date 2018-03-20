//@target illustrator

var scriptName      = 'Step and Repeat',
    scriptVersion   = '1.0',
    scriptCopyright = '© Oleg Butrin (wp.me/p0Xz) 2017';

var lang            = {
      nodoc : localize({en: 'No documents are open!', ru: 'Нет открытых документов!'}),
      noitem: localize({en: 'Select only one page item!', ru: 'Выберите только один объект!'}),
      repeat: localize({en: 'Repeat:', ru: 'Повторить'}),
      steph : localize({en: 'Step Horizontal:', ru: 'Шаг по горизонтали:'}),
      stepv : localize({en: 'Step Vertical:', ru: 'Шаг по вертикали:'}),
      rotate: localize({en: 'Rotation Angle:', ru: 'Поворот на:'}),
      run   : localize({en: 'Run', ru: 'Выполнить'}),
      cancel: localize({en: 'Cancel', ru: 'Отменить'})
    },
    _max_repeat     = 64,
    _max_step_names = {
      'RulerUnits.Unknown'    : 10, 	//UNKNOW
      'RulerUnits.Inches'     : 10, 	//INCHES
      'RulerUnits.Centimeters': 20, 	//CENTIMETERS
      'RulerUnits.Points'     : 60, 	//POINTS
      'RulerUnits.Picas'      : 40, 	//PICAS
      'RulerUnits.Millimeters': 90, 	//MILLIMETERS
      'RulerUnits.Qs'         : 40, 	//QS?
      'RulerUnits.Pixels'     : 200 	//PIXEL
    },
    _unit_names     = {
      'RulerUnits.Pixels'     : '', 	//UNKNOW
      'RulerUnits.Inches'     : 'in', 	//INCHES
      'RulerUnits.Centimeters': 'cm', 	//CENTIMETERS
      'RulerUnits.Points'     : 'pt', 	//POINTS
      'RulerUnits.Picas'      : 'pc', 	//PICAS
      'RulerUnits.Millimeters': 'mm', 	//MILLIMETERS
      'RulerUnits.Qs'         : 'qs', 	//QS?
      'RulerUnits.Pixels'     : 'px' 	//PIXEL
    };

main();

function parseFloat2(num) {
  return Math.floor(parseFloat(num) * 100) / 100;
}

function UI(doc) {

  var po = this;

  this.doc = doc;

  this.repeat = 0;
  this.stepx = 0;
  this.stepy = 0;
  this.rotation = 0;

  this.maxstep = _max_step_names[doc.rulerUnits.toString()];
  this.unit = _unit_names[doc.rulerUnits.toString()];

  function _repeat_change() {
    var num = parseInt(this.text);
    if (isNaN(num)) {
      sld_repeat.value = sld_repeat.minvalue;
      sld_repeat.notify();
      return false;
    }
    if (num < sld_repeat.minvalue) {
      num = sld_repeat.minvalue;
    }
    if (num > sld_repeat.maxvalue) {
      num = sld_repeat.maxvalue;
    }
    if (sld_repeat.value != num) {
      sld_repeat.value = num;
      sld_repeat.notify();
    }
  }

  function _stepx_change() {
    var num = parseFloat2(parseFloat2(this.text) + po.maxstep);
    if (isNaN(num)) {
      sld_stepx.value = po.maxstep;
      sld_stepx.notify();
      return false;
    }
    if (num < sld_stepx.minvalue) {
      num = sld_stepx.minValue;
    }
    if (num > sld_stepx.maxvalue) {
      num = sld_stepx.maxvalue;
    }
    if (sld_stepx.value != num) {
      sld_stepx.value = num;
      sld_stepx.notify();
    }
  }

  function _stepy_change() {
    var num = parseFloat2(parseFloat2(this.text) + po.maxstep);
    if (isNaN(num)) {
      sld_stepy.value = po.maxstep;
      sld_stepy.notify();
      return false;
    }
    if (num < sld_stepy.minvalue) {
      num = sld_stepy.minValue;
    }
    if (num > sld_stepy.maxvalue) {
      num = sld_stepy.maxvalue;
    }
    if (sld_stepy.value != num) {
      sld_stepy.value = num;
      sld_stepy.notify();
    }
  }

  function _rotate_change() {
    var num = parseFloat2(parseFloat2(this.text) + 180);
    if (isNaN(num)) {
      sld_rotate.value = 180;
      sld_rotate.notify();
      return false;
    }
    if (num < sld_rotate.minvalue) {
      num = sld_rotate.minValue;
    }
    if (num > sld_rotate.maxvalue) {
      num = sld_rotate.maxvalue;
    }
    if (sld_rotate.value != num) {
      sld_rotate.value = num;
      sld_rotate.notify();
    }
  }

  this.dialog = new Window('dialog', [scriptName, scriptVersion].join(' '));

  var mainframe    = this.dialog.add('group {orientation: "column", alignChild: ["fill", "fill"]}'),
      pnl_settings = mainframe.add('panel {orientation: "column", alignChild: ["fill", "fill"], alignment: "fill"}'),
      grp_repeat   = pnl_settings.add('group {orientation: "row", alignChild: ["fill", "center"]}'),
      lbl_repeat   = grp_repeat.add('statictext'),
      scb_repeat   = grp_repeat.add('scrollbar {stepdelta: 1, value: 1, minvalue: 1, maxvalue: ' + _max_repeat + '}'),
      txt_repeat   = grp_repeat.add('edittext'),
      sld_repeat   = grp_repeat.add('slider {value: 1, minvalue: 1, maxvalue: ' + _max_repeat + '}');
  lbl_repeat.text = lang.repeat;

  var grp_stepx = pnl_settings.add('group {orientation: "row", alignChild: ["fill", "center"]}'),
      lbl_stepx = grp_stepx.add('statictext'),
      scb_stepx = grp_stepx.add('scrollbar {stepdelta: 1, value: 0, minvalue: 0, maxvalue: ' + (this.maxstep * 2) + '}'),
      txt_stepx = grp_stepx.add('edittext'),
      sld_stepx = grp_stepx.add('slider {value: 0, minvalue: 0, maxvalue: ' + (this.maxstep * 2) + '}');
  lbl_stepx.text = lang.steph;

  var grp_stepy = pnl_settings.add('group {orientation: "row", alignChild: ["fill", "center"]}'),
      lbl_stepy = grp_stepy.add('statictext'),
      scb_stepy = grp_stepy.add('scrollbar {stepdelta: 1, value: 0, minvalue: 0, maxvalue: ' + (this.maxstep * 2) + '}'),
      txt_stepy = grp_stepy.add('edittext'),
      sld_stepy = grp_stepy.add('slider {value: 0, minvalue: 0, maxvalue: ' + (this.maxstep * 2) + '}');
  lbl_stepy.text = lang.stepv;

  var grp_rotate = pnl_settings.add('group {orientation: "row", alignChild: ["fill", "center"]}'),
      lbl_rotate = grp_rotate.add('statictext'),
      scb_rotate = grp_rotate.add('scrollbar {stepdelta: 1, value: 0, minvalue: 0, maxvalue: 360}'),
      txt_rotate = grp_rotate.add('edittext'),
      sld_rotate = grp_rotate.add('slider {value: 0, minvalue: 0, maxvalue: 360}');
  lbl_rotate.text = lang.rotate;

  lbl_repeat.characters = lbl_stepx.characters = lbl_stepy.characters = lbl_rotate.characters =
    Math.max(lbl_repeat.text.length, lbl_stepx.text.length, lbl_stepy.text.length, lbl_rotate.text.length) - 3;
  lbl_repeat.justify = lbl_stepx.justify = lbl_stepy.justify = lbl_rotate.justify = 'right';
  txt_repeat.characters = txt_stepx.characters = txt_stepy.characters = txt_rotate.characters = 10;

  scb_repeat.size = scb_stepx.size = scb_stepy.size = scb_rotate.size = [32, 12];

  // ==== REPEAT SETTINGS ====

  txt_repeat.onChange = _repeat_change;
  sld_repeat.onChange = function () {
    this.value = Math.floor(this.value);
    txt_repeat.text = this.value.toString();
    scb_repeat.value = this.value;
  };
  scb_repeat.onChange = function () {
    this.value = Math.floor(this.value);
    txt_repeat.text = this.value.toString();
    sld_repeat.value = this.value;
  };
  sld_repeat.value = 1;
  sld_repeat.notify();

  // ==== REPEAT SETTINGS ====

  // ==== STEPX SETTINGS ====

  txt_stepx.onChange = _stepx_change;
  sld_stepx.onChange = function () {
    this.value = parseFloat2(this.value);
    txt_stepx.text = parseFloat2(this.value - po.maxstep) + ' ' + po.unit;
    scb_stepx.value = this.value;
  };
  scb_stepx.onChange = function () {
    this.value = parseFloat2(this.value);
    txt_stepx.text = parseFloat2(this.value - po.maxstep) + ' ' + po.unit;
    sld_stepx.value = this.value;
  };
  sld_stepx.value = this.maxstep;
  sld_stepx.notify();

  // ==== STEPX SETTINGS ====

  // ==== STEPY SETTINGS ====

  txt_stepy.onChange = _stepy_change;
  sld_stepy.onChange = function () {
    this.value = parseFloat2(this.value);
    txt_stepy.text = parseFloat2(this.value - po.maxstep) + ' ' + po.unit;
    scb_stepy.value = this.value;
  };
  scb_stepy.onChange = function () {
    this.value = parseFloat2(this.value);
    txt_stepy.text = parseFloat2(this.value - po.maxstep) + ' ' + po.unit;
    sld_stepy.value = this.value;
  };
  sld_stepy.value = this.maxstep;
  sld_stepy.notify();

  // ==== STEPY SETTINGS ====

  // ==== ROTATE SETTINGS ====

  txt_rotate.onChange = _rotate_change;
  sld_rotate.onChange = function () {
    this.value = parseFloat2(this.value);
    txt_rotate.text = parseFloat2(this.value - 180) + ' \u00B0';
    scb_rotate.value = this.value;
  };
  scb_rotate.onChange = function () {
    this.value = parseFloat2(this.value);
    txt_rotate.text = parseFloat2(this.value - 180) + ' \u00B0';
    sld_rotate.value = this.value;
  };
  sld_rotate.value = 180;
  sld_rotate.notify();

  // ==== ROTATE SETTINGS ====

  var grp_buttons = pnl_settings.add('group {orientation: "row", margins: 8}'),
      btn_run     = grp_buttons.add('button'),
      btn_cancel  = grp_buttons.add('button');
  btn_run.text = lang.run;
  btn_cancel.text = lang.cancel;

  btn_run.onClick = function () {
    po.repeat = sld_repeat.value;
    po.stepx = UnitValue(txt_stepx.text).as('pt');
    po.stepy = UnitValue(txt_stepy.text).as('pt');
    po.rotate = parseFloat2(sld_rotate.value - 180);
    po.close();
  };

  btn_cancel.onClick = function () {
    po.repeat = 0;
    po.stepx = 0;
    po.stepy = 0;
    po.rotate = 0;
    po.close();
  };

  var pnl_copyright = mainframe.add('panel {orientation: "column", alignChild: ["center", "center"], alignment: "fill"}'),
      lbl_copyright = pnl_copyright.add('statictext {justify: "center"}'),
      txt_copyright = pnl_copyright.add('edittext { properties: {multiline: false, readonly: true, borderless: true}, justify: "center"}');
  lbl_copyright.text = scriptCopyright;
  txt_copyright.text = 'money.yandex.ru/to/410015389492630';

  this.dialog.cancelElement = btn_cancel;
  txt_repeat.active = true;

  this.dialog.addEventListener('keydown', function () {
    var state = ScriptUI.environment.keyboardState;
    if (state.keyName == 'Enter') {
      btn_run.active = true;
      btn_run.notify('onClick');
    }
  });

  this.show = function () {
    this.dialog.show();
  };

  this.close = function () {
    this.dialog.close();
  };

}

function main() {

  if (app.documents.length == 0) {
    alert(lang.nodoc);
    return false;
  }

  if (app.selection.length != 1 || !app.selection[0].hasOwnProperty('visibleBounds')) {
    alert(lang.noitem);
  }

  var doc  = app.activeDocument,
      item = app.selection[0],
      ui   = new UI(doc);
  ui.show();

  if (ui.repeat == 0) {
    return false;
  }

  // alert(ui.stepx);
  for (var i = 0; i < ui.repeat; i++) {
    var item = item.duplicate();
    item.translate(ui.stepx, -ui.stepy, true, true, true, true);
    item.rotate(-ui.rotate);
  }

}
