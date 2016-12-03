/**
 * Adobe ExtendScript for Illustrator CS6+
 * (c) Marat Shagiev
 * e-mail: m_js@bk.ru
 * 03.12.2016
 * Autor: qsedftghk (from rudtp.ru)
 * Sourse: http://forum.rudtp.ru/threads/kak-ispolzovat-onclose.66312/page-2#post-900048
 * */

//@target illustrator
//@targetengine illustrator
(function showSplach(splashInfo, delay) {
  var w = new Window("palette", "Test Splash Window");
  w.add('statictext', [0, 0, 150, 40], splashInfo + '\nSplash delay: ' + delay, {multiline: true});
  w.show();
  w.update();
  $.sleep(delay);
  w.close();
}('Test Splash Info', 1500));
