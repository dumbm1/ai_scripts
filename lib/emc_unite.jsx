/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 27.08.2016
 *
 * emc_unite
 *
 * may gives unexpected result in some cases,
 * e.g. when the path has a dushed stroke
 */

(function emc_unite() {
  executeMenuCommand ("group");
  executeMenuCommand ("Live Pathfinder Add");
  executeMenuCommand ("expandStyle");
} ());
