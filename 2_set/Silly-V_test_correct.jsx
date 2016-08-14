//Silly-V Aug 9, 2016 3:24 PM (in response to m s)
//Yea it's a tricky one- I got one to work finally. And yea for those matches where the style is different within the match, maybe do the format comparison then.
 
#target illustrator
function test(){
  var doc = app.activeDocument;
  var s = doc.textFrames[0];
  var oldWord = "bird";
  var oldWordRx = new RegExp(oldWord, "g");
  var newWord = "puppy-dog";
  var textString = s.contents;
  var matches = textString.match(oldWordRx);
  if(!matches){return;}
 
  var indexArr;
  for(var i=0, ln = matches.length; i<ln; i++){
    oldWordRx.exec(s.contents);
    indexArr = [oldWordRx.lastIndex - oldWord.length, oldWordRx.lastIndex];
    for(var j=0; j<s.textRange.characters.length; j++){
      if(j >= indexArr[0] && j <= indexArr[1]){
        s.textRange.characters[j].select(true);
      }
    }
    s.textRange.textSelection[0].contents = newWord;
    s.textRange.deSelect();
  };
 
 
};
test();