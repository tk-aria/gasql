function dump() {
  var message = "oauth: " + ScriptApp.getOAuthToken();
  Logger.log(message);
  //Browser.msgBox(message);
}