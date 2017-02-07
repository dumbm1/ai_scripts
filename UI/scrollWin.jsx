/**
 * scrollabel alert from Peter Kernel's Beginning ScriptUI
 * */
function scrollWin(input) {
  var inp = input;
  if (inp instanceof Array) {
    inp = inp.join("\r");
  }

  var w    = new Window("dialog", 'Scrollable alert'),
      list = w.add("edittext", undefined, inp, {multiline: true, scrolling: true});

  list.maximumSize.height = w.maximumSize.height - 100;
  list.minimumSize.width  = 600;

  w.add("button", undefined, "Close", {name: "ok"});
  w.show();
}
