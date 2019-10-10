function loadWeather(areaCode,NSArea) {
  var area = getArea(areaCode);
  area.NSArea = (NSArea) ?  NSArea : "南部"; 
  var url =  "https://www.jma.go.jp/jp/yoho/" + area.code + ".html";
  var fetchOpt = {
    "muteHttpExceptions": true
  };
  var response = UrlFetchApp.fetch(url,fetchOpt);
  var html = response.getContentText('UTF-8');
  
  var regexp,forecast,weather,
      w={
        tod:[],
        tom:[]
      };
  if(area.NSArea == "南部"){
    regexp     = /南部([\s\S]*?)<div class=\"fortemplete\">/;
  }else{
    area.NSArea = "北部";
    regexp      = /北部([\s\S]*?)<div class=\"fortemplete\">/;
  }
  forecast   = html.match(regexp)[0];
  regexp     = /<th class=\"weather\">([\s\S]*?)<th class=\"weather\">/;
  w.tod.html = forecast.match(regexp)[0];
  regexp     = /明日([\s\S]*?)<th class=\"weather\">/;
  w.tom.html = forecast.match(regexp)[0];
    
  getDayWeather(w.tod);
  getDayWeather(w.tom);
  
  var wJson    = {
    "area" : area,
    "today":{
      "day" : w.tod.day,
      "img"  : w.tod.img,
      "tmp"  : {
        "max" : w.tod.tmax,
        "min" : w.tod.tmin
      }
    },
    "tomorrow":{
      "day" : w.tom.day,
      "img"  : w.tom.img,
      "tmp"  : {
        "max" : w.tom.tmax,
        "min" : w.tom.tmin
      }
    }
  };
  
  wJson=JSON.stringify(wJson);
  Logger.log(wJson);
  return wJson;
}

function getDayWeather(day){
  var regexp     = /src=\"([\s\S]*?)\"/;
  day.img  = "https://www.jma.go.jp/jp/yoho/" + day.html.match(regexp)[0].slice(5).replace('"','');
  regexp     = /(今|明)(日|朝|夜)([\s\S]*?)日/;
  day.day = day.html.match(regexp)[3];
  regexp     = /<td class=\"min\">([\s\S]*?)度/;
  try{
    day.tmin = parseInt(day.html.match(regexp)[1], 10);
  }catch(e){
    day.tmin = null;
  }
  regexp     = /<td class=\"max\">([\s\S]*?)度/;
  try{
    day.tmax = parseInt(day.html.match(regexp)[1], 10);
  }catch(e){
    day.tmax = null;
  }
}

function getArea(areaCode){
  
  var area = [
    {
      "name"   : "京都",
      "code"   : 333,
    },
    {
      "name"   : "滋賀",
      "code"   : 334,
    }
  ];
  if(areaCode == area[1].code)return area[1];
  
  return area[0];
}