feature('Skeleton App Startup', function() {
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
        var movingBlock;
        var blockSlider;
        given('BlockSlider is started', function() {
            loadFixtures('fixtures/block_slider.html');
            movingBlock = document.getElementById('moving-block');
            blockSlider = document.getElementById('block-slider');
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

});
