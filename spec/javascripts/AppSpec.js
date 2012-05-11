feature('App startup', function() {
    summary(
        'As a prospective customer',
        'I want a slick javascript application',
        'To help me enjoy the site'
    );

    scenario('The app bootstraps and is running', function() {
        var app;
        given('Dojo is started', function() {
            dojo.ready(function(){
            });
        });
        then('Dojo version should be available', function() {
            expect("Dojo: " + dojo.version + " loaded").toContain("1.7.2");
        });
        given('I can start the new Application', function() {
            app = MyApp.getInstance();
        });
        when('I start the Application', function() {
            app.start();
        });
        then('The ApplicationFacade should not be null', function() {
            expect(app instanceof Facade).toBeTruthy;
        });
    });

    scenario('The Mediator is registered', function() {
        var blockSliderApp;
        var mediator;
        given('BlockSlider is started', function() {
            dojo.ready(function(){
            });
            blockSliderApp = BlockSlider.getInstance();
            blockSliderApp.start();
        });
        when('I retrieve the Mediator', function() {
            mediator = blockSliderApp.retrieveMediator('BlockMediator');
        });
        then('The Mediator should be a Mediator', function() {
            expect(mediator instanceof Mediator).toBeTruthy;
        });
    });

    scenario('The Slider moves the Block', function() {
        var blockSliderApp;
        var mediator;
        var blockElement;
        var sliderElement;
        var blockSlider;
        var fixtures;
        given('We have our content', function() {
            dojo.ready(function(){
            });
            loadFixtures('fixtures/block_slider.html');
            fixtures = document.getElementById('jasmine-fixtures');
            expect(fixtures).toHaveId('jasmine-fixtures');
            blockElement = document.getElementById('moving-block');
            expect(blockElement).toHaveId('moving-block');
            sliderElement = document.getElementById('block-slider');
            expect(sliderElement).toHaveId('block-slider');
        });
        given('We create the block slider widget', function() {
            blockSlider = new dijit.form.HorizontalSlider({
              name: "block-slider",
              minimum: 1,
              maximum: 5,
              value: 1,
              intermediateChanges: true,
            }, "block-slider");
            blockSlider.startup();
        });
        given('BlockSlider is started', function() {
            //movingBlock = document.getElementById('moving-block');
            //blockSlider = document.getElementById('block-slider');
            blockSliderApp = BlockSlider.getInstance();
            blockSliderApp.start();
        });
        when('I retrieve the Mediator', function() {
            mediator = blockSliderApp.retrieveMediator('BlockMediator');
        });
        then('The Mediator should be a Mediator', function() {
            expect(mediator instanceof Mediator).toBeTruthy;
        });
        then('The moving block should be in position 1', function() {
            expect(blockElement).toHaveText("Slide Me");
        });
    });

});


