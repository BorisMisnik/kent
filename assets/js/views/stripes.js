define(
    [
        // todo: 'views/background-login'
        'views/stripes/login',
        'views/stripes/register',
        'views/stripes/remind',
        'views/stripes/upload'
    ],
    function( login, register, remind, upload ) {
        Backbone.log( 'app.stripes', arguments );

        return Backbone.Layout.extend(
        {
            // avail stripes animations
            _stripes: {
                login: login,
                register: register,
                thanks: register,
                remind: remind,
                feedback: remind,
                rules: register,
                upload: upload
            },
            // current animation name
            _current: '',

            /**
             * Change stripes
             * @param {String} name
             * @return {*}
             */
            set: function( name ) {
                // change stripes animation

                // LOCK!
                // return;

                var anim;
                console.log( 'Change stripes from:', this._current, 'to:', name );

                // params
//                if ( this._current == name )
//                    return this;

                // old
                if ( this._current )
                    anim = this._stripes[ this._current ];
                anim &&
                anim.stop &&
                anim.stop();

                // new
                anim = this._stripes[ name ];
                if ( !anim ) return;
                this._current = name;
                anim.start && anim.start();

                return this;
            }
        });

    });
