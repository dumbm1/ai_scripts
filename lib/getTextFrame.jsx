; (function f() { // try to get the TextFrame

  if (!selection[0] && !selection.typename) throw new Error('No selection!'); // no selection

  if (selection[0]) { // object mode
    if (selection.length > 1) throw new Error('So meny selection!');
    if (selection[0].typename === 'GroupItem') { // try to get TextFrame from GrouItem
      if (selection[0].pageItems.length > 1) throw new Error('It\'s a complex group!');
      if (selection[0].pageItems[0].typename !== 'TextFrame') {
        throw new Error('Selection in group doesn\'t a Text Frame!');
      }
      return selection[0].pageItems[0];

    }
    if (selection[0].typename !== 'TextFrame') throw new Error('Selection doesn\'t a Text Frame!');
    return selection[0];
  } else if (selection.typename) { // text mode
    return selection.parent.textFrames[0];
  }

  throw new Error();
}());