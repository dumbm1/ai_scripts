/**
 * .jsx for Adobe apps. Marat Shagiev. Date: 09.11.13, Time: 15:23
 * todo: добавить открытие в проводнике ftp-ресурсов
 */
//openURL('ftp://putftp:putftp@mx.flexoprint.msk.ru/_Shagiev/'); // открывается с ошибкой
openURL('jongware.com/idjshelp.html');
openURL('pvsm.ru/pesochnitsa/29255');
/**
* open web page in a system default web browser
* @param {String} address - url of web page
* @return {
*/
function openURL(address) {
address = address || 'www.7-zip.org';
var errRep = '';
  var str = ("@" + (+new Date()) * Math.random() * 10000).slice(-7, -1);
  try{
  var f = File(Folder.temp + '/' + str + '.url');
  }catch(e){
  str += 'line: ' + e.line + ', ' + 'message: ' + e.message + '\n';
  }
  try{
  f.open('w');
  f.write('[InternetShortcut]' + '\r' + 'URL=http://' + address + '\r');
  f.close();
  }catch(e){
  str += 'line: ' + e.line + ', ' + 'message: ' + e.message + '\n';
  }
  try{
  f.execute();
  }catch(e){
  str += 'line: ' + e.line + ', ' + 'message: ' + e.message + '\n';
  }
   try{
  f.remove();
  }catch(e){
  str += 'line: ' + e.line + ', ' + 'message: ' + e.message + '\n';
  }  
  return errRep;
}