/*!
 * Application Bootstrap and Configurator
 *
 * @author Andjey Guzhovskiy, <me.the.ascii@gmail.com>
 * @copyright (c) 2013 Andjey Guzhovskiy
 * @licence CLOSED
 * @version 0.0.1
 */

define(
'views/app',
[
    // layout
    'views/stripes',
    // windows
    'views/login',
    'views/register',
    'views/upload',
    'views/remind',
    'views/rules',
    'views/thanks',
    'views/feedback'
],
function( Stripes, Login, Register, Upload, Remind, Rules, Thanks, Feedback ) {
    Backbone.log( 'app', arguments );

    var App,
        app,
        Router,
        router,
        Registry,
        registry,
        // views of application stages
        defaultView = 'login',
        views = {
            // todo: make some views invisible for unauthorized visitors
            login: Login,
            register: Register,
            upload: Upload,
            remind: Remind,
            rules: Rules,
            thanks: Thanks,
            feedback: Feedback
        };


    /**
     * Initialize Application
     */
    function init() {
        // Startup

        // States
        registry = new Registry();

        // Application
        app = new App({ model: registry });
        app.$el.appendTo( 'body' );

        // Routes
        router = new Router();

        Backbone.history.fragment = null;
        Backbone.history.start(); // { pushState: true });
        //router.navigate( location.hash, true );

        // initial state
        registry.trigger( 'change:state' );
    }


    /**
     * Application
     */
    App = Backbone.Layout.extend(
    {
        template: 'layout',
        stripes: new Stripes(),

        initialize: function() {
            // listen app-state changes
            this.model.on( 'change:state',
                this.render, this );
        },
        beforeRender: function() {
            this.log( 'render..' );
            var view = views[ this.model.get( 'state' ) || defaultView ];
            if ( !view ) throw new Error( 'Unknown state!' );
            this.insertView( '#contents', new view() );
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
            '!/register': 'register',
            '!/upload': 'upload',
            '!/thanks': 'thanks',
            '!/remind': 'remind',
            '!/rules': 'rules',
            '!/feedback': 'feedback'
        },

        // handlers

        // login form
        login: function() {
            registry.set({ state: 'login' });
        },
        // registration form
        register: function() {
            registry.set({ state: 'register' });
        },
        // upload image form
        upload: function() {
            registry.set({ state: 'upload' });
        },
        // remind password
        remind: function() {
            registry.set({ state: 'remind' });
        },
        // thanks
        thanks: function() {
            registry.set({ state: 'thanks' });
        },
        // rules
        rules: function() {
            registry.set({ state: 'rules' });
        },
        // feedback form
        feedback: function() {
            registry.set({ state: 'feedback' });
        }
    });


    /**
     * Application Main Registry
     */
    Registry = Backbone.Model.extend({
        defaults: {
            state: 'login',
            session: '',
            user: '',
            role: 'visitor'     // user, admin
        }
    });


    // init on ready
    $( document )
        .ready( init );
});
