/*!
 * Module: Module
 */

define(
    [ 'models/registry' ],
    function( registry ) {


        /**
         * Routes url
         */
        var Router = Backbone.Router.extend(
            {
                routes: {
                    '': 'login',
                    '!/login': 'login',
                    '!/register': 'register',
                    '!/promo_register': 'promo_register',
                    '!/upload': 'upload',
                    '!/webcam': 'webcam',
                    '!/thanks': 'thanks',
                    '!/remind': 'remind',
                    '!/rules': 'rules',
                    '!/feedback': 'feedback',
                    '!/unsibscriber' : 'unsibscriber'
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
                // promo registration form
                promo_register: function() {
                    registry.set({ state: 'promo_register' });
                },
                // upload image form
                upload: function() {
                    registry.set({ state: 'upload' });
                },
                // webcam shot
                webcam: function() {
                    registry.set({ state: 'webcam' });
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
                },
                // unsibscriber
                unsibscriber: function(){
                    registry.set({state : 'unsibscriber'});
                }
            }),
            router = new Router();

        // init

        Backbone.history.fragment = null;
        Backbone.history.start(); // { pushState: true });
        //router.navigate( location.hash, true );

        return router;

    });

