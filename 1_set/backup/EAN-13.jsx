// Создание штрихкода EAN-13 v 2.0 RC
// (с) 2010-2011. Ягупов Дмитрий
// www.za-vod.ru
// info@za-vod.ru

// Create Barcode EAN-13 v 2.0
// (с) 2010-2011. Dmitry Yagupov 
// www.za-vod.ru
// info@za-vod.ru

//@target illustrator
var fos = Folder.fs;
//Get fullPath to Script file
if ( fos == 'Windows' ) {
  var pathJSX = $.fileName;
  pathJSX = pathJSX.substring ( 0, pathJSX.lastIndexOf ( "\\" ) );
  pathJSX = replace_string ( pathJSX, '\\', '/' );
  pathJSX = '/' + replace_string ( pathJSX, ':', '' );
}
else {

  var pathJSX = Folder.myDocuments;
//var pathJSX=Folder.desktop;
}
var mm = 2.834645669; //convert point to mm
var docPreset = new DocumentPreset;
docPreset.units = RulerUnits.Millimeters;
docPreset.width = 210 * mm;
docPreset.height = 297 * mm;
//docPreset.title = "Test Document";
docPreset.colorMode = DocumentColorSpace.CMYK;

try {
  var docRef = activeDocument;

}
catch ( ex ) {
  //alert(ex);		
}

if ( !docRef ) {
  docRef = app.documents.addDocument ( DocumentColorSpace.CMYK, docPreset );
  //docRef = app.documents.add();  
}

var EANGroup = docRef.groupItems.add (); // добавляем группу
//Read  INI File
var myINIFile = new File ( pathJSX + '/barcode.ini' );
var openIni = myINIFile.open ( 'e' ); // 'e' read-write open file.

if ( myINIFile.length == 0 ) {
  //Write  default INI file
  myINIFile.writeln ( '0' ); // Start Coord X               
  myINIFile.writeln ( '0' ); // Start Coord Y              
  myINIFile.writeln ( 'Y' ); // Chk Scale              
  myINIFile.writeln ( 'N' ); // Chk layer              
  myINIFile.writeln ( '100' ); // Scale
  myINIFile.writeln ( 'N' );  // Chk DopParam
  myINIFile.writeln ( '1' ); //Pages
  myINIFile.writeln ( '1' ); //N Column
  myINIFile.writeln ( '1' ); //N Row
  myINIFile.writeln ( '1' ); // Dist Column
  myINIFile.writeln ( '1' ); // Dist Row
  myINIFile.writeln ( '/c' ); // Path to Save AI Files		
  myINIFile.close ();

  myINIFile = new File ( pathJSX + '/barcode.ini' );
  var openIni = myINIFile.open ( 'e' ); // 'e' read-write open file.

}
if ( !openIni ) {
  var newPosX = '0';
  var newPosY = '0';
//Read Check New Layer
  var newLayer = 'Y';
//Read Check Scale 
  var newCheckScale = 'N';
//Read Scale volume
  var newScale = '100';
//Read Clone Barcode
  var newCheckClone = 'N';
// Read Pages
  var Pages = '1';       //Количество страниц при многостраничном документе    
//Read Column
  var newColumn = '1';
//Read Row
  var newRow = '1';
//Read ColumnDistance
  var newColumnDist = '1';
//Read RowDistance
  var newRowDist = '1';
//Read Full Path To Save AI Files
  var destFolder = '/';
}
else {
//Read position 
  var newPosX = myINIFile.readln ();
  var newPosY = myINIFile.readln ();
//Read Check New Layer
  var newLayer = myINIFile.readln ();
//Read Check Scale 
  var newCheckScale = myINIFile.readln ();
//Read Scale volume
  var newScale = myINIFile.readln ();
//Read  Check Extendet Parameters
  var newCheckClone = myINIFile.readln ();
// Read Pages
  var Pages = myINIFile.readln ();       //Количество страниц при многостраничном документе    
//Read Column
  var newColumn = myINIFile.readln ();
//Read Row
  var newRow = myINIFile.readln ();
//Read ColumnDistance
  var newColumnDist = myINIFile.readln ();
//Read RowDistance
  var newRowDist = myINIFile.readln ();
//Read Full Path To Save AI Files
  var destFolder = myINIFile.readln ();

  myINIFile.close ();
}
var destFolderEncode = Folder.decode ( destFolder );

var blk = 0.33;
var blkD = blk * 7;
var blkE = blk * 3;
var blkC = blk * 5;
var blkH = 22.85; //Height standart bar
var blkHE = blkH + 1.65; // Height extendet bar
//var blkHE = 24.5; // Height extendet bar
var zX = 5; // Начальный отступ по X
var zY = 5; // Начальный отступ по Y
var XGr = 0; // Координаты группы одного штрихкода.X
var YGr = 0; // Координаты группы одного штрихкода.Y
var ColMatrix = 1; // Количество колонок при генерации нескольких штрих-кодов
var RowMatrix = 1; // Количество строк при генерации нескольких штрих-кодов
var DistRow = 1; // Расстояние между колонками при генерации нескольких штрих-кодов
var DistCol = 1; // Расстояние между строками при генерации нескольких штрих-кодов
var namePages = 'EAN13-'; //Префикс названия страниц
var stepToNext = 0;
var pathPrefix = null; // Name Disk from Path to Barcode AI files in ExtDialog
var pathLastFolder = null; // Text Last Folder from Path to Barcode AI files in ExtDialog
var textDlgPathAI = null; // Text Full Path to Barcode AI files in ExtDialog

var tablEAN = new Array ( 10 );

tablEAN[ 0 ] = "AAAAAA";
tablEAN[ 1 ] = "AABABB";
tablEAN[ 2 ] = "AABBAB";
tablEAN[ 3 ] = "AABBBA";
tablEAN[ 4 ] = "ABAABB";
tablEAN[ 5 ] = "ABBAAB";
tablEAN[ 6 ] = "ABBBAA";
tablEAN[ 7 ] = "ABABAB";
tablEAN[ 8 ] = "ABABBA";
tablEAN[ 9 ] = "ABBABA";

var EAN = "";
var nowEnter = "";

// Set Zero point ruler on Document
//Set Page Size to A4
docRef.width = 210 * mm;
docRef.height = 297 * mm;
docRef.units = RulerUnits.Millimeters;
//docRef.RulerUnits = 'Millimeters';

var hDoc = docRef.height;
var wDoc = docRef.width;

docRef.rulerOrigin = Array ( 0, hDoc ); // Zero point ruler to left-top corner 

// Set color values for the CMYK object
var barColor = new CMYKColor ();
barColor.black = 100;
barColor.cyan = 0;
barColor.magenta = 0;
barColor.yellow = 0;

//*******************************************
// Create Dialog Window

var res =
      "dialog { alignChildren: 'fill', text: 'EAN-13 ver 2.0 RC', \
coord: Panel { orientation: 'column', alignChildren:'center', \
text: 'Coordinate place Barcode', \
name1: Group { orientation: 'row', \
s1: StaticText { text:'X:' }, \
e1: EditText { text: '0',characters: 6 } ,\
s2: StaticText { text:' mm   Y:' }, \
e2: EditText { text: '0', characters: 6 }, \
s3: StaticText { text:' mm' } \
} \
}, \
digit12: Panel { orientation: 'column', \
text: 'EAN-13', \
name2: Group { orientation: 'row', \
s: StaticText { text:' Enter 12 digit code:' }, \
e: EditText { characters: 12, helpTip:'Enter first 12 digit from your EAN code'  } ,\
sh: StaticText { text:'<?> ' }, \
} \
}, \
dopparamonoff: Panel { orientation: 'column', \
text: 'Ext. Parameters', \
chkExtParam: Checkbox { alignment:'left', text: 'Extend Parameters', value:false}, \
extparamBtn: Button { text:'Open Extend Parameters',enabled:false}, \
progressTxt: StaticText { text:'Progress:',visible: false }, \
progressSave: Progressbar {value: 0,minvalue:0, maxvalue: 100,visible: false}\
}, \
buttons: Group { orientation: 'row', alignment: 'center', \
okBtn: Button { text:'OK', properties:{name:'ok'} }, \
cancelBtn: Button { text:'Cancel', properties:{name:'cancel'} } \
} \
}";

//Extend param dialog windows

var extdialog =
      "dialog { alignChildren: 'fill', text: 'Extendet Parameters', \
dopparam: Panel { orientation: 'column', \
text: 'Ext. Parameters', \
name3: Group { orientation: 'column', \
chkLayer: Checkbox { alignment:'left', text: 'Barcode to new layer \"EAN-13\" ', value:true}, \
chkScale: Checkbox { alignment:'left', text: 'Barcode Scale to (80-120%) ', value:false}, \
sScale: StaticText { text:'Only 80-120%' }, \
eScale: EditText { characters: 12, enabled:false, text: '100',helpTip:'If you want scale barcode, enter scale parameter.'  } ,\
} \
heightBarcode: Group { orientation: 'row', \
sHeight: StaticText { text:'Height Barcode (min 10 mm): ' }, \
eHeight: EditText { characters: 6, enabled:true, text: '22.85',helpTip:'Enter height your barcode. By default: 22.85 mm'  } ,\
sHeightMM: StaticText { text:'  mm ' }, \
} \
pages: Group { orientation: 'row', alignChildren:'center',\
sPages: StaticText { text:'Pages' }, \
ePages: EditText { characters: 4, enabled:false, text: '1',helpTip:'Enter number pages' } ,\
} \
pathAI: Group { orientation: 'column', alignChildren:'center',\
sPath: StaticText { characters: 30, text:'Change Path' ,helpTip:'Path to save your AI files' }, \
PathBtn: Button { text:'Select folder to Save AI' }, \
}\
name4: Group { orientation: 'row', alignChildren:'right',\
sColumn: StaticText { text:'Columns' }, \
eColumn: EditText { characters: 4, enabled:false, text: '1' } ,\
sRow: StaticText { text:'Rows' }, \
eRow: EditText { characters: 4, enabled:false, text: '1' } ,\
} \
name5: Group { orientation: 'row', alignChildren:'right',\
sDistanceX: StaticText { text:'Beth Columns' }, \
eDistanceX: EditText { characters: 5, enabled:false, text: '1' } ,\
sDistanceY: StaticText { text:'Beth Rows' }, \
eDistanceY: EditText { characters: 5, enabled:false, text: '1' } ,\
sDistanceYmm: StaticText { text:'mm' }, \
} \
}, \
buttons: Group { orientation: 'row', alignment: 'center', \
extokBtn: Button { text:'Save Ext Param', properties:{name:'ok'} }, \
extcancelBtn: Button { text:'Cancel', properties:{name:'cancel'} } \
} \
}";

//--------------------------------------------------------------------------------------------
win = new Window ( res );
//--------------------------------------------------------------------------------------------
dlgext = new Window ( extdialog );

win.coord.name1.e1.text = newPosX;
win.coord.name1.e2.text = newPosY;

// Colorise 
var colorEAN = win.digit12.graphics;
var myBrush = colorEAN.newBrush ( colorEAN.BrushType.SOLID_COLOR, [ 0.92, 0.87, 0.69, 1 ] );
colorEAN.backgroundColor = myBrush;

var g = dlgext.dopparam.pathAI.sPath.graphics;
g.font = ScriptUI.newFont ( "Verdana", "BOLD", 11 );
/*
 var colorPath = dlgext.dopparam.pathAI.sPath.graphics;
 var myBrushPath = colorPath.newBrush(colorPath.BrushType.SOLID_COLOR, [0.92, 0.87, 0.69, 1]);
 colorPath.backgroundColor = myBrushPath;
 */

if ( newLayer == 'Y' ) {
  dlgext.dopparam.name3.chkLayer.value = true;
}
else {
  dlgext.dopparam.name3.chkLayer.value = false;
}

if ( newCheckScale == 'Y' ) {
  dlgext.dopparam.name3.chkScale.value = true;
  dlgext.dopparam.name3.eScale.text = newScale;
  dlgext.dopparam.name3.eScale.enabled = true;
}
else {
  dlgext.dopparam.name3.chkScale.value = false;
  dlgext.dopparam.name3.eScale.text = '100';
  dlgext.dopparam.name3.eScale.enabled = false;
}

if ( newCheckClone == 'Y' ) {
  win.dopparamonoff.chkExtParam.value = true;
  win.dopparamonoff.extparamBtn.enabled = true;
  //  dlgext.dopparam.name3.chkMatrix.value= true; 
  dlgext.dopparam.pages.ePages.enabled = true;
  dlgext.dopparam.name4.eColumn.enabled = true;
  dlgext.dopparam.name4.eRow.enabled = true;
  dlgext.dopparam.name5.eDistanceX.enabled = true;
  dlgext.dopparam.name5.eDistanceY.enabled = true;
  dlgext.dopparam.pages.ePages.text = Pages;

  textDlgPathAI = '' + destFolderEncode;
//===========
  if ( textDlgPathAI.length > 40 ) {

    if ( fos == 'Windows' ) {
      pathPrefix = textDlgPathAI.substring ( 1, 2 ) + ':';
    }
    else {
      pathPrefix = textDlgPathAI.substring ( textDlgPathAI.indexOf ( '/', 13 ), textDlgPathAI.indexOf ( '/', 16 ) );
      pathPrefix = '~' + pathPrefix;

    }
    pathPrefix = pathPrefix.toUpperCase ();
    pathLastFolder = textDlgPathAI.substring ( textDlgPathAI.lastIndexOf ( "/" ) );
    textDlgPathAI = 'Path to Save AI -> ' + pathPrefix + '...' + pathLastFolder;
    dlgext.dopparam.pathAI.sPath.text = textDlgPathAI;
    dlgext.dopparam.pathAI.sPath.helpTip = destFolderEncode;
  }
  else {
    if ( fos == 'Windows' ) {
      pathPrefix = textDlgPathAI.substring ( 1, 2 ) + ':';
      pathLastFolder = textDlgPathAI.substring ( 2 );
    }
    else {
      pathPrefix = '~';
      pathLastFolder = textDlgPathAI.substring ( 15 );
    }
    textDlgPathAI = 'Path to Save AI -> ' + pathPrefix + pathLastFolder;
    dlgext.dopparam.pathAI.sPath.text = textDlgPathAI;
    dlgext.dopparam.pathAI.sPath.helpTip = destFolderEncode;
  }

//==========

  //dlgext.dopparam.pathAI.sPath.text = 'Path to Save AI -> '+ destFolder;   
  dlgext.dopparam.name4.eColumn.text = newColumn;
  dlgext.dopparam.name4.eRow.text = newRow;
  dlgext.dopparam.name5.eDistanceX.text = newColumnDist;
  dlgext.dopparam.name5.eDistanceY.text = newRowDist;
}
else {
  win.dopparamonoff.chkExtParam.value = false;
  win.dopparamonoff.extparamBtn.enabled = false;
  //  dlgext.dopparam.name3.chkMatrix.value= false; 
  dlgext.dopparam.pages.ePages.enabled = false;
  dlgext.dopparam.name4.eColumn.enabled = false;
  dlgext.dopparam.name4.eRow.enabled = false;
  dlgext.dopparam.name5.eDistanceX.enabled = false;
  dlgext.dopparam.name5.eDistanceY.enabled = false;
  dlgext.dopparam.pages.ePages.text = '1';
  dlgext.dopparam.name4.eColumn.text = '1';
  dlgext.dopparam.name4.eRow.text = '1';
  dlgext.dopparam.name5.eDistanceX.text = '1';
  dlgext.dopparam.name5.eDistanceY.text = '1';
}

// Add Picture Barcode to Dialog Window
try {
  var imgbar = new File ( pathJSX + '/barcode.png' );
//Добавляем картинку со штрих-кодом в диалог и если не вышло найти картинку, то пропускаем эту операцию
  win.add ( "image", [ 16, 16, 116, 57 ], imgbar );
} catch ( e ) {
  //alert (e);
}

//Check ExtParam Dialog
win.dopparamonoff.chkExtParam.onClick = function addScale () {
  if ( win.dopparamonoff.chkExtParam.value == true ) {
    win.dopparamonoff.extparamBtn.enabled = true;
    newCheckClone = 'Y';
    dlgext.dopparam.pages.ePages.enabled = true;
    dlgext.dopparam.name4.eColumn.enabled = true;
    dlgext.dopparam.name4.eRow.enabled = true;
    dlgext.dopparam.name5.eDistanceX.enabled = true;
    dlgext.dopparam.name5.eDistanceY.enabled = true;
  }
  else {
    win.dopparamonoff.extparamBtn.enabled = false;
    newCheckClone = 'N';
    dlgext.dopparam.pages.ePages.enabled = false;
    dlgext.dopparam.name4.eColumn.enabled = false;
    dlgext.dopparam.name4.eRow.enabled = false;
    dlgext.dopparam.name5.eDistanceX.enabled = false;
    dlgext.dopparam.name5.eDistanceY.enabled = false;
  }

}

// Open ExtParam Dialog
win.dopparamonoff.extparamBtn.onClick = function ExtParamDlg () {

  var btnText = { ru: "Да", en: "Yes", de: "Ja", fr: "Oui" };
//dlgext.center(); 

  dlgext.show ();

}

//OnClick Save btn
dlgext.buttons.extokBtn.onClick = function ExtParamSave () {
  var txtSaveExt = "Ext param: Column - ";
  txtSaveExt = txtSaveExt + dlgext.dopparam.name4.eColumn.text + " \n Row - ";
  txtSaveExt = txtSaveExt + dlgext.dopparam.name4.eRow.text;
  dlgext.hide ();
  //dlgext.close(); 
}

// Get Path for saved AI files
dlgext.dopparam.pathAI.PathBtn.onClick = function () {
  var olddestFolder = destFolder;
  destFolder = Folder.selectDialog ( 'Select folder for Save Barcode files.', destFolder );
  if ( !destFolder ) {
    destFolder = olddestFolder;// Bad code
  }
  destFolderEncode = Folder.decode ( destFolder );
  textDlgPathAI = '' + destFolderEncode;

  if ( textDlgPathAI.length > 40 ) {

    if ( fos == 'Windows' ) {
      pathPrefix = textDlgPathAI.substring ( 1, 2 ) + ':';
    }
    else {
      pathPrefix = textDlgPathAI.substring ( textDlgPathAI.indexOf ( '/', 13 ), textDlgPathAI.indexOf ( '/', 16 ) );
      pathPrefix = '~' + pathPrefix;

    }
    pathPrefix = pathPrefix.toUpperCase ();
    pathLastFolder = textDlgPathAI.substring ( textDlgPathAI.lastIndexOf ( "/" ) );
    textDlgPathAI = 'Save AI to Folder -> ' + pathPrefix + '...' + pathLastFolder;
    dlgext.dopparam.pathAI.sPath.text = textDlgPathAI;
    dlgext.dopparam.pathAI.sPath.helpTip = destFolderEncode;
  }
  else {
    if ( fos == 'Windows' ) {
      pathPrefix = textDlgPathAI.substring ( 1, 2 ) + ':';
      pathLastFolder = textDlgPathAI.substring ( 2 );
    }
    else {
      pathPrefix = '~';
      pathLastFolder = textDlgPathAI.substring ( 15 );
    }
    textDlgPathAI = 'Save AI to Folder-> ' + pathPrefix + pathLastFolder;
    dlgext.dopparam.pathAI.sPath.text = textDlgPathAI;
    dlgext.dopparam.pathAI.sPath.helpTip = destFolderEncode;
  }
}

// Check If enter only digit 0-9
// Проверяем ввод только цифр 0-9
win.digit12.name2.e.onChanging = function () {
  ChangeEANInput ();
}

// If Pages >1 Get Path for saved AI files
dlgext.dopparam.pages.ePages.onChanging = function () {
  var chngPages = parseInt ( dlgext.dopparam.pages.ePages.text );
  if ( chngPages < 1 ) {
    //destFolder = null;
    dlgext.dopparam.pages.ePages.text = '1';
  }
}

function ChangeEANInput () {
  nowEnter = win.digit12.name2.e.text;
  var vPattern = /[^0-9]/;
  var noneD = /\D/g;
  var result = vPattern.test ( nowEnter );

  if ( result == true ) {
    nowEnter = nowEnter.replace ( noneD, "" );
    win.digit12.name2.e.text = nowEnter;
    alert ( 'Only numbers are permitted for this field.' );
  }

  if ( nowEnter.length > 12 ) {
    alert ( 'You enter more 12 digit' );
    nowEnter = nowEnter.substring ( 0, 12 );
    win.digit12.name2.e.text = nowEnter;

  }

  var chk13 = SUM13 ( nowEnter );

  EAN = nowEnter + chk13;
  win.digit12.name2.sh.text = chk13;

}

// Height  field onChange
dlgext.dopparam.heightBarcode.eHeight.onChanging = function ChangeHeghtInput () {
  blkH = dlgext.dopparam.heightBarcode.eHeight.text;
  var vPattern = /[^0-9]/;
  var noneD = /\D/g;
  var result = vPattern.test ( blkH );

  if ( result == true ) {
    blkH = blkH.replace ( noneD, "" );
    dlgext.dopparam.heightBarcode.eHeight.text = blkH;
    alert ( 'Only numbers are permitted for this field.' );
  }

  if ( blkH.length > 4 ) {
    alert ( 'You enter more 4 digit' );
    blkH = blkH.substring ( 0, 4 );
    dlgext.dopparam.heightBarcode.eHeight.text = blkH;
  }
  if ( parseInt ( blkH ) < 10 ) {
    alert ( 'You enter less then 10 mm' );
    dlgext.dopparam.heightBarcode.eHeight.text = '10';

  }

}

// OK botton Click
win.buttons.okBtn.onClick = function actionPlace () {
  var enterDigits = win.digit12.name2.e.text.length;
  var newLayer = dlgext.dopparam.name3.chkLayer.value;
  var enterScale = parseInt ( dlgext.dopparam.name3.eScale.text );
  var ColMatrix = parseInt ( dlgext.dopparam.name4.eColumn.text );
  var RowMatrix = parseInt ( dlgext.dopparam.name4.eRow.text );
  var DistRow = parseInt ( dlgext.dopparam.name5.eDistanceX.text );
  var DistCol = parseInt ( dlgext.dopparam.name5.eDistanceX.text );
  Pages = parseInt ( dlgext.dopparam.pages.ePages.text );
  var First12 = "";
  var GrHeight = 0;
  //stepToNext++;
  var posXGroup = win.coord.name1.e1.text;
  XGr = parseInt ( posXGroup );
  var posYGroup = win.coord.name1.e2.text;
  YGr = parseInt ( posYGroup );
  var FullPathToSave = null;
  var fileSaveBCode = null;
  blkH = parseInt ( dlgext.dopparam.heightBarcode.eHeight.text );
  blkHE = blkH + 1.65; // Height extendet bar

  if ( dlgext.dopparam.name3.chkLayer.value == true ) {
    chkLayer ();
  }

  if ( enterDigits == 12 ) {
    if ( ( enterScale < 80) || (enterScale > 120) )      // проверяем диапазон масштабирования 80-120%
    {
      alert ( 'Wrong Scale. Enter 80-120% only' );
    } else {
      if ( win.dopparamonoff.chkExtParam.value == true ) {// if Extendet Paprameters

        if ( Pages > 1 ) {
          //RowMatrix = RowMatrix/Pages;
          // Show ProgressBar
          win.dopparamonoff.progressTxt.visible = true;
          win.dopparamonoff.progressSave.visible = true;
          win.update ();
          for ( var p = 1; p <= Pages; p++ ) {
            win.dopparamonoff.progressSave.value = p / Pages * 100; // update progressbar
            win.update ();
            XGr = parseInt ( posXGroup );
            YGr = parseInt ( posYGroup );
            docRef = app.documents.addDocument ( DocumentColorSpace.CMYK, docPreset );

            EANGroup = docRef.groupItems.add (); // добавляем группу
            hDoc = docRef.height;
            wDoc = docRef.width;
            docRef.rulerOrigin = Array ( 0, hDoc );
            if ( dlgext.dopparam.name3.chkLayer.value == true ) {
              chkLayer ();
            }

            for ( var m = 0; m < RowMatrix; m++ ) {
              for ( var n = 0; n < ColMatrix; n++ ) {
                First12 = EAN.substring ( 0, 12 );

                win.digit12.name2.e.text = parseInt ( First12 ) + stepToNext;
                stepToNext = 1;// Bad solution :(
                ChangeEANInput ();
                CreatEAN (); // Рисуем штрихкод
                EANGroup.resize ( enterScale, enterScale ); // Масштабируем
                GrWidth = EANGroup.width / mm;  // Вычисляем ширину группы с одним штрихкодом      
                GrHeight = EANGroup.height / mm;  // Вычисляем высоту группы с одним штрихкодом              
                XGr = XGr + GrWidth + parseInt ( dlgext.dopparam.name5.eDistanceX.text ); // Координата X следующего
                                                                                          // блока штрихкода
                EANGroup = docRef.groupItems.add (); // добавляем группу
              }
              XGr = parseInt ( posXGroup ); // Координата X следующего блока штрихкода
              YGr = YGr + GrHeight + parseInt ( dlgext.dopparam.name5.eDistanceY.text ); // Координата Y следующего
                                                                                         // блока штрихкода
            }

            FullPathToSave = destFolder + '/' + namePages + EAN + '.ai';
            // Create the file object to save to
            fileSaveBCode = new File ( FullPathToSave );

            docRef.saveAs ( fileSaveBCode );
            docRef.close ();
          } // End For Pages
        } // End If Pages >1
        else {
          for ( var m = 0; m < RowMatrix; m++ ) {
            for ( var n = 0; n < ColMatrix; n++ ) {
              First12 = EAN.substring ( 0, 12 );

              win.digit12.name2.e.text = parseInt ( First12 ) + stepToNext;
              stepToNext = 1; // Bad solution :(
              ChangeEANInput ();
              CreatEAN (); // Рисуем штрихкод
              EANGroup.resize ( enterScale, enterScale ); // Масштабируем
              GrWidth = EANGroup.width / mm;  // Вычисляем ширину группы с одним штрихкодом      
              GrHeight = EANGroup.height / mm;  // Вычисляем высоту группы с одним штрихкодом              
              XGr = XGr + GrWidth + parseInt ( dlgext.dopparam.name5.eDistanceX.text ); // Координата X следующего
                                                                                        // блока штрихкода
              EANGroup = docRef.groupItems.add (); // добавляем группу
            } // End For Column
            XGr = parseInt ( posXGroup ); // Координата X следующего блока штрихкода
            YGr = YGr + GrHeight + parseInt ( dlgext.dopparam.name5.eDistanceY.text ); // Координата Y следующего блока
                                                                                       // штрихкода
          } //End For Row
        } // End else if Pages =1
        writeINI (); // Записываем INI файл        
        actionCanceled (); // Заканчиваем скрипт
      }
      else {
        CreatEAN (); // Рисуем штрихкод
        EANGroup.resize ( enterScale, enterScale ); // Масштабируем
        writeINI (); // Записываем INI файл        
        actionCanceled (); // Заканчиваем скрипт
      }

    }
  }
  else {
    alert ( 'You NO Enter 12 digits' );
  }

}

//проверяем масштабирование
dlgext.dopparam.name3.chkScale.onClick = function addScale () {
  if ( dlgext.dopparam.name3.chkScale.value == true ) {
    dlgext.dopparam.name3.eScale.enabled = true;
    enterScale = parseInt ( dlgext.dopparam.name3.eScale.text );
  }
  else {
    dlgext.dopparam.name3.eScale.enabled = false;
    dlgext.dopparam.name3.eScale.text = '100';
    enterScale = 100;

  }
}

win.buttons.cancelBtn.onClick = function exitDlg () {
  dlgext.close ();
  win.close ();
}

// Проверяем ввод только цифр  и диапазон 80-120%
dlgext.dopparam.name3.eScale.onChanging = function () {
  var nowEnterScale = dlgext.dopparam.name3.eScale.text;
  var vPattern = /[^0-9]/;
  var noneD = /\D/g;
  var result = vPattern.test ( nowEnterScale );

  if ( result == true ) {
    nowEnterScale = nowEnterScale.replace ( noneD, "" );
    dlgext.dopparam.name3.eScale.text = nowEnterScale;
    alert ( 'Only numbers are permitted for this field.' );
  }

  if ( nowEnterScale.length > 3 ) {
    alert ( 'You enter more 3 digit' );
    nowEnterScale = nowEnterScale.substring ( 0, 3 );
    dlgext.dopparam.name3.eScale.text = nowEnterScale;
  }

}

win.center ();
win.show ();

function actionCanceled () {
  dlgext.close ();
  win.close ();
}

// Если нужен штрих-код на новом слое
function chkLayer () {
  //create layer "EAN-13" if exist
  try {
    var stL = docRef.layers.getByName ( 'EAN-13' );
  }
  catch ( ex ) {
    var stL = docRef.layers.add ();
    stL.name = "EAN-13";
  }
  EANGroup.move ( stL, ElementPlacement.PLACEATEND );

}

function replace_string ( txt, cut_str, paste_str ) {
  var f = 0;
  var ht = '';
  ht = ht + txt;
  f = ht.indexOf ( cut_str );
  while ( f != -1 ) {
//цикл для вырезания всех имеющихся подстрок 
    f = ht.indexOf ( cut_str );
    if ( f > 0 ) {
      ht = ht.substr ( 0, f ) + paste_str + ht.substr ( f + cut_str.length );
    }
  }
  return ht
}

function totext () {

  var over12 = dlg.alertBtnsPnl2.titleEt.text;
  if ( over12.length > 12 ) {
    dlg.alertBtnsPnl2.titleEt.text = over12.substring ( 0, 12 );
  }
  var chk13 = SUM13 ( over12 );
  dlg.alertBtnsPnl2.TirSt.text = chk13;
  EAN = over12 + chk13;

}

function CreatEAN () {

  zX = 5;
  zY = 5;

  var chkSum13 = SUM13 ( EAN );

// Начинаем рисовать штрихкод

  SE ();                                                                // стартовый блок

  zX += blkE;                                                        // смещение от первого блока
  numBlokA1 ();                                                    // первый цифровой блок. Он всегда тип А

  switch ( EAN.charAt ( 0 ) ) {

    case '0':
      for ( var j = 2; j < 7; j++ ) {
        numBlokAB ( tablEAN[ 0 ].charAt ( j - 1 ), j ); //  в зависимости от первой цифры кода выбираем
                                                        // последовательность АВ блоков из таблицы
        zX += blkD;
      }
      CENTER ();                                       // центральный блок
      zX += blkC;
      for ( var u = 7; u < 13; u++ ) {
        numBlokC ( u );                                    // правая часть штрихкода - блок С
        zX += blkD;
      }

      break;
    case '1':
      for ( var j = 2; j < 7; j++ ) {
        numBlokAB ( tablEAN[ 1 ].charAt ( j - 1 ), j );
        zX += blkD;
      }
      CENTER ();
      zX += blkC;
      for ( var u = 7; u < 13; u++ ) {
        numBlokC ( u );
        zX += blkD;
      }

      break;
    case '2':
      for ( var j = 2; j < 7; j++ ) {
        numBlokAB ( tablEAN[ 2 ].charAt ( j - 1 ), j );
        zX += blkD;
      }
      CENTER ();
      zX += blkC;
      for ( var u = 7; u < 13; u++ ) {
        numBlokC ( u );
        zX += blkD;
      }

      break;
    case '3':
      for ( var j = 2; j < 7; j++ ) {
        numBlokAB ( tablEAN[ 3 ].charAt ( j - 1 ), j );
        zX += blkD;
      }
      CENTER ();
      zX += blkC;
      for ( var u = 7; u < 13; u++ ) {
        numBlokC ( u );
        zX += blkD;
      }

      break;
    case '4':
      for ( var j = 2; j < 7; j++ ) {
        numBlokAB ( tablEAN[ 4 ].charAt ( j - 1 ), j );
        zX += blkD;
      }
      CENTER ();
      zX += blkC;
      for ( var u = 7; u < 13; u++ ) {
        numBlokC ( u );
        zX += blkD;
      }

      break;
    case '5':
      for ( var j = 2; j < 7; j++ ) {
        numBlokAB ( tablEAN[ 5 ].charAt ( j - 1 ), j );
        zX += blkD;
      }
      CENTER ();
      zX += blkC;
      for ( var u = 7; u < 13; u++ ) {
        numBlokC ( u );
        zX += blkD;
      }

      break;
    case '6':
      for ( var j = 2; j < 7; j++ ) {
        numBlokAB ( tablEAN[ 6 ].charAt ( j - 1 ), j );
        zX += blkD;
      }
      CENTER ();
      zX += blkC;
      for ( var u = 7; u < 13; u++ ) {
        numBlokC ( u );
        zX += blkD;
      }

      break;
    case '7':
      for ( var j = 2; j < 7; j++ ) {
        numBlokAB ( tablEAN[ 7 ].charAt ( j - 1 ), j );
        zX += blkD;
      }
      CENTER ();
      zX += blkC;
      for ( var u = 7; u < 13; u++ ) {
        numBlokC ( u );
        zX += blkD;
      }

      break;
    case '8':
      for ( var j = 2; j < 7; j++ ) {
        numBlokAB ( tablEAN[ 8 ].charAt ( j - 1 ), j );
        zX += blkD;
      }
      CENTER ();
      zX += blkC;
      for ( var u = 7; u < 13; u++ ) {
        numBlokC ( u );
        zX += blkD;
      }

      break;
    case '9':
      for ( var j = 2; j < 7; j++ ) {
        numBlokAB ( tablEAN[ 9 ].charAt ( j - 1 ), j );
        zX += blkD;
      }
      CENTER ();
      zX += blkC;
      for ( var u = 7; u < 13; u++ ) {
        numBlokC ( u );
        zX += blkD;
      }

      break;

  }
  SE ();           // конечный блок    

  textEAN (); // Create digit TEXT for barcode
  EANGroup.position = Array ( XGr * mm, -YGr * mm ); // Move  group barcode to position 
  redraw ();

}

//============== Function create text number code
function textEAN () {

  zX = 5;
  zY = 5;
  var pointTextRef1 = EANGroup.textFrames.add ();
  pointTextRef1.textRange.size = 9;
  pointTextRef1.contents = EAN.charAt ( 0 );
  pointTextRef1.top = (zY - blkH) * mm;
  pointTextRef1.left = (zX - 2) * mm;
  pointTextRef1.textRange.characterAttributes.textFont = textFonts.getByName ( "ocrb10" );

  var pointTextRef2 = EANGroup.textFrames.add ();
  pointTextRef2.textRange.size = 9;
  pointTextRef2.contents = EAN.substring ( 1, 7 );
  pointTextRef2.top = (zY - blkH) * mm;
  pointTextRef2.left = (zX + 1) * mm;
  pointTextRef2.textRange.characterAttributes.textFont = textFonts.getByName ( "ocrb10" );

  var pointTextRef3 = EANGroup.textFrames.add ();
  pointTextRef3.textRange.size = 9;
  pointTextRef3.contents = EAN.substring ( 7, 13 );
  pointTextRef3.top = (zY - blkH) * mm;
  pointTextRef3.left = (zX + 16) * mm;
  pointTextRef3.textRange.characterAttributes.textFont = textFonts.getByName ( "ocrb10" );

}

//============ Функция отрисовки первого блока левой части. Он всегда типа А
function numBlokA1 () {

  switch ( EAN.charAt ( 1 ) ) {
    case '0':
      A_0 ();
      break;
    case '1':
      A_1 ();
      break;
    case '2':
      A_2 ();
      break;
    case '3':
      A_3 ();
      break;
    case '4':
      A_4 ();
      break;
    case '5':
      A_5 ();
      break;
    case '6':
      A_6 ();
      break;
    case '7':
      A_7 ();
      break;
    case '8':
      A_8 ();
      break;
    case '9':
      A_9 ();
      break;

  }
  zX += blkD;
}

//============ Функция отрисовки правой части штрихкода. Он всегда типа С
function numBlokC ( numC ) {

  switch ( EAN.charAt ( numC ) ) {
    case '0':
      C_0 ();
      break;
    case '1':
      C_1 ();
      break;
    case '2':
      C_2 ();
      break;
    case '3':
      C_3 ();
      break;
    case '4':
      C_4 ();
      break;
    case '5':
      C_5 ();
      break;
    case '6':
      C_6 ();
      break;
    case '7':
      C_7 ();
      break;
    case '8':
      C_8 ();
      break;
    case '9':
      C_9 ();
      break;
  }

}

//============ Функция отрисовки блока левой части начиная со второй позиции.  В зависимости от таблицы numBlokAB.
function numBlokAB ( ab, digBlok ) {

  switch ( ab ) {
    case 'A':
      switch ( EAN.charAt ( digBlok ) ) {
        case '0':
          A_0 ();
          break;
        case '1':
          A_1 ();
          break;
        case '2':
          A_2 ();
          break;
        case '3':
          A_3 ();
          break;
        case '4':
          A_4 ();
          break;
        case '5':
          A_5 ();
          break;
        case '6':
          A_6 ();
          break;
        case '7':
          A_7 ();
          break;
        case '8':
          A_8 ();
          break;
        case '9':
          A_9 ();
          break;

      }
      break;

    case 'B':
      switch ( EAN.charAt ( digBlok ) ) {
        case '0':
          B_0 ();
          break;
        case '1':
          B_1 ();
          break;
        case '2':
          B_2 ();
          break;
        case '3':
          B_3 ();
          break;
        case '4':
          B_4 ();
          break;
        case '5':
          B_5 ();
          break;
        case '6':
          B_6 ();
          break;
        case '7':
          B_7 ();
          break;
        case '8':
          B_8 ();
          break;
        case '9':
          B_9 ();
          break;

      }
      break;

  }
}

// расчет контрольного числа - 13 цифры.
function SUM13 ( EAN12 ) {
  var sumSt1;
  var sumSt2;
  if ( EAN12.length < 12 ) {
    sumSt2 = "<?>";
  } else {

    sumSt1 =
      parseInt ( EAN12.charAt ( 1 ) ) + parseInt ( EAN12.charAt ( 3 ) ) + parseInt ( EAN12.charAt ( 5 ) ) + parseInt ( EAN12.charAt ( 7 ) ) + parseInt ( EAN12.charAt ( 9 ) ) + parseInt ( EAN12.charAt ( 11 ) );
    sumSt1 *= 3;
    sumSt1 +=
      parseInt ( EAN12.charAt ( 0 ) ) + parseInt ( EAN12.charAt ( 2 ) ) + parseInt ( EAN12.charAt ( 4 ) ) + parseInt ( EAN12.charAt ( 6 ) ) + parseInt ( EAN12.charAt ( 8 ) ) + parseInt ( EAN12.charAt ( 10 ) );
    sumSt2 = sumSt1 % 10;
    if ( !(sumSt2 == 0) ) {
      sumSt2 = 10 - sumSt2;
    }

    else {
      sumSt2 = 0;

    }
  }
  return sumSt2;
}

// функция отрисовки прямоугольника (левый угол X, левый угол Y, ширина, высота, делать ли прямоугольник guideline,
// залочить прямоугольник) с возможностью  сделать его  в виде guideline
function rectGuide ( y1, x1, RGw, RGh, gd, lock ) {
  var rect = EANGroup.pathItems.rectangle ( x1 * mm, y1 * mm, RGw * mm, RGh * mm );
  rect.stroked = true;
  rect.filled = false;
  rect.guides = gd; // это св-во как раз и делает направляющие из линии
  rect.locked = lock; //заблокироваnm направляющие, 
}

//функция отрисовки прямоугольника (левый угол X, левый угол Y, ширина, высота, цвет заливки) без обводки

function rect ( y1, x1, Rw, Rh, colorFill ) {
  var rect = EANGroup.pathItems.rectangle ( x1 * mm, y1 * mm, Rw * mm, Rh * mm );

  rect.stroked = false;
  rect.filled = true;
  rect.fillColor = colorFill;
}

// Отрисовка  блоков тип A, B, C

function A_0 () {
  rect ( zX + blk * 3, zY, blk * 2, blkH, barColor );
  rect ( zX + blk * 6, zY, blk, blkH, barColor );
}
function A_1 () {
  rect ( zX + blk * 2, zY, blk * 2, blkH, barColor );
  rect ( zX + blk * 6, zY, blk, blkH, barColor );
}
function A_2 () {
  rect ( zX + blk * 2, zY, blk, blkH, barColor );
  rect ( zX + blk * 5, zY, blk * 2, blkH, barColor );
}
function A_3 () {
  rect ( zX + blk, zY, blk * 4, blkH, barColor );
  rect ( zX + blk * 6, zY, blk, blkH, barColor );
}
function A_4 () {
  rect ( zX + blk, zY, blk, blkH, barColor );
  rect ( zX + blk * 5, zY, blk * 2, blkH, barColor );
}
function A_5 () {
  rect ( zX + blk, zY, blk * 2, blkH, barColor );
  rect ( zX + blk * 6, zY, blk, blkH, barColor );
}
function A_6 () {
  rect ( zX + blk, zY, blk, blkH, barColor );
  rect ( zX + blk * 3, zY, blk * 4, blkH, barColor );
}
function A_7 () {
  rect ( zX + blk, zY, blk * 3, blkH, barColor );
  rect ( zX + blk * 5, zY, blk * 2, blkH, barColor );
}
function A_8 () {
  rect ( zX + blk, zY, blk * 2, blkH, barColor );
  rect ( zX + blk * 4, zY, blk * 3, blkH, barColor );
}
function A_9 () {
  rect ( zX + blk * 3, zY, blk, blkH, barColor );
  rect ( zX + blk * 5, zY, blk * 2, blkH, barColor );
}

function B_0 () {
  rect ( zX + blk, zY, blk, blkH, barColor );
  rect ( zX + blk * 4, zY, blk * 3, blkH, barColor );
}
function B_1 () {
  rect ( zX + blk, zY, blk * 2, blkH, barColor );
  rect ( zX + blk * 5, zY, blk * 2, blkH, barColor );
}
function B_2 () {
  rect ( zX + blk * 2, zY, blk * 2, blkH, barColor );
  rect ( zX + blk * 5, zY, blk * 2, blkH, barColor );
}
function B_3 () {
  rect ( zX + blk, zY, blk, blkH, barColor );
  rect ( zX + blk * 6, zY, blk, blkH, barColor );
}
function B_4 () {
  rect ( zX + blk * 2, zY, blk * 3, blkH, barColor );
  rect ( zX + blk * 6, zY, blk, blkH, barColor );
}
function B_5 () {
  rect ( zX + blk, zY, blk * 3, blkH, barColor );
  rect ( zX + blk * 6, zY, blk, blkH, barColor );
}
function B_6 () {
  rect ( zX + blk * 4, zY, blk, blkH, barColor );
  rect ( zX + blk * 6, zY, blk, blkH, barColor );
}
function B_7 () {
  rect ( zX + blk * 2, zY, blk, blkH, barColor );
  rect ( zX + blk * 6, zY, blk, blkH, barColor );
}
function B_8 () {
  rect ( zX + blk * 3, zY, blk, blkH, barColor );
  rect ( zX + blk * 6, zY, blk, blkH, barColor );
}
function B_9 () {
  rect ( zX + blk * 2, zY, blk, blkH, barColor );
  rect ( zX + blk * 4, zY, blk * 3, blkH, barColor );
}

function C_0 () {
  rect ( zX, zY, blk * 3, blkH, barColor );
  rect ( zX + blk * 5, zY, blk, blkH, barColor );
}
function C_1 () {
  rect ( zX, zY, blk * 2, blkH, barColor );
  rect ( zX + blk * 4, zY, blk * 2, blkH, barColor );
}
function C_2 () {
  rect ( zX, zY, blk * 2, blkH, barColor );
  rect ( zX + blk * 3, zY, blk * 2, blkH, barColor );
}
function C_3 () {
  rect ( zX, zY, blk, blkH, barColor );
  rect ( zX + blk * 5, zY, blk, blkH, barColor );
}
function C_4 () {
  rect ( zX, zY, blk, blkH, barColor );
  rect ( zX + blk * 2, zY, blk * 3, blkH, barColor );
}
function C_5 () {
  rect ( zX, zY, blk, blkH, barColor );
  rect ( zX + blk * 3, zY, blk * 3, blkH, barColor );
}
function C_6 () {
  rect ( zX, zY, blk, blkH, barColor );
  rect ( zX + blk * 2, zY, blk, blkH, barColor );
}
function C_7 () {
  rect ( zX, zY, blk, blkH, barColor );
  rect ( zX + blk * 4, zY, blk, blkH, barColor );
}
function C_8 () {
  rect ( zX, zY, blk, blkH, barColor );
  rect ( zX + blk * 3, zY, blk, blkH, barColor );
}
function C_9 () {
  rect ( zX, zY, blk * 3, blkH, barColor );
  rect ( zX + blk * 4, zY, blk, blkH, barColor );
}

// Отрисовка  блоков типа Начало и Конец
function SE () {

  rect ( zX, zY, blk, blkHE, barColor );
  rect ( zX + blk * 2, zY, blk, blkHE, barColor );

}

// Отрисовка  блоков тип в Центре
function CENTER () {
  rect ( zX + blk, zY, blk, blkHE, barColor );
  rect ( zX + blk * 3, zY, blk, blkHE, barColor );
}
function writeINI () {
  myINIFile = new File ( pathJSX + '/barcode.ini' );
  myINIFile.open ( 'e' ); // 'e' read-write open file.
  myINIFile.writeln ( win.coord.name1.e1.text );
  myINIFile.writeln ( win.coord.name1.e2.text );
  if ( dlgext.dopparam.name3.chkLayer.value == true ) {
    myINIFile.writeln ( 'Y' );
  } else {
    myINIFile.writeln ( 'N' );
  }
  if ( dlgext.dopparam.name3.chkScale.value == true ) {
    myINIFile.writeln ( 'Y' );
    myINIFile.writeln ( dlgext.dopparam.name3.eScale.text );
  }
  else {
    myINIFile.writeln ( 'N' );
    myINIFile.writeln ( '100' );
  }
  if ( win.dopparamonoff.chkExtParam.value == true ) {
    myINIFile.writeln ( 'Y' );
    myINIFile.writeln ( dlgext.dopparam.pages.ePages.text );
    myINIFile.writeln ( dlgext.dopparam.name4.eColumn.text );
    myINIFile.writeln ( dlgext.dopparam.name4.eRow.text );
    myINIFile.writeln ( dlgext.dopparam.name5.eDistanceX.text );
    myINIFile.writeln ( dlgext.dopparam.name5.eDistanceY.text );
  }
  else {
    myINIFile.writeln ( 'N' );
    myINIFile.writeln ( dlgext.dopparam.pages.ePages.text );
    myINIFile.writeln ( dlgext.dopparam.name4.eColumn.text );
    myINIFile.writeln ( dlgext.dopparam.name4.eRow.text );
    myINIFile.writeln ( dlgext.dopparam.name5.eDistanceX.text );
    myINIFile.writeln ( dlgext.dopparam.name5.eDistanceY.text );
  }
  myINIFile.writeln ( destFolder );
  myINIFile.close ();
}

