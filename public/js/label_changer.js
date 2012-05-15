dojo.require("dijit.form.HorizontalSlider");

dojo.declare
("LabelSliderMediator", Mediator,
  {
    constructor: function( mediatorName, viewComponent ){
      var app = LabelChanger.getInstance();
      dojo.connect(viewComponent, "onChange", function(evt){
        app.sendNotification(LabelSliderMediator.LABEL_SLIDER_CHANGED, evt);
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
LabelSliderMediator.NAME = "LabelSliderMediator";
LabelSliderMediator.LABEL_SLIDER_CHANGED = "slider-changed";

dojo.declare
("LabelMediator", Mediator,
  {
    constructor: function( mediatorName, viewComponent ){
      // mediatorName and viewComponent set and used by parent contructor
    },
    listNotificationInterests: function(){
      return [
        LabelSliderMediator.LABEL_SLIDER_CHANGED,
      ];
    },
    handleNotification: function( note ) {
      switch ( note.getName() )
      {
        case LabelSliderMediator.LABEL_SLIDER_CHANGED:
          var v = note.getBody();
          console.log("LabelSlider Value: " + v);
          this.viewComponent["innerHTML"] = v
        break;
      }
    } 
  } 
);
LabelMediator.NAME = "LabelMediator";

dojo.declare
("LabelProxyPrepCommand", SimpleCommand,
  {
    constructor: function(note){
    },
    execute: function(note){
      var app = note.getBody();
      //app.registerProxy(new SampleProxy(SampleProxy.NAME, SampleProxy.DEFAULT_DATA));
      console.log("LabelProxyPrepCommand Initialized");
    }
  }
);

dojo.declare
("LabelMediatorPrepCommand", SimpleCommand,
  {
    constructor: function(){
    },
    execute: function(note){
      var app = note.getBody();
      app.add('changing-label', dojo.byId('changing-label'));
      app.add('label-slider', dijit.byId('label-slider'));
      app.registerMediator(new LabelMediator(LabelMediator.NAME, app.get('changing-label')));
      app.registerMediator(new LabelSliderMediator(LabelSliderMediator.NAME, app.get('label-slider')));
      console.log("LabelMediatorPrepCommand Initialized");
    }
  }
);

dojo.declare
("InitLabelChanger", MacroCommand,
  {
    constructor: function(){
      
    },
    initializeMacroCommand: function(note){
      this.addSubCommand(LabelProxyPrepCommand);
      this.addSubCommand(LabelMediatorPrepCommand);
      console.log("InitLabelChanger Initialized");
    }
  }
);

dojo.declare
("LabelChanger", Facade,
  {
    constructor: function(){
      console.log("Constructing LabelChanger");
      this.components = {};
      this.initializeFacade();
      console.log("LabelChanger Constructed");
    },
    components: null,
    start: function(){
      console.log("Starting LabelChanger");
      this.registerCommand(LabelChanger.INIT, InitLabelChanger);
      this.sendNotification(LabelChanger.INIT, this, "Object");
      console.log("LabelChanger Running");
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
LabelChanger.INIT = 'init';
LabelChanger.getInstance = function()
{
        if( !LabelChanger.instance ){
                LabelChanger.instance = new LabelChanger();
        }
        return LabelChanger.instance;
}

