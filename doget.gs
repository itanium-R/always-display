// ページにアクセスされたときに実行
function doGet(e) {  
  
  try{
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
      .setTitle('always')
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
    
    if(mode == "json_jrwd"){
      var json = JSON.stringify({"JRWestDelay":loadJRWestDelay()});
      return ContentService.createTextOutput()
      .setMimeType(ContentService.MimeType.JSON)
      .setContent(json);
    }

    if(mode == "json_test"){
      return ContentService.createTextOutput()
      .setMimeType(ContentService.MimeType.JSON)
      .setContent('{"msg":"これはテストメッセージです"}');
    }
    
    if(mode == "json_preset"){
      var preset     = e.parameter["preset"];

      var properties = PropertiesService.getScriptProperties();
      var presetJson = properties.getProperty(preset);
      
      if(presetJson == null){
        presetJson = '{"error":"not found"}';
      }
      
      return ContentService.createTextOutput()
      .setMimeType(ContentService.MimeType.JSON)
      .setContent(presetJson);
    }
    
    return HtmlService.createTemplateFromFile("index").evaluate()
    .setTitle('Otenki')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  
  }catch(e){
    
    var output = HtmlService.createTemplateFromFile("soft500");
    output.e = e;
    return output.evaluate()
    .setTitle('500')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
}