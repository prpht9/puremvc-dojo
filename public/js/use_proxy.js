dojo.require("dijit.form.HorizontalSlider");

dojo.declare
("UseSliderMediator", Mediator,
  {
    constructor: function( mediatorName, viewComponent ){
      this.app = UseProxy.getInstance();
      this.objProxy = this.app.retrieveProxy(MockObjectProxy.NAME);
      dojo.connect(viewComponent, "onChange", function(evt){
        var data = this.objProxy.getData();
        data["favoriteObject"] = evt;
        this.objProxy.setData(data);
      });
    },
    app: null,
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
UseSliderMediator.NAME = "UseSliderMediator";
console.log("UseSliderMediator Processed");

dojo.declare
("UseLabelMediator", Mediator,
  {
    constructor: function( mediatorName, viewComponent ){
      // mediatorName and viewComponent set and used by parent contructor
      this.app = UseProxy.getInstance();
      this.objProxy = this.app.retrieveProxy(MockObjectProxy.NAME);
    },
    app: null,
    objProxy: null,
    listNotificationInterests: function(){
      return [
        MockObjectProxy.DATA_UPDATED,
      ];
    },
    handleNotification: function( note ) {
      switch ( note.getName() )
      {
        case MockObjectProxy.DATA_UPDATED:
          var data = this.proxy.data();
          console.log("UseSlider Value: " + data["favoriteObject"]);
          this.viewComponent["innerHTML"] = data["favoriteObject"]);
        break;
      }
    } 
  } 
);
UseLabelMediator.NAME = "UseLabelMediator";
console.log("UseLabelMediator Processed");

dojo.declare
("MockObjectProxy", Proxy,
  {
    constructor: function(proxyName, data){
      this.sendNotification(DATA_UPDATED, this);
    },
    setData: function(data){
      this.data = data;
      this.sendNotification(DATA_UPDATED, this);
    },
    getData: function(){
    }
  }
);
MockObjectProxy.NAME = "MockObjectProxy";
MockObjectProxy.DATA_UPDATED = "data-updated";
MockObjectProxy.DEFAULT_DATA = {};
console.log("MockObjectProxy Processed");

dojo.declare
("UseProxyPrepCommand", SimpleCommand,
  {
    constructor: function(note){
    },
    execute: function(note){
      var app = note.getBody();
      app.registerProxy(new MockObjectProxy(MockObjectProxy.NAME, MockObjectProxy.DEFAULT_DATA));
      console.log("UseProxyPrepCommand Initialized");
    }
  }
);
console.log("UseProxyPrepCommand Processed");

dojo.declare
("UseMediatorPrepCommand", SimpleCommand,
  {
    constructor: function(){
    },
    execute: function(note){
      var app = note.getBody();
      app.add('label-proxy', dojo.byId('label-proxy'));
      app.add('proxy-slider', dijit.byId('proxy-slider'));
      app.registerMediator(new UseLabelMediator(UseLabelMediator.NAME, app.get('label-proxy')));
      app.registerMediator(new UseSliderMediator(UseSliderMediator.NAME, app.get('proxy-slider')));
      console.log("UseMediatorPrepCommand Initialized");
    }
  }
);
console.log("UseMediatorPrepCommand Processed");

dojo.declare
("InitUseProxy", MacroCommand,
  {
    constructor: function(){
    },
    initializeMacroCommand: function(note){
      this.addSubCommand(UseProxyPrepCommand);
      this.addSubCommand(UseMediatorPrepCommand);
      console.log("InitUseProxy Initialized");
    }
  }
);
console.log("InitUseProxy Processed");

dojo.declare
("UseProxy", Facade,
  {
    constructor: function(){
      console.log("Constructing UseProxy");
      this.components = {};
      this.initializeFacade();
      console.log("UseProxy Constructed");
    },
    components: null,
    start: function(){
      console.log("Starting UseProxy");
      this.registerCommand(UseProxy.INIT, InitUseProxy);
      this.sendNotification(UseProxy.INIT, this, "Object");
      console.log("UseProxy Running");
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
UseProxy.INIT = 'init';
UseProxy.getInstance = function()
{
        if( !UseProxy.instance ){
                UseProxy.instance = new UseProxy();
        }
        return UseProxy.instance;
}
console.log("UseProxy Processed");

