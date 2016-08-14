//@target illustrator-19

var fullCont, 
fullContMod, 
selFrame = activeDocument.textFrames[0],
re = /aaaa/gmi,
replacer = '!';
var t = 1000;
executeMenuCommand('deselectall');
selFrame.textRange.characters[0].select();
selFrame.textRange.characters[1].select(true);
selFrame.textRange.characters[2].select(true);
selFrame.textRange.characters[3].select(true);

 stop(t);

fullCont = selFrame.textSelection[0].contents + selFrame.textSelection[1].contents;
fullContMod = fullCont.replace (re, replacer);
selFrame.textSelection[1].contents = fullContMod.slice (-1);
selFrame.textSelection[0].contents = fullContMod.slice (0, -1);


executeMenuCommand('deselectall');

 stop(t);

selFrame.textRange.characters[1].select();
selFrame.textRange.characters[2].select(true);
selFrame.textRange.characters[3].select(true);
selFrame.textRange.characters[4].select(true);

 stop(t);

fullCont = selFrame.textSelection[0].contents + selFrame.textSelection[1].contents;
fullContMod = fullCont.replace (re, replacer);
selFrame.textSelection[1].contents = fullContMod.slice (-1);
selFrame.textSelection[0].contents = fullContMod.slice (0, -1);


 executeMenuCommand('deselectall');

function stop(t){
    redraw();
    $.sleep(t);
}

