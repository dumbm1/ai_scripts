renameLayersForAe();


function renameLayersForAe() {
 var ad = activeDocument;
 var lays = ad.layers;

 for (var i = 0; i < lays.length; i++) {
  var lay = lays[i];
  var newName = _getName(lay.name);
  if (newName) lay.name = newName;
 }

 function _getName(name) {
  switch (name) {
   case 'out':
    return 'out color';
    break;
   case 'w':
    return 'out w';
    break;
   case 'inf-tab':
    return 'inf tab';
    break;
   case '@_tt':
    return '@ tt';
    break;
   case 'w copy':
    return 'out w copy';
    break;
   case 'LAYOUT':
    return 'layout';
    break;

   default:
    return false;
    break;

  }
 }
}