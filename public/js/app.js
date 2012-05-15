
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
    execute: function(note){
      var app = note.getBody();
      //app.registerProxy(new SampleProxy(SampleProxy.NAME, SampleProxy.DEFAULT_DATA));
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
      //app.add("conversation", new HelpConversation("conversation"));
      //app.registerMediator(new HelpMediator(HelpMediator.NAME, app.get("conversation")));
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
("MyApp", Facade,
  {
    constructor: function(){
      console.log("Constructing MyApp");
      this.components = {};
      console.log("MyApp Constructed");
    },
    facade: null,
    components: null,
    otherChart: null,
    start: function(){
      console.log("Starting MyApp");
      this.registerCommand(MyApp.INIT, InitCommand);
      this.sendNotification(MyApp.INIT, this, "Object");
      console.log("MyApp Running");
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
MyApp.INIT = "init";
MyApp.getInstance = function()
{
        if( !MyApp.instance ){
                MyApp.instance = new MyApp();
        }
        return MyApp.instance;
}

