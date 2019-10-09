// ページにアクセスされたときに実行
function doGet(e) {  
  
  var output = HtmlService.createTemplateFromFile("index");
  
  return output.evaluate()
  .setTitle('Otenki')
  .addMetaTag('viewport', 'width=device-width, initial-scale=1')
  .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  
}

