/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 20.08.2016
 * writen by (c)Silly V ; on Apr 10, 2016 3:00 AM
 * https://forums.adobe.com/message/8671813#8671813
 *
 * this use for load scripts to the action 
 * work only in manual start from menu File>Scripts (not from sturtup folder)
 * or if at least one time was called the menu item File>Scripts
 * because the scripts are loaded and became available
 * 
 * reloadActPan
 */

////@target illustrator

reloadActPan ();

function reloadActPan () {

  if ((app.version.substr (0, 2) * 1) < 16) {
    alert ("Sorry, the Action Reloader script only works in versions CS6 and above.");
    return;
  }

  var actionFolder = Folder (Folder.myDocuments + "/" + "Illustrator Actions");
  if (!actionFolder.exists) {
    alert ("The folder for script-reloadable Actions is not found at '" + decodeURI (actionFolder) + "'");
    return;
  }

  var actionFiles = actionFolder.getFiles (function (f) {
    return f.displayName.match (/\.aia$/);
  });

  var thisFile, thisSetName;

  for (var i = 0; i < actionFiles.length; i++) {
    thisFile    = actionFiles[i];
    thisSetName = thisFile.displayName.replace (".aia", "");
    reloadActionSet (thisFile, thisSetName);
  }

  function removeActionSet (setName) {
    var errorFlag = false;
    while (!errorFlag) {
      try {
        app.unloadAction (setName, "");
      } catch (e) {
        errorFlag = true;
      }
    }
  }

  function loadActionSet (aiaFile) {
    app.loadAction (aiaFile);
  }

  function reloadActionSet (aiaFile, setName) {
    removeActionSet (setName);
    loadActionSet (aiaFile);
  }
}
