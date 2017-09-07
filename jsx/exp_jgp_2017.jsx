/**
 * Adobe ExtendScript for Illustrator
 * (c) Marat Shagiev
 * e-mail: m_js@bk.ru
 * 06.09.2017
 * */
// var pth = (activeDocument.fullName + '').slice(0, -3) + "jpg";

{
  var actStr = "/version 3" +
    "/name [ 6" +
    "	373267726179" +
    "]" +
    "/isOpen 1" +
    "/actionCount 1" +
    "/action-1 {" +
    "	/name [ 6" +
    "		373267726179" +
    "	]" +
    "	/keyIndex 0" +
    "	/colorIndex 0" +
    "	/isOpen 1" +
    "	/eventCount 1" +
    "	/event-1 {" +
    "		/useRulersIn1stQuadrant 0" +
    "		/internalName (adobe_exportDocument)" +
    "		/localizedName [ 6" +
    "			4578706f7274" +
    "		]" +
    "		/isOpen 0" +
    "		/isOn 1" +
    "		/hasDialog 1" +
    "		/showDialog 0" +
    "		/parameterCount 7" +
    "		/parameter-1 {" +
    "			/key 1885434477" +
    "			/showInPalette 0" +
    "			/type (raw)" +
    "			/value < 104" +
    "				060000000100000003000000020000000000fa00030000000000000001000000" +
    "				69006d006100670065006d006100700000004404300439043b0420004d043a04" +
    "				41043f043e04400442043004200037003200200042043e0447043a0438042000" +
    "				0000000000000000" +
    "			>" +
    "			/size 104" +
    "		}" +
    "		/parameter-2 {" +
    "			/key 1851878757" +
    "			/showInPalette -1" +
    "			/type (ustring)" +
    "			/value [ 76" +
    // pth +
    "				443a5c405cd182d0b5d181d182d0bed0b2d18bd0b920d184d0b0d0b9d0bb20d1" +
    "				8dd0bad181d0bfd0bed180d182d0b020373220d182d0bed187d0bad0b820d181" +
    "				d0b5d180d18bd0b92e6a7067" +
    "			]" +
    "		}" +
    "		/parameter-3 {" +
    "			/key 1718775156" +
    "			/showInPalette -1" +
    "			/type (ustring)" +
    "			/value [ 16" +
    "				4a5045472066696c6520666f726d6174" +
    "			]" +
    "		}" +
    "		/parameter-4 {" +
    "			/key 1702392942" +
    "			/showInPalette -1" +
    "			/type (ustring)" +
    "			/value [ 12" +
    "				6a70672c6a70652c6a706567" +
    "			]" +
    "		}" +
    "		/parameter-5 {" +
    "			/key 1936548194" +
    "			/showInPalette -1" +
    "			/type (boolean)" +
    "			/value 0" +
    "		}" +
    "		/parameter-6 {" +
    "			/key 1935764588" +
    "			/showInPalette -1" +
    "			/type (boolean)" +
    "			/value 0" +
    "		}" +
    "		/parameter-7 {" +
    "			/key 1936875886" +
    "			/showInPalette -1" +
    "			/type (ustring)" +
    "			/value [ 1" +
    "				31" +
    "			]" +
    "		}" +
    "	}" +
    "}"
}

var f = new File ('~/ScriptAction.aia');
f.open ('w');
f.write (actStr);
f.close ();
app.loadAction (f);
f.remove ();
app.doScript ("72gray", "72gray", false); // action name, set name
app.unloadAction ("72gray", ""); // set name