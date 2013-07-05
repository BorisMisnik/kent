/*!
 * Application Core
 */

define(
[
    // core
    'models/registry',
    'router',
    // layout
    'views/stripes',
    // windows
    'views/login',
    'views/register',
    'views/promo_register',
    'views/upload',
    'views/webcam',
    'views/remind',
    'views/rules',
    'views/thanks',
    'views/feedback'
],
function( registry, router,
          Stripes, Login, Register, PromoRegister, Upload, Webcam, Remind, Rules, Thanks, Feedback ) {

    Backbone.log( 'App', arguments );

    var App,
        app,

        // views of application stages
        defaultView = 'login',
        views = {
            // todo: make some views invisible for unauthorized visitors
            login: Login,
            register: Register,
            promo_register: PromoRegister,
            upload: Upload,
            webcam: Webcam,
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

        // Application
        app = new App({ model: registry });
        app.$el.appendTo( 'body' );

        // initial state
        registry.trigger( 'change:state' );
    }


    /**
     * Application
     */
    App = Backbone.Layout.extend(
    {
        template: 'layout',
        stripes: Stripes,

        initialize: function() {
            // listen app-state changes
            this.model.on( 'change:state',
                this.render, this );
            // todo: optimize renders
        },
        beforeRender: function() {
            this.log( 'render..', this.model.get( 'state' ));
            var view = views[ this.model.get( 'state' ) || defaultView ];
            if ( !view ) throw new Error( 'Unknown state!' );
            this.insertView( '#contents', view );
            // todo: fade elder
        },
        afterRender: function() {
            this.stripes.set( this.model.get( 'state' ));
            // todo: fade in
        }
    });


    // init on ready
    $( document )
        .ready( init );

    // API
    return {
        addAppView: function( name, view ) {
            if (!( view instanceof Function ))
                return Backbone.log( 'Bad view constructor!', name );
            if ( views[ name ])
                return Backbone.log( 'View name already used!', name );
            // add view
            views[ name ] = view;

            // todo: Add route (!)
        },
        removeAppView: function( name ) {
            var store = views[ name ];
            if ( !store )
                return Backbone.log( 'Application view not found!', name );
            // remove view
            delete views[ name ];
            return store;

            // todo: Remove route (!)
        }
    }
});
