/*!
 * Module: Module
 *
 * @author Andjey Guzhovskiy, <me.the.ascii@gmail.com>
 * @copyright (c) 2013 Andjey Guzhovskiy
 * @licence CLOSED
 * @version 0.0.1
 */

var pipe = require( './pipe' );

exports.signup =
    function( req, res) {
        console.log( '!Signup:', req.body );
        pipe( req, res,
            '/account/signup',
            { form: req.body }
        );
    };

exports.getProfile =
    function( req, res ) {
        console.log( 'Get Profile:', req.session );
        pipe( req, res, '/account' );
    };

exports.setProfile =
    function( req, res ) {
        console.log( 'Update Profile:', req.body );
        pipe( req, res,
            '/account/profile',
            { form: req.body }
        );
    };

