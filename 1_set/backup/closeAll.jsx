/**
 * .jsx for Adobe apps by Marat Shagiev  01.11.13
 */
var confirmClose = confirm('Close all open documents without saving?', '', 'Close all without saving');

if (confirmClose) {
	try {
		var saveOpts = SaveOptions.DONOTSAVECHANGES;
		var len = documents.length;
		for (var i = 0; i < len; i++) {
			documents[i].close(saveOpts);
			i--;
		}
	} catch (e) {
		// alert(e.name + '\n' + e.massage);
	}
}
