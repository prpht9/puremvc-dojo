//dojo.require(["dojo/parser"]);
//dojo.require("dojo.io.script");
//dojo.io.script.get({url: "http://ajax.googleapis.com/ajax/libs/dojo/1.7.2/dojo/dojo.js"});
dojo.require("dijit.form.HorizontalSlider");

// A quick helper function
var sendNote = function(name, msg) {
  var app = ApplicationFacade.getInstance();
  if(msg){
    console.log("sendNote: " + msg);
    app.sendNotification(name, msg);
  }
};

dojo.declare
("SliderMediator", Mediator,
  {
    constructor: function( mediatorName, viewComponent ){
      var app = BlockSlider.getInstance();
      dojo.connect(viewComponent, "onChange", function(evt){
        app.sendNotification(SliderMediator.SLIDER_CHANGED, evt);
      });
    },
    listNotificationInterests: function(){
      return [
      ];
    },
    handleNotification: function( note ) {
      switch ( note.getName() )
      {
      }
    } 
  } 
);
SliderMediator.NAME = "SliderMediator";
SliderMediator.SLIDER_CHANGED = "slider-changed";

dojo.declare
("BlockMediator", Mediator,
  {
    constructor: function( mediatorName, viewComponent ){
      console.log("View Component");
      console.log(viewComponent);
    },
    listNotificationInterests: function(){
      return [
        SliderMediator.SLIDER_CHANGED,
      ];
    },
    handleNotification: function( note ) {
      switch ( note.getName() )
      {
        case SliderMediator.SLIDER_CHANGED:
          console.log("Slider Changed");
          console.log(this.viewComponent);
          var v = "" + note.getBody() + "px";
          console.log(v);
          dojo.style(this.viewComponent, "left", v);
        break;
      }
    } 
  } 
);
BlockMediator.NAME = "BlockMediator";

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
      //app.add("conversation", new HelpConversation("conversation"));
      //this.facade.registerMediator(new HelpMediator(HelpMediator.NAME, app.get("conversation")));
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

dojo.declare
("BlockSlider", Facade,
  {
    constructor: function(){
      console.log("Constructing BlockSlider");
      this.components = {};
      this.initializeFacade();
      console.log("BlockSlider Constructed");
    },
    components: null,
    start: function(){
      console.log("Starting BlockSlider");
      this.add('moving-block', dojo.byId('moving-block'));
      this.add('block-slider', dijit.byId('block-slider'));
      this.registerMediator(new BlockMediator(BlockMediator.NAME, this.get('moving-block')));
      this.registerMediator(new SliderMediator(SliderMediator.NAME, this.get('block-slider')));
      console.log("BlockSlider Running");
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
BlockSlider.getInstance = function()
{
        if( !BlockSlider.instance ){
                BlockSlider.instance = new BlockSlider();
        }
        return BlockSlider.instance;
}

