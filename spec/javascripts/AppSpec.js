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

    scenario('The Slider and Block are setup', function() {
        var blockSliderApp;
        var mediator;
        var blockElement;
        var blockStyle;
        var sliderElement;
        var blockSlider;
        var fixtures;
        given('We have our content', function() {
            dojo.ready(function(){
            });
            loadFixtures('fixtures/block_slider.html');
            fixtures = document.getElementById('jasmine-fixtures');
            expect(fixtures).toHaveId('jasmine-fixtures');
            //blockElement = document.getElementById('moving-block');
            blockElement = dojo.byId('moving-block');
            expect(blockElement).toHaveId('moving-block');
            //sliderElement = document.getElementById('block-slider');
            sliderElement = dojo.byId('block-slider');
            expect(sliderElement).toHaveId('block-slider');
        });
        given('We create the block slider widget', function() {
            blockSlider = new dijit.form.HorizontalSlider({
              name: "block-slider",
              minimum: 0,
              maximum: 500,
              value: 0,
              intermediateChanges: true,
              //discreteValues: 6,
            }, "block-slider");
            blockSlider.startup();
        });
        given('BlockSlider is started', function() {
            blockSliderApp = BlockSlider.getInstance();
            blockSliderApp.start();
        });
        then('I retrieve the Mediator', function() {
            mediator = blockSliderApp.retrieveMediator('BlockMediator');
        });
        then('The Mediator should be a Mediator', function() {
            expect(mediator instanceof Mediator).toBeTruthy;
        });
        then('The moving block should be in position 0', function() {
            expect(blockElement).toHaveText("Slide Me!");
            blockStyle = dojo.style(blockElement);
            console.log("Block Style");
            console.log("Left: " + blockStyle["left"]);
            expect(blockStyle["left"]).toBe("0px");
        });
        then('I move slider to position 1', function() {
            blockSlider.set('value', 100);
        });
        then('The block blah', function() {
            blockStyle = dojo.style(blockSliderApp.get('moving-block'));
            console.log("Block Style2");
            console.log("Left: " + blockStyle["left"]);
            expect(blockStyle["left"]).toBe("100px");
        });
    });

});


