var DEF_G_BGCOLOR = "#2040aa";
var DEF_Y_BGCOLOR = "#e68e00";
var DEF_R_BGCOLOR = "#a10000";

function testLRD(){
  Logger.log(loadRailDelay())
}

function loadRailDelay(design) {
  var url =  "https://tetsudo.rti-giken.jp/free/delay.json";
  var fetchOpt = {
    "muteHttpExceptions": true
  };
  var response = UrlFetchApp.fetch(url,fetchOpt);
  var html = response.getContentText('utf-8');
  var delayJson = JSON.parse(html);
  var delayMsg = "";
  var delayLineCnt = 0;
  var lastCompany = "";
  
  for(var i in delayJson){
    
    var company = delayJson[i].company;
    var name    = delayJson[i].name;
    var isDesignated = (company.indexOf(design) != -1 || name.indexOf(design) != -1 || design == null); 

    if(isDesignated){
      if(delayLineCnt > 0){
        delayMsg += "、";
      }
      if(company != lastCompany){
        delayMsg += company + "";
      }
      delayMsg     += name;
      delayLineCnt += 1;
      lastCompany   = delayJson[i].company;

    }
  }
  
  var color = DEF_G_BGCOLOR;
  
  if(delayMsg == ""){
    delayMsg = "列車の遅れなどの情報はありません。";
  }else{
    delayMsg += ("に遅延などの情報があります．")
    color = DEF_Y_BGCOLOR;
  }

  Logger.log(color)
  Logger.log(delayMsg);

  return JSON.stringify({"delayMsg": delayMsg, "bgcolor": color});
}
