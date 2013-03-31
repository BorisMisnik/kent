define(
'views/app',
[
    // layout
    'views/stripes',
    // windows
    'views/login'
],
function( Stripes, Login ) {
    console.log( 'app', arguments );

    var App;

    /**
     * Initialize Application
     */
    function init() {
        // Startup
        var app = new App();
        app.render()
            .view.$el.appendTo( 'body' );
    }

    /**
     * Application
     * @type {*}
     */
    App = Backbone.Layout.extend(
    {
        template: 'layout',
        stripes: new Stripes(),

        initialize: function() {
        },
        beforeRender: function() {
            // login window
            this.insertView( '#contents', new Login() );
        },
        afterRender: function() {
            this.stripes.set( 'login' );
        }
    });

    // init on ready
    $( document )
        .ready( init );


//        // stripes test
//        t = 2500;
//        setTimeout( function() {
//            layout.change( 'upload' );
//            setTimeout( function() {
//                layout.change( 'register' );
//                setTimeout( function() {
//                    layout.change( 'remind' );
//                    setTimeout( function() {
//                        layout.change( 'upload' );
//                    }, t );
//                }, t );
//            }, t );
//        }, t );

});
