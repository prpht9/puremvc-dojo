puremvc-dojo
============

PureMVC Dojo Implementation

Dojo is a great library for building web applications, PureMVC is an excellent Model/View/Controller framework for client side applications. Lets see how the two work out together.  Remember: HTML = Content, CSS = Look/Feel/Layout, JavaScript = Behavior.

Getting Started
---------------

Go to your project directory and...

```````````````````````````````````````````````````
cd public/js
wget --no-check-certificate https://raw.github.com/prpht9/puremvc-dojo/master/public/js/puremvc-dojo.js
```````````````````````````````````````````````````

Your done. the puremvc-dojo-0.1.js file is now available for inclusion into your project. Use the Facade as your parent class and Bob's your uncle.

Skeleton Implementation 
-----------------------

As bare bones as it can be with zero functionality added, here is a sample application and the commands to put in dojo.ready. We recommend putting the following snippet in public/js/init.js or something equivalent. This example is included in the project as well.

```````````````````````````````````````````````````
dojo.declare
("MyApp", Facade,
  {
    constructor: function(){
      this.components = {};
      this.initializeFacade();
      console.log("MyApp Constructed");
    },
    components: null,
    start: function(){
      //this.add('block-slider', dijit.byId('block-slider'));
      //this.registerMediator(new BlockSliderMediator(BlockSliderMediator.NAME, this.get('block-slider')));
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
MyApp.INIT = 'init';
MyApp.getInstance = function()
{
        if( !MyApp.instance ){
                MyApp.instance = new MyApp();
        }
        return MyApp.instance;
}
```````````````````````````````````````````````````

### Programmatic Example - Recommended

Beyond the skeleton Application Facade we can create a PureMVC Mediator to handle events which it registers an interest.

* Create the Widget to exhibit behavior
* Create the Mediator for the Widget
* Add Mediator intests
* Connect the mediator to interests
* Handle the interests
* Register the Mediator

This Mediator could be a part of app.js or it's own .js file.

```````````````````````````````````````````````````
dojo.declare
("BlockSliderMediator", Mediator,
  {
    constructor: function(mediatorName, viewComponent){
      dojo.connect(viewComponent, "onChange", function(evt){
        app.sendNotification(BlockSliderMediator.BLOCK_SLIDER_CHANGED, evt);
      });
    },
    listNotificationInterests: function(){
      return [
        BlockSliderMediator.BLOCK_SLIDER_CHANGED,
      ];
    },
    handleNotification: function( note ) {
      switch ( note.getName() )
      {
        case BlockSliderMediator.BLOCK_SLIDER_CHANGED:
          // Take action on the change here
          // maybe when the block-slider/viewComponent changes
          // alter a chart
        break;
      }
    } 
  } 
);
BlockSliderMediator.NAME = "BlockSliderMediator";
BlockSliderMediator.BLOCK_SLIDER_CHANGED = "block_slider_changed";
```````````````````````````````````````````````````

Remember your html must have a div with the example name 'sliderx' for dojo to know what widget to connect. 

Declarative
-----------

Unable to get working as well with dojo observer hooks: examples may or may not be forthcoming.

Last Step
---------

And the magic to put in your layout template or wherever...

```````````````````````````````````````````````````
  dojo.ready(function(){
    console.log("Dojo: " + dojo.version + " loaded");
    app = MyApp.getInstance();
    app.start();
  });
```````````````````````````````````````````````````

This will start you application and hook it into your rendered web content, as instructed, to enable all your behavior.

Dependencies
------------

These can either be loaded by gem command or letting rvm do all the work. This project includes .rvmrc and .gems files to manage gem dependancies. All you need to do is cd into the directory and tell rvm to trust this project. Gemset @puremvc-dojo is used.

```````````````````````````````````````````````````
gem install rake jasmine
```````````````````````````````````````````````````

or

```````````````````````````````````````````````````
cd puremvc-dojo # and let rvm do the rest
```````````````````````````````````````````````````

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
