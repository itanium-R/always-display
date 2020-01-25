// propatiesをsetする方法↓
function setGasProp(){
  var properties = PropertiesService.getScriptProperties();
  var propName   = "";
  var json       = '';
  properties.setProperty(propName, json);
}
