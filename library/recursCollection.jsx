/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 13.05.2016
 */
/**
 * Recursive bypassing the collection of elements
 *
 * @param {Function} fn - the applied function
 * @param {Object} collection - some Illustrator DOM collection of elements (selection, PageItems, ets.)
 * */
function recursCollection (fn, collection) {
  if (!collection.length) throw new Error ('No such collection');
  for (var i = 0; i < collection.length; i++) {
    var elem = collection[i];
    switch (elem.typename) {
      case 'GroupItem':
        recursCollection (fn, elem.pageItems);
        break;
      case 'PathItem':
        fn (elem);
        break;
      case 'CompoundPathItem':
        recursCollection (fn, elem.pathItems);
        break;
      default:
        break;
    }
  }
}
