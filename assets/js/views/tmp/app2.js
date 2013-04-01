define(
    [ 'views/app4' ],
    function() {
        console.log( 'app2.js' );

        var Test = Backbone.Layout.extend({
            template: 'test',
            serialize: function() {
                return { name: 'a123' };
            },
            initialize: function() {
                console.log( 'app.test init' );
            },
            beforeRender: function() {
                console.log( 'beforeRender' );
            },
            afterRender: function() {
                console.log( 'afterRender' );
            }
        });

        return Test;
        // return { ok: true };
    });