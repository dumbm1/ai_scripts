/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 19.12.2015.
 */

var folder = new Folder ('');
folder.execute();

var bt     = new BridgeTalk ();
bt.target  = 'explorer'; // this is a clearly error
bt.body    = revealFolder.toString () + ";" + "revealFolder('" + folder + "');";
bt.onError = function (errorMsgObject) {
  /*The body property of the received message object contains the error
   message, and the headers property contains the error code in its
   Error-Code property.
   1 General error
   8 Syntax error
   20 Bad argument list
   27 Stack overrun
   -28 Out of memory
   -29 Uncaught exception
   31 Bad URI
   32 Cannot perform requested action
   -33 Internal error
   -36 Not yet implemented
   41 Range error
   44 Cannot convert
   47 Type mismatch
   48 File or folder does not exist
   49 File of folder already exists
   50 I/O device is not open
   51 Read past EOF
   52 I/O error
   53 Permission denied
   54 JavaScript execution
   56 Cannot connect
   57 Cannot resolve reference
   58 I/O timeout
   59 No response
   */
  alert (errorMsgObject.body + '\n' + errorMsgObject.headers["Error-Code"]);
}
bt.send ();

function revealFolder (obj) {
  /*illustrator*/explorer.reveal (obj  /* new File (activeDocument.fullName)*/);
}