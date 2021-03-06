function scrapeBusTime(){
  var url =  "https://www.google.co.jp/maps/preview/place?gl=jp&q=%E7%AB%8B%E5%91%BD%E9%A4%A8%E5%A4%A7%E5%AD%A6&pb=!1m10!1s0x60016dc0417498f1%3A0x728f0b9ad9c748f3!3m8!1m3!1d2894.389572007779!2d135.96255700000003!3d34.982725900000005!3m2!1i414!2i680!4f13.1!12m3!2m2!1i390!2i111!13m35!3m1!2i4!6m6!1m2!1i414!2i147!1m2!1i736!2i83!7m24!1m3!1e1!2b0!3e3!1m3!1e2!2b1!3e2!1m3!1e2!2b0!3e3!1m3!1e3!2b0!3e3!1m3!1e8!2b0!3e3!1m3!1e3!2b1!3e2!9b0!14m7!4m1!2i19232!7e140!9sfvmjXZynJ8KTr7wPwfy8yAw%3A680943681602!17sfvmjXZynJ8KTr7wPwfy8yAw%3A680943681603!24m1!2e1!15m10!2b1!5m1!6b1!10m6!1e4!6b0!8e2!9e1!9e2!9e3";
  var fetchOpt = {
    "muteHttpExceptions": true
  };
  var response = UrlFetchApp.fetch(url,fetchOpt);
  var html = response.getContentText('UTF-8');
  var regexp, bus="";
  regexp = /null,null,null,null,null,null,null,1,\["立命館大学",\[\[null,"バス",([\s\S]*?)〒525-0058 滋賀県草津市野路東１丁目１/;
  bus=(html.match(regexp)[1]);
  var busList = bus.split(',null,null,16777215,2]');
  if(busList.length <= 1) busList = bus.split(',null,null,null,2]');
  regexp = /\[null,\[\["([\s\S]*?)行",null,null,([\s\S]*?),"Asia\/Tokyo","([\s\S]*?)",([\s\S]*?),\[5,\["([\s\S]*?)",1,([\s\S]*?)\]/; 
  var busJson   = []; 
  for(var i=0;i<25;i++){
    try{
      var busRegexped = busList[i].match(regexp);
      var busRecord = {
        "destn": busRegexped[1],
        "time":  busRegexped[3],
        "route": busRegexped[5]
      }
      busJson.push(busRecord);
    }catch(e){
      break;
    }
  }
  busJson = JSON.stringify(busJson);
  Logger.log(busJson);
  
  var properties = PropertiesService.getScriptProperties();
  properties.setProperty("busJson", busJson);
  return busJson;
}

function loadBusTime(preventsRedo){
  var properties = PropertiesService.getScriptProperties();
  var busList = JSON.parse(properties.getProperty("busJson"));
  var newDate = new Date();
  var index = 0;
  var now = (newDate.getHours() * 60) + newDate.getMinutes();
  if(now < 4 * 60) time += 24 * 60; // 0~3時は24~27時として扱う
  Logger.log(now);
  for each(bus in busList){
    var time = (bus.time.slice(0,bus.time.length-3)-0) * 60;
    if(time <= 3 * 60) time += 24 * 60; // 0~3時は24~27時として扱う
    time    += (bus.time.slice( -2)-0);
    Logger.log(time + "?" +now);
    if(time > now) break;               // 過去の時刻でないものをみつけたらbreak
    if(time < (now - (12 * 60))) break; // 12時間以上前なら翌日分と判定（scrape関数を6時間間隔で実行すること）
    index += 1;                         // 出発後の便は消込
  }
  Logger.log(index);
  if(index > 0){
    for(var i = 0;i < index;i++) busList.shift();
    properties.setProperty("busJson", JSON.stringify(busList));  
  }
  if(busList.length < 7 && !preventsRedo){
    try{
      scrapeBusTime();
      return loadBusTime(true);
    }catch(e){
      Logger.log(e);
    }
  }
  while(busList.length > 7) busList.pop(); // 7件渡す
  busList = JSON.stringify(busList);
  Logger.log(busList);
  return busList;
}

function checkBusLen(){
  var properties = PropertiesService.getScriptProperties();
  var busList = JSON.parse(properties.getProperty("busJson"));
  Logger.log(busList.length);
}
