// propatiesをsetする方法↓
function setGasProp(){
  var properties = PropertiesService.getScriptProperties();
  var propName   = "kanto";
  var json       = '{"pages":[{"url":"https://www.jma.go.jp/bosai/#pattern=forecast","iframeId":"weather","reloadDur":1800},{"url":"https://weathernews.jp/s/warn/kanto.html","iframeId":"wwarn","reloadDur":1800}],"tprop":{"title":"鉄道運行情報","url":"https://script.google.com/macros/s/AKfycbxOBOfpSsnApd0GMwPm2xCLlBmnksqqUkLMICRFldFDBLt7Uv8/exec?mode=json_rd&design=JR%E6%9D%B1%E6%97%A5%E6%9C%AC","reloadDur":180,"fieldName":"delayMsg"}}';
  properties.setProperty(propName, json);
}

function getGasProp(){
  var propaties = PropertiesService.getScriptProperties();
  var keys = propaties.getKeys();
  for(k in keys)console.log(keys[k],propaties.getProperty(keys[k]));
}
