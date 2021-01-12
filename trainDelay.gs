var DEF_G_BGCOLOR = "#2040aa";
var DEF_Y_BGCOLOR = "#ffd900";
var DEF_R_BGCOLOR = "#a10000";

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
    //regexp = /<div class='jisyo_contents'>([\s\S]*?)<\/div><!-- .jisyo_contents-->/;
    regexp = /<p class='gaiyo'>([\s\S]*?)<\/p>/;
    for(var i = 1;i <= jishoList.length;i++){
      // Logger.log(jishoList[i]);
      delay += (jishoList[i].match(regexp)[1])
                  .replace(/<([\s\S]*?)>|　|	|※([\s\S]*?)。|振替([\s\S]*?)バイト）/g,"　")
                  .replace(/ {2,}|　{2,}/g,"　") + "　　　　　";
    }
  }catch(e){
    Logger.log(e);
  }  
  delay = delay.replace(/\n/g,"　");
  
  var color = DEF_G_BGCOLOR;
  
  if(delay == ""){
    delay = "列車の遅れなどの情報はありません。";
  }else{
    if(delay.indexOf("運転を見合わせています") >= 0){
      color = DEF_R_BGCOLOR;
    }else{
      color = DEF_Y_BGCOLOR;
    }
  }

  Logger.log(color)
  Logger.log(delay);

  return JSON.stringify({"JRWestDelay": delay, "bgcolor": color});
}
