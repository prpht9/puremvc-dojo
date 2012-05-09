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

});


