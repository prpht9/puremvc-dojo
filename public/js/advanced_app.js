
dojo.declare
("HelpIconMediator", Mediator,
  {
    constructor: function( mediatorName, viewComponent ){
      dojo.connect(viewComponent, "onMouseOver", function(evt){
        var app = AdvancedApp.getInstance();
        app.sendNotification(AdvancedApp.INITIATE_CONVERSATION, evt);
      });
    }
  } 
);
HelpIconMediator.NAME = "HelpIconMediator";

dojo.declare
("ConversationMediator", Mediator,
  {
    constructor: function( mediatorName, viewComponent ){
    },
    listNotificationInterests: function(){
      return [
        AdvancedApp.INITIATE_CONVERSATION,
        AdvancedApp.CONTINUE_CONVERSATION,
        AdvancedApp.TERMINATE_CONVERSATION,
      ];
    },
    handleNotification: function( note ) {
      switch ( note.getName() )
      {
        case AdvancedApp.INITIATE_CONVERSATION:
          //var type = note.getBody();
          //this.viewComponent["innerHTML"] = data["favoriteObject"];
        break;
        case AdvancedApp.CONTINUE_CONVERSATION:
        break;
        case AdvancedApp.TERMINATE_CONVERSATION:
        break;
      }
    } 
  } 
);
ConversationMediator.NAME = "ConversationMediator";

dojo.declare
("ConversationProxy", Proxy,
  {
    constructor: function(proxyName, data){
    },
    getData: function(){
      // get json message via rest service
      this.sendNotification(ConversationProxy.MESSAGE_READY, this.data);
    }
  }
);
ConversationProxy.NAME = "ConversationProxy";
ConversationProxy.MESSAGE_READY = "conversation-message-ready";
ConversationProxy.DEFAULT_DATA = ""; 

dojo.declare
("ProxyPrepCommand", SimpleCommand,
  {
    constructor: function(note){
    },
    execute: function(note){
      var app = note.getBody();
      app.registerProxy(new ConversationProxy(ConversationProxy.NAME, ConversationProxy.DEFAULT_DATA));
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
      app.registerMediator(new ConversationMediator(ConversationMediator.NAME, dojo.byId('conversation')));
    }
  }
);

dojo.declare
("CommandPrepCommand", SimpleCommand,
  {
    constructor: function(){
    },
    execute: function(note){
      //var app = note.getBody();
      //this.registerCommand(AdvancedApp.INIT, InitCommand);
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
      this.addSubCommand(CommandPrepCommand);
    }
  }
);

dojo.declare
("AdvancedApp", Facade,
  {
    constructor: function(){
      this.initializeFacade();
    },
    start: function(){
      this.registerCommand(AdvancedApp.INIT, InitCommand);
      this.sendNotification(AdvancedApp.INIT, this, "Object");
      console.log("Advanced App Running");
    }
  }
);
AdvancedApp.INIT = 'application-init-command';
AdvancedApp.INITIATE_CONVERSATION = 'application-initiate-conversation';
AdvancedApp.CONTINUE_CONVERSATION = 'application-continue-conversation';
AdvancedApp.TERMINATE_CONVERSATION = 'application-terminate-conversation';
AdvancedApp.getInstance = function() {
        if( !AdvancedApp.instance ){
                AdvancedApp.instance = new AdvancedApp();
        }
        return AdvancedApp.instance;
}

