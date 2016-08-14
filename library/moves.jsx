/**
 * js for Illustrator CC. Marat Shagiev. Date: 20.10.2014. WebStorm
 */

/**
 * перемещает item внутрь target
 * */
function moveInside(item, target) {
  if (target && item && target.typename == 'GroupItem' || target.typename == 'Layer') {
    item.move(target, ElementPlacement.INSIDE);
  }
  return target;
}
function moveBefore(item, target) {
  if (target && item && target.typename == 'GroupItem' || target.typename == 'Layer') {
    item.move(target, ElementPlacement.PLACEBEFORE);
  }
  return target;
}
function moveAfter(item, target) {
  if (target && item && target.typename == 'GroupItem' || target.typename == 'Layer') {
    item.move(target, ElementPlacement.PLACEAFTER);
  }
  return target;
}
function moveAtBegin(item, target) {
  if (target && item && target.typename == 'GroupItem' || target.typename == 'Layer') {
    item.move(target, ElementPlacement.PLACEATBEGINNING);
  }
  return target;
}
function moveAtEnd(item, target) {
  if (target && item && target.typename == 'GroupItem' || target.typename == 'Layer') {
    item.move(target, ElementPlacement.PLACEATEND);
  }
  return target;
}