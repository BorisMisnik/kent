define(
    [
        // 'js!/js/form.js!order'
    ],
    function() {
        console.log( 'app2.js' );

        return Backbone.Layout.extend(
        {
            template: 'login',
            serialize: function() {
                return { name: 'a123' };
            },
            initialize: function() {
            },
            beforeRender: function() {
            },
            afterRender: function() {
                //this.$el.contents().appendTo( 'body' );
            }
        });

    });