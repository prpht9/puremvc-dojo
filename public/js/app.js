
// A quick helper function
var sendNote = function(name, msg) {
  var app = ApplicationFacade.getInstance();
  if(msg){
    console.log("sendNote: " + msg);
    app.sendNotification(name, msg);
  }
};

dojo.declare
("ProxyPrepCommand", SimpleCommand,
  {
    constructor: function(note){
    },
    execute: function(notification){
      //this.facade.registerProxy(new SampleProxy(SampleProxy.NAME, SampleProxy.DEFAULT_DATA));
      console.log("ProxyPrepCommand Initialized");
    }
  }
);

dojo.declare
("MediatorPrepCommand", SimpleCommand,
  {
    constructor: function(){
    },
    execute: function(note){
      var app = note.getBody();
      app.add("conversation", new HelpConversation("conversation"));
      this.facade.registerMediator(new HelpMediator(HelpMediator.NAME, app.get("conversation")));
      console.log("MediatorPrepCommand Initialized");
    }
  }
);

dojo.declare
("InitCommand", MacroCommand,
  {
    constructor: function(){
      
    },
    initializeMacroCommand: function(note){
      this.addSubCommand(ProxyPrepCommand);
      this.addSubCommand(MediatorPrepCommand);
      console.log("InitCommand Initialized");
    }
  }
);

dojo.declare
("ApplicationFacade", Facade,
  {
    constructor: function(){
    },
  }
);
ApplicationFacade.INIT = "init";

ApplicationFacade.getInstance = function()
{
        if( !ApplicationFacade.instance ){
                ApplicationFacade.instance = new ApplicationFacade();
        }
        return ApplicationFacade.instance;
}

dojo.declare
("MyAppName", null,
  {
    constructor: function(){
      console.log("Constructing MyAppName");
      this.facade = ApplicationFacade.getInstance();
      this.components = {};
      console.log("MyAppName Constructed");
    },
    facade: null,
    components: null,
    otherChart: null,
    start: function(){
      console.log("Starting MyAppName");
      this.facade.registerCommand(ApplicationFacade.INIT, InitCommand);
      this.facade.sendNotification(ApplicationFacade.INIT, this, "Object");
      console.log("MyAppName Running");
    },
    add: function(id, obj){
      this.components[id] = obj;
    },
    get: function(id){
      return this.components[id];
    },
    remove: function(id){
      delete this.components[id];
    }
  }
);
