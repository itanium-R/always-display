function loadWeather() {
  var area = {"name" : "京都",
              "code" : 333};
  var url =  "https://www.jma.go.jp/jp/yoho/"+area.code+".html";
  var fetchOpt = {
    "muteHttpExceptions": true
  };
  var response = UrlFetchApp.fetch(url,fetchOpt);
  var html = response.getContentText('UTF-8');
  

  var regexp1  = /<table class=\"forecast\" id=\"forecasttablefont\">([\s\S]*?)<\/table>/;
  var forecast = html.match(regexp1)[0];
  var regexp2  = /<th class=\"weather\">([\s\S]*?)<\/th>/;
  var weather  = forecast.match(regexp2)[0];
  var regexp3  = /今日([\s\S]*?)日/;
  var date     = forecast.match(regexp3)[0];
  var regexp4  = /src=\"([\s\S]*?)\"/;
  var wImg     = "https://www.jma.go.jp/jp/yoho/" + weather.match(regexp4)[0].slice(5).replace('"','');
  
  Logger.log(date);
  var wJson    = {"area" : area.name,
                  "date" : date,
                  "img"  : wImg
                  };
  
  
  wJson=JSON.stringify(wJson);
  Logger.log(wJson);
  return wJson;
}
