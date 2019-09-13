//@target illustrator-22

;(function namedTechLays(techNames) {
  var d = activeDocument;
  var TECH_NAMES = techNames || ['__W__', '__LAYOUT__', '__@_TT__', '__COMMON__', '__COLORS__'];

  var groups = d.groupItems;
  for (var i = 0; i < groups.length; i++) {
    for (var j = 0; j < TECH_NAMES.length; j++) {
      if (groups[i].name != TECH_NAMES[j]) continue;
      groups[i].layer.name = TECH_NAMES[j].slice(2, -2);
    }
  }
}(['__W__', '__LAYOUT__', '__@_TT__', '__COMMON__', '__COLORS__']));