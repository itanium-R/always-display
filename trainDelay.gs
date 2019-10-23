function loadJRWestDelay() {
  var url =  "https://trafficinfo.westjr.co.jp/kinki.html";
  var fetchOpt = {
    "muteHttpExceptions": true
  };
  var response = UrlFetchApp.fetch(url,fetchOpt);
  var html = response.getContentText('Shift_JIS');
  
  var regexp, delay = "";
  try{
    regexp = /<div class='tab-inner'>([\s\S]*?)<\/div><!--#syosai_n-->/;
    html   = html.match(regexp)[1];
    var jishoList = html.split("<div class='jisyo'>");
    regexp = /<div class='jisyo_contents'>([\s\S]*?)<\/div><!-- .jisyo_contents-->/;
    for(var i = 1;i <= jishoList.length;i++){
      delay += (jishoList[i].match(regexp)[1]);
    }
  }catch(e){
    Logger.log(e);
  }  
  delay = delay.replace(/\n/g,"　").replace(/<([\s\S]*?)>|　|	|※([\s\S]*?)。|振替輸送実施情報([\s\S]*?)バイト）/g,"　").replace(/ {2,}|　{2,}/g,"　");
  if(delay == "") delay = "列車の遅れなどの情報はありません。";
  Logger.log(delay);
  return delay;
}
