function scrollWin (input) {
  if (input instanceof Array)     input = input.join ("\r");
  
  var w                   = new Window ("dialog", 'Scrollable alert'),
      list                = w.add ("edittext", undefined, input, {multiline: true, scrolling: true});
  
  list.maximumSize.height = w.maximumSize.height - 100;
  list.minimumSize.width  = 600;
  
  w.add ("button", undefined, "Close", {name: "ok"});
  w.show ();
}
