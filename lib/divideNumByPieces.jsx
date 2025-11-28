function divideNumByPieces(x, delimiter) {
 return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter || " ");
}