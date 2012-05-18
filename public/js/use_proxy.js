dojo.require("dijit.form.HorizontalSlider");

dojo.declare
("UpdateFavoriteObjectCommand", SimpleCommand,
  {
    constructor: function(note){
    },
    execute: function(note){
      var app = ProxyChanger.getInstance();
      var objProxy = app.retrieveProxy(MockObjectProxy.NAME);
      var data = objProxy.getData();
      data["favoriteObject"] = note.getBody();
      objProxy.setData(data);
    }
  }
);

dojo.declare
("ProxySliderMediator", Mediator,
  {
    constructor: function( mediatorName, viewComponent ){
      dojo.connect(viewComponent, "onChange", function(evt){
        var app = ProxyChanger.getInstance();
        app.sendNotification(ProxySliderMediator.PROXY_SLIDER_CHANGED, evt);
      });
    }
  } 
);
ProxySliderMediator.NAME = "ProxySliderMediator";
ProxySliderMediator.PROXY_SLIDER_CHANGED = "proxy-slider-changed";

dojo.declare
("ProxyMediator", Mediator,
  {
    constructor: function( mediatorName, viewComponent ){
      // mediatorName and viewComponent set and used by parent contructor
    },
    listNotificationInterests: function(){
      return [
        MockObjectProxy.DATA_UPDATED,
      ];
    },
    handleNotification: function( note ) {
      switch ( note.getName() )
      {
        case MockObjectProxy.DATA_UPDATED:
          var data = note.getBody();
          console.log("MockObject Updated: note.getBody");
          console.log(data);
          this.viewComponent["innerHTML"] = data["favoriteObject"];
        break;
      }
    } 
  } 
);
ProxyMediator.NAME = "ProxyMediator";

dojo.declare
("MockObjectProxy", Proxy,
  {
    constructor: function(proxyName, data){
      this.sendNotification(MockObjectProxy.DATA_UPDATED, this.data);
    },
    setData: function(data){
      this.data = data;
      this.sendNotification(MockObjectProxy.DATA_UPDATED, this.data);
    }
  }
);
MockObjectProxy.NAME = "MockObjectProxy";
MockObjectProxy.DATA_UPDATED = "data-updated";
MockObjectProxy.DEFAULT_DATA = {};
console.log("MockObjectProxy Processed");

dojo.declare
("ProxySliderPrepCommand", SimpleCommand,
  {
    constructor: function(note){
    },
    execute: function(note){
      var app = note.getBody();
      app.registerProxy(new MockObjectProxy(MockObjectProxy.NAME, MockObjectProxy.DEFAULT_DATA));
      console.log("ProxySliderPrepCommand Initialized");
    }
  }
);

dojo.declare
("ProxyMediatorPrepCommand", SimpleCommand,
  {
    constructor: function(){
    },
    execute: function(note){
      var app = note.getBody();
      app.add('label-proxy', dojo.byId('label-proxy'));
      app.add('proxy-slider', dijit.byId('proxy-slider'));
      app.registerMediator(new ProxyMediator(ProxyMediator.NAME, app.get('label-proxy')));
      app.registerMediator(new ProxySliderMediator(ProxySliderMediator.NAME, app.get('proxy-slider')));
      console.log("ProxyMediatorPrepCommand Initialized");
    }
  }
);

dojo.declare
("InitProxyChanger", MacroCommand,
  {
    constructor: function(){
      
    },
    initializeMacroCommand: function(note){
      this.addSubCommand(ProxySliderPrepCommand);
      this.addSubCommand(ProxyMediatorPrepCommand);
      console.log("InitProxyChanger Initialized");
    }
  }
);

dojo.declare
("ProxyChanger", Facade,
  {
    constructor: function(){
      this.initializeFacade();
    },
    start: function(){
      this.registerCommand(ProxyChanger.INIT, InitProxyChanger);
      this.sendNotification(ProxyChanger.INIT, this, "Object");
      this.registerCommand(ProxySliderMediator.PROXY_SLIDER_CHANGED, UpdateFavoriteObjectCommand);
      console.log("ProxyChanger Running");
    }
  }
);
ProxyChanger.INIT = 'init';
ProxyChanger.getInstance = function()
{
        if( !ProxyChanger.instance ){
                ProxyChanger.instance = new ProxyChanger();
        }
        return ProxyChanger.instance;
}

