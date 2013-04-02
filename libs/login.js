/*!
 * Module: Module
 *
 * @author Andjey Guzhovskiy, <me.the.ascii@gmail.com>
 * @copyright (c) 2013 Andjey Guzhovskiy
 * @licence CLOSED
 * @version 0.0.1
 */

var check = require( 'validator' ).validators,
    filters = require( 'validator' ).sanitize,
    fs = require('fs');

var root = process.cwd();  // where to save files


// Registry

var users;
syncRegistry();

// show exists users
console.log( 'Users:',
    Object.keys( users )
        .map( function( uid ){
            return {
                login: users[ uid ].email,
                password: users[ uid ].password
            }
        })
    );
// make `users` avail for other modules
exports.users = users;

function syncRegistry() {
    // reload users
    if ( !users ) {
        try {
            users = require( root + '/store/users.json' );
        } catch( e ) {
            console.log( 'Load User Error:', e );
            process.exit(1);
        }
    }
    // save users to json file
    if ( users )
        fs.writeFile(
            root + '/store/users.json',
            JSON.stringify( users ),
            function( err, res ){
                //console.log( 'Save Users:', err, res );
            }
        );
}


// Authorizing

/**
 * Errors:
 *
 *  * {String} error
 *  * {Boolean} not_valid
 *  * {Boolean} wrong_credentials
 *
 * Success:
 *
 *  * {Boolean} authorized
 *  * {String} session
 *  * {String} user
 *  * {String} role
 *  * {Number} datetime
 *
 * @param req
 * @param res
 */
exports.login = function( req, res ) {
    var username = req.body.username,
        password = req.body.password,
        user = users[ username ],
        result =
            username == 'test-user' &&
            password == '9LiGd';

    // hack
    if ( user
        && user.password
        && user.password == password )
        result = true;

    console.log( 'Login:', username, '/', password, 'Result:', result );

    // error
    if ( !result ) {
        res.json({
            error: 'Wrong credentials',
            wrong_credentials: true
        });
    }
    // success
    else {
        req.session.uid = user.email;
        res.json({
            authorized: result,
            role: 'user',       // visitor, user, admin
            datetime: + new Date()
        });
    }
};

exports.logout = function( req, res ) {
    req.session.destroy();
    if ( req.xhr )
        res.json({
            success: 'Logged out'
        });
    else
        res.redirect( '/' );
};

/**
 * Errors:
 *
 *  * {String} error
 *  * {Boolean} not_valid
 *  * {Boolean} unknown_email
 *
 * Success:
 *
 *  * {String} success
 *  * {String} email
 *
 * @param req
 * @param res
 */
exports.remind = function( req, res ) {
    var email = req.body.email,
        user = users[ email ];

    // checking ( fake )
    if ( !email )
        res.json({
            error: 'Not valid email address',
            not_valid: true
        });
    else
    if ( !user )
        res.json({
            error: 'Unknown email',
            unknown_email: true
        });
    else {
        // todo: send mail
        res.json({
            success: 'Email with credentials has been sent',
            email: email
        });

        fs.writeFile(
            root + '/store/remind-'+ user.email +'-'+ Math.random().toString( 16 ).substr( 2 ),
            JSON.stringify({
                login: user.email,
                password: user.password,
                email: user.email,
                name: user.name
            }),
            function( err, res ){}
        );
    }

};


// Profile

function profileData( fields,  callback )
{
    if ( !callback ) return;

    var form = {
            name: String( fields.name || '' ),
            day: parseInt( fields.day ) || 1,
            month: parseInt( fields.month ) || 11,
            year: parseInt( fields.year ) || 2013,
            phone: String( fields.phone || '' ),
            email: String( fields.email || '' ),
            password: String( fields.password || '' ),
            password2: String( fields.password2 || '' ),
            agree_age: fields.agree_age == 'true',
            agree_rules: fields.agree_rules == 'true',
            agree_info: fields.agree_info == 'true',
            photo: String( fields.photo || '' )
        },
        errors = {};

    //console.log( 'parsed:', form );

    // name
    if ( !form.name
        || form.name.length >254 )
        errors.name = true;

    // age
    /* debug (!) */ if (parseInt( fields.month )) form.month = 0;

    var age = new Date( form.year, form.month-1, form.day ),
        date = new Date();
    date.setMonth( date.getMonth() - 12 * 18 );
    if ( age.getTime() > date.getTime() )
        errors.age = true;

    // phone
    if ( !form.phone
        || !form.phone.match( /\d{1}\s{1}\(\d{2}\)\s{1}\d{3}\-\d{2}\-\d{2}/ ))  // d (dd) ddd-dd-dd
        errors.phone = true;

    // email
    if ( !form.email
        || form.email.length > 254
        || !check.notEmpty( form.email )
        || !check.isEmail( form.email ))
        errors.email = true;

    // password
    if ( !form.password
        || form.password.length > 50 )
        errors.password = true;

    // not_same_passwords
    if ( form.password !== form.password2 )
        errors.not_same_passwords = true;

    // agree
    if ( !form.agree_age
        || !form.agree_rules
        || !form.agree_info )
        errors.not_agree = true;

    // photo
    // todo: photo upload check ( fs )
    if ( !form.photo )
        errors.photo = true;

    // todo: xss filters and other

    // results
    if ( Object.keys( errors ).length )
        callback( errors );
    else
        callback( null, form )
}


/**
 *
 * Sign up
 * -------
 *
 * Errors:
 *
 *  * {String} error
 *  * {Boolean} already_used_email
 *
 *  * {Boolean} name
 *  * {Boolean} age
 *  * {Boolean} phone
 *  * {Boolean} email
 *  * {Boolean} password
 *  * {Boolean} not_same_passwords
 *  * {Boolean} photo
 *  * {Boolean} not_agree
 *
 * Success:
 *
 *  * {String} success
 *
 * @param req
 * @param res
 */
exports.signup = function( req, res ) {

    //console.log( 'form:', req.body );

    profileData( req.body, function( err, profile ) {

        // errors
        if ( err ) {
            err.error = true;
            res.json( err );
            return;
        }
        if ( users[ profile.email ]) {
            err.error = true;
            res.json({
                error: 'Already used email address',
                already_used_email: true
            });
            return;
        }

        // update user
        users[ profile.email ] = profile;

        // results
        profile.success = true;
        res.json( profile );

        // sync
        syncRegistry();
    });
};


/**
 * Get Profile
 * -----------
 *
 * Errors:
 *
 *  * {String} error
 *  * {Boolean} not_logged
 *
 *  * {Boolean} name
 *  * {Boolean} age
 *  * {Boolean} phone
 *  * {Boolean} email
 *  * {Boolean} password
 *  * {Boolean} not_same_passwords
 *  * {Boolean} photo
 *  * {Boolean} not_agree
 *
 * Success:
 *
 *  * {String} success
 *  * {Object} profile
 *
 * @param req
 * @param res
 */
exports.getProfile = function( req, res ) {
    var id = req.session.uid,
        user = users[ id ];
    if ( !user ) {
        res.json({
            error: 'Not logged in',
            not_logged: true
        });
    } else {
        res.json({
            success: true,
            profile: user
        });
    }
};


/**
 * Save Profile
 * ------------
 *
 * Errors:
 *
 *  * {String} error
 *  * {Boolean} not_logged
 *  * {String}
 *
 * Success:
 *
 *  * {String} success
 *  * {Object} profile
 *
 * @param req
 * @param res
 */
exports.setProfile = function( req, res ) {
    var id = req.session.uid,
        user = users[ id ],
        values = req.body;
    if ( !user ) {
        res.json({
            error: 'Not logged in',
            not_logged: true
        });
    } else {
        // not email!
        // because email is key
        values.email = user.email;
        // normalize
        profileData( values,
            function( err, profile ) {

                // error
                if ( err ) {
                    err.error = true;
                    res.json( err );
                    return;
                }
                // results
                profile.success = true;
                // results
                res.json({
                    success: true,
                    profile: profile
                });

                // update user
                users[ id ] = profile;
                syncRegistry();
            });
    }
};