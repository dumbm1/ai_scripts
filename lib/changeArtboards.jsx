/**
 * .jsx for Adobe apps. Marat Shagiev. Date: 02.09.2014, Time: 19:29
 */

function changeArtboards() {
  var PT_TO_MM = 2.834645668;
  var doc      = function() {
    return activeDocument;
  }();

  /**
   * конструктор параметров для ф-ции "artboards.add(opts)"
   * вводить параметры надо в соответствии с новой системой координат
   * @constructor
   * @param {Object} opts.left, opts.top, opts.width, opts.height
   * */
  function ArtbOptions(opts) {
    /**
     * тут все ок
     * */
    this.left = opts.left * PT_TO_MM;
    /**
     * косяк адоб:
     * осталась старая система координат, поэтому инвертируем
     */
    this.top = -opts.top * PT_TO_MM;
    /**
     * косяк адоб:
     * рельный width == width - left, поэтому компенсируем
     */
    this.width = (opts.width + opts.left) * PT_TO_MM;
    /**
     * косяк адоб:
     * положительный height воспринимается ф-цией "artboards.add(rect)" как отрицательный
     * и вызывает ошибку "an Illustrator error occurred: 1346458189 ('PARM')"
     * кроме того, осталась старая система координат, поэтому компенсируем
     */
    this.height = (-opts.height - opts.top) * PT_TO_MM;

    /* this.ErrWidth = function () {
     this.msg = 'Неверная ширина артборда';
     }

     this.ErrHeight = function () {
     this.msg = 'Неверная высота артборда';
     }*/

  }

  var opts = new ArtbOptions({
    left: 10, top: 10, width: 100, height: 200
  });

  /* if (opts.width <= 0) {
   throw new opts.ErrWidth();
   }
   if (opts.height <= 0) {
   throw new opts.ErrHeight();
   }*/

  try {
    doc.artboards.add([opts.left, opts.top, opts.width, opts.height]);
  } catch (e) {
    alert(e.description);
  }
}

