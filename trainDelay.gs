function loadJRWestDelay() {
  var url =  "https://trafficinfo.westjr.co.jp/kinki.html";
  var fetchOpt = {
    "muteHttpExceptions": true
  };
  var response = UrlFetchApp.fetch(url,fetchOpt);
  var html = response.getContentText('Shift_JIS');
  
  var regexp, delay="";
  regexp = /<div class='tab-inner'>([\s\S]*?)<\/div><!--.tab-inner-->/;
  html   = html.match(regexp)[1];
  regexp = /<div class='jisyo_contents'>([\s\S]*?)<\/div><!-- .jisyo_contents-->/;
  delay  = (html.match(regexp)[1]).replace(/\n/g,"").replace(/<([\s\S]*?)>|　|※([\s\S]*?)。/g,"").replace(/	/g," ");
  
  //delay  = html.match(regexp)[1].replace("】 ","で、").replace("【","").replace("","の影響により、");
  //if(delay.slice(-2) == "遅れ") delay += "が発生しています。";
  Logger.log(delay);
  return delay;
}
