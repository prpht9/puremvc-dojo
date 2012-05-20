puremvc-dojo
============

PureMVC Dojo Implementation

Dojo is a great library for building web applications, [PureMVC](http://puremvc.org/) is an excellent Model/View/Controller framework for client side applications. Lets see how the two work out together.  Remember: HTML = Content, CSS = Look/Feel/Layout, JavaScript = Behavior.

We do assume you know what the PureMVC Framwork is, why it should be used and conceptually how to implement an application within the Framework. (prior Javascript development experience recommended)

Getting Started
---------------

Go to your project directory and...

````````````````````````````````````````````````````````````````````````````````
cd public/js
#### Optionally download the full Dojo Toolkit
# wget http://download.dojotoolkit.org/release-1.7.2/dojo-release-1.7.2.tar.gz
# tar xzvf dojo-release-1.7.2.tar.gz
wget --no-check-certificate https://raw.github.com/prpht9/puremvc-dojo/master/public/js/puremvc-dojo.js
````````````````````````````````````````````````````````````````````````````````

Your done. the puremvc-dojo-0.1.js file is now available for inclusion into your project. Use the Facade as your parent class and Bob's your uncle.

Skeleton Implementation 
-----------------------

As bare bones as it can be with zero functionality added, here is a sample application and the commands to put in dojo.ready. We recommend putting the following snippet in public/js/init.js or something equivalent. This example is included in the project as well.

````````````````````````````````````````````````````````````````````````````````
dojo.declare
("MyApp", Facade,
  {
    constructor: function(){
      this.initializeFacade();
    },
    components: null,
    start: function(){
      //this.registerMediator(new BlockSliderMediator(BlockSliderMediator.NAME, this.get('block-slider')));
      console.log("MyApp Running");
    }
  }
);
MyApp.INIT = 'init';
MyApp.getInstance = function()
{
        if( !MyApp.instance ){
                MyApp.instance = new MyApp();
        }
        return MyApp.instance;
}
````````````````````````````````````````````````````````````````````````````````

### Programmatic Example - Recommended

Beyond the skeleton Application Facade we can create a PureMVC Mediator to handle events which it registers as interests.

* Create the Widget to exhibit behavior
* Create the Mediator for the Widget
* Add Mediator intests
* Connect the mediator to interests
* Handle the interests
* Register the Mediator

This Mediator could be a part of app.js or it's own .js file.

````````````````````````````````````````````````````````````````````````````````
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

````````````````````````````````````````````````````````````````````````````````

Remember your html must have divs with the names 'moving-block' and 'block-slider' for dojo to find the widget to connect. 

Declarative
-----------

Unable to get working as well with dojo observer hooks: examples may or may not be forthcoming.

Last Step
---------

And the magic to put in your layout template or wherever...

````````````````````````````````````````````````````````````````````````````````
  dojo.ready(function(){
    console.log("Dojo: " + dojo.version + " loaded");
    app = MyApp.getInstance();
    app.start();
  });
````````````````````````````````````````````````````````````````````````````````

This will start you application and hook it into your rendered web content, as instructed, to enable all your behavior.

Dependencies
------------

These can either be loaded by gem command or letting rvm do all the work. This project includes .rvmrc and .gems files to manage gem dependancies. All you need to do is cd into the directory and tell rvm to trust this project. Gemset 1.9.2@puremvc-dojo is used.

````````````````````````````````````````````````````````````````````````````````
gem install rake jasmine
````````````````````````````````````````````````````````````````````````````````

or

````````````````````````````````````````````````````````````````````````````````
cd puremvc-dojo # and let rvm do the rest
````````````````````````````````````````````````````````````````````````````````


Story
=====

Originally intended for use in a Nitro/Og web application, puremvc-dojo has been designed and developed on [Ramaze](http://ramaze.net/)/[Sequel](http://sequel.rubyforge.org/) using [Cucumber](http://cukes.info/)/[Rspec](http://rspec.info/)/[Webrat](https://github.com/brynary/webrat)/[Selenium-WebDriver](http://seleniumhq.org/docs/03_webdriver.html) for server side testing and [Jasmine-Species](http://rudylattae.github.com/jasmine-species/)/[Jasmine](http://pivotal.github.com/jasmine/)/[Selenium-WebDriver](http://seleniumhq.org/docs/03_webdriver.html) for client side testing. As you can tell we like Behavior Driven Development (BDD) around here. Don't release without it.

Thanks
======

* To everyone who contributed to all the tools I depend on every day. In all sincerity, thank you.
* Cliff Hall - for PureMVC over in the ActionScript world, because MVC isn't just for server side
* Michael Fellinger (manveru) - for Ramaze and the wonders it beholds
* Jeremy Evans - for Sequel, the best ORM out there
* Jamis Buck - for the absolute best deployment tool, Capistrano
* yorikpeterse, huma, pistos and all the others - for the excellent help in #ramaze on freenode
* All the creators and contributors to the following,
** BCrypt
** cucumber
** daemons
** debian
** dojo
** jasmine
** jasmine-species
** jasmine-dom
** nagoro
** nokogiri
** rack
** rspec
** rvm
** mongrel
** postrgresql
** sqlite3
** ubuntu
** uuidtools
** webrat
