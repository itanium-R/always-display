// ページにアクセスされたときに実行
function doGet(e) {  
  
  var area = e.parameter["area"];
  var NS   = e.parameter["NS"];
  var mode = e.parameter["mode"];
  
  if(mode == "rits"){
    return HtmlService.createTemplateFromFile("rits").evaluate()
             .setTitle('Otenki')
             .addMetaTag('viewport', 'width=device-width, initial-scale=1')
             .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  
  if(mode == "ticker"){
    return HtmlService.createTemplateFromFile("ticker").evaluate()
             .setTitle('ticker')
             .addMetaTag('viewport', 'width=device-width, initial-scale=1')
             .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  
  if(mode == "json"){
    return ContentService.createTextOutput()
            .setMimeType(ContentService.MimeType.JSON)
            .setContent(loadWeather(area,NS));
  }
  
  return HtmlService.createTemplateFromFile("index").evaluate()
           .setTitle('Otenki')
           .addMetaTag('viewport', 'width=device-width, initial-scale=1')
           .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  
}