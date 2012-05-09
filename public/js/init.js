dojo.require("dojo.parser");

dojo.ready(function(){
  console.log("Dojo version " + dojo.version + " is loaded");
  var app = ApplicationFacade.getInstance();
  app.start();
  console.log("Application Started.");
});

