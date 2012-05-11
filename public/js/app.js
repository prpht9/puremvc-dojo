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
("BlockMediator", Mediator,
  {
    constructor: function( mediatorName, viewComponent ){
      this.createBlockSlider();
    },
    createBlockSlider: function(){
      var blockSlider = new dijit.form.HorizontalSlider({
        name: "block-slider",
        minimum: 1,
        maximum: 5,
        value: 1,  
        intermediateChanges: true,
      }, "block-slider");
      dojo.connect(blockSlider, "onChange", function(evt){
        this.sendNotification(BlockMediator.BLOCK_SLIDER_CHANGED, evt);
      });
      blockSlider.startup();
    },
    listNotificationInterests: function(){
      return [
        BlockMediator.BLOCK_SLIDER_CHANGED,
      ];
    },
    handleNotification: function( note ) {
      switch ( note.getName() )
      {
        case BlockMediator.BLOCK_SLIDER_CHANGED:
          console.log("Block Slider Changed");
          // this.viewComponent.blah
          // maybe when the slider changes
          // alter a chart
        break;
      }
    } 
  } 
);
BlockMediator.NAME = "BlockMediator";
BlockMediator.BLOCK_SLIDER_CHANGED = "block-slider-changed";

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
      this.registerMediator(new BlockMediator(BlockMediator.NAME, this.get('moving-block')));
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

