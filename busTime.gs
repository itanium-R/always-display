function loadBusTime(){
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
  regexp = /\[null,\[\["([\s\S]*?)行",null,null,([\s\S]*?),"Asia\/Tokyo","([\s\S]*?)",([\s\S]*?)\[5,\["([\s\S]*?)",1,"#ffffff","#000000"\]/; 
  var busJson   = []; 
  for(var i=0;i<7;i++){
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
  return busJson;
}
