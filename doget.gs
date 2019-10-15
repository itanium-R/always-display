// ページにアクセスされたときに実行
function doGet(e) {  
  
  var areaCode = e.parameter["area"];
  var NS       = e.parameter["NS"];
  var mode     = e.parameter["mode"];
  if(NS == "N") NS = "北部";
  if(NS == "S") NS = "南部";
  
  if(mode == "w"){
    var output = HtmlService.createTemplateFromFile("weatherMode");
    output.areaCode = areaCode;
    output.NS       = NS;
    return output.evaluate()
                 .setTitle('RCCフォームビューア')
                 .addMetaTag('viewport', 'width=device-width, initial-scale=1')
                 .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  
  if(mode == "ticker"){
    return HtmlService.createTemplateFromFile("ticker").evaluate()
             .setTitle('ticker')
             .addMetaTag('viewport', 'width=device-width, initial-scale=1')
             .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  
  if(mode == "bus"){
    return HtmlService.createTemplateFromFile("bus").evaluate()
             .setTitle('ticker')
             .addMetaTag('viewport', 'width=device-width, initial-scale=1')
             .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  
  if(mode == "json"){
    return ContentService.createTextOutput()
            .setMimeType(ContentService.MimeType.JSON)
            .setContent(loadWeather(areaCode,NS));
  }
  
  return HtmlService.createTemplateFromFile("index").evaluate()
           .setTitle('Otenki')
           .addMetaTag('viewport', 'width=device-width, initial-scale=1')
           .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  
}