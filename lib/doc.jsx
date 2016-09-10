/**
 * Получить документ
 * @param {number} index начиная с НУЛЯ! порядковый № в коллекции documents
 * @return {Object/bool} Document или false
 */
function doc(index) {
  if (!documents.length) return false;

  if (arguments.length == 0) {
    return activeDocument;
  }

  if (documents.length > index) {
    return documents[index];
  } else {
    return activeDocument;
  }
}