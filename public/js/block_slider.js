dojo.require("dijit.form.HorizontalSlider");

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
      // mediatorName and viewComponent set and used by parent contructor
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
          var v = "" + note.getBody() + "px";
          console.log("Slider Value: " + v);
          dojo.style(this.viewComponent, "left", v);
        break;
      }
    } 
  } 
);
BlockMediator.NAME = "BlockMediator";

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

