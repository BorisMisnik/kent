define(
'views/app',
[
    // layout
    'views/stripes',
    // windows
    'views/login',
    'views/register'
],
function( Stripes, Login, Register ) {
    console.log( 'app', arguments );

    var App,
        app,
        Router,
        router,
        States,
        states;

    /**
     * Initialize Application
     */
    function init() {
        // Startup

        // Application
        app = new App();
        app.$el.appendTo( 'body' );

        // Routes
        router = new Router();

        console.log( 'url hash:', location.hash );
        console.log( 'history.fragment:', Backbone.history.fragment );

        Backbone.history.fragment = null;
        Backbone.history.start(); // { pushState: true });
        //router.navigate( location.hash, true );

        window.r = router;

        // States
        states = new States();
    }


    /**
     * Application
     */
    App = Backbone.Layout.extend(
    {
        template: 'layout',
        stripes: new Stripes(),

        initialize: function() {
        },
        beforeRender: function() {
            console.log( 'render..' );
            //this.insertView( '#contents', new Login() );
            //this.insertView( '#contents', new Register() );
        },
        afterRender: function() {
            this.stripes.set( 'register' );
        }
    });


    /**
     * Routes url
     */
    Router = Backbone.Router.extend(
    {
        routes: {
            '': 'login',
            '!/login': 'login',
            '!/register': 'register'
        },

        // handlers

        // login form
        login: function() {
            app.insertView( '#contents', new Login() );
            app.render();
        },
        // registration form
        register: function() {
            app.insertView( '#contents', new Register() );
            app.render();
        }
    });

    /**
     * States
     */
    States = Backbone.Model.extend({
        defaults: {
            state: 'login'
        }
    });


    // init on ready
    $( document )
        .ready( init );
});
