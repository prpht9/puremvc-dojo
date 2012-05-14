feature('App startup', function() {
    summary(
        'As a prospective customer',
        'I want a slick javascript application',
        'To help me enjoy the site'
    );

    scenario('The app bootstraps and is running', function() {
        var app;
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
        var app;
        var mediator;
        var block;
        var blockStyle;
        var slider;
        given('We have our content', function() {
            loadFixtures('fixtures/block_slider.html');
            block = dojo.byId('moving-block');
            blockStyle = dojo.style(block);
        });
        given('We create the block slider widget', function() {
            slider = new dijit.form.HorizontalSlider({
              name: "block-slider",
              minimum: 0,
              maximum: 500,
              value: 0,
              intermediateChanges: true,
              //discreteValues: 6,
            }, "block-slider");
            slider.startup();
        });
        given('BlockSlider is started', function() {
            app = BlockSlider.getInstance();
            app.start();
        });
        then('I retrieve the Mediator', function() {
            mediator = app.retrieveMediator('BlockMediator');
        });
        then('The Mediator should be a Mediator', function() {
            expect(mediator instanceof Mediator).toBeTruthy;
        });
        then('The moving block should be in position 0', function() {
            expect(block).toHaveText("Slide Me!");
            expect(blockStyle["left"]).toEqual("0px");
        });
        then('I move slider to position 1', function() {
            slider.set('value', 100);
        });
        // Wait for the async onChange event to process
        waitsFor(function() {
            if ( blockStyle["left"] === "100px" ) { return true };
        }, "Style never changed", 250);
        then('The block moved to position 1', function() {
            expect(blockStyle["left"]).toEqual("100px");
        });
        then('I move slider to position 2', function() {
            slider.set('value', 200);
        });
        // Wait for the async onChange event to process
        waitsFor(function() {
            if ( blockStyle["left"] === "200px" ) { return true };
        }, "Style never changed", 250);
        then('The block moved to position 2', function() {
            expect(blockStyle["left"]).toEqual("200px");
        });
    });

});


