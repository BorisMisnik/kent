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

var users;
try {
    users = require( process.cwd() + '/store/users.json' );
} catch( e ){
    users = {};
}
console.log( 'Users:', users );


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
        result =
            username == 'test-user' &&
            password == '9LiGd';

    // hack
    if ( users[ username ]
        && users[ username ] == password )
            result = true;

    console.log( 'Login:', username, '/', password, 'Result:', result );

    // error
    if ( !result )
        res.json({
            error: 'Wrong credentials',
            wrong_credentials: true
        });
    // success
    else
        res.json({
            authorized: result,
            session: 'session_id',
            user: 'user_id',
            role: 'user',       // visitor, user, admin
            datetime: + new Date()
        });
};

exports.logout = function( req, res ) {
    res.json({
        warn: 'Not implement'
    });
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
    var email = req.body.email;
    console.log( 'body', req.body );

    // checking ( fake )
    if ( !email )
        res.json({
            error: 'Not valid email address',
            not_valid: true
        });
    else
    if ( email != 'me@com' )
        res.json({
            error: 'Unknown email',
            unknown_email: true
        });
    else
        res.json({
            success: 'Email with credentials has been sent',
            email: email
        });

};

/**
 * Errors:
 *
 *  * {String} error
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

    console.log( 'form:', req.body );
//    console.log( 'files:', req.files );

    var form = {
            name: String( req.body.name || '' ),
            day: parseInt( req.body.day ) || 0,
            month: parseInt( req.body.month ) || 11,
            year: parseInt( req.body.year ) || 2013,
            phone: String( req.body.phone || '' ),
            email: String( req.body.email || '' ),
            password: String( req.body.password || '' ),
            password2: String( req.body.password2 || '' ),
            agree_age: req.body.agree_age == 'true',
            agree_rules: req.body.agree_rules == 'true',
            agree_info: req.body.agree_info == 'true',
            photo: String( req.body.photo || '' )
        },
        errors = {};

    //console.log( 'parsed:', form );

    // name
    if ( !form.name
        || form.name.length >254 )
        errors.name = true;

    // age
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


    // results

    if ( Object.keys( errors ).length ) {
        errors.error = true;
        res.json( errors );
        console.log( 'sent:', errors );
    } else {
        res.json({ success: true });
        // todo: return filtered form values

        users[ form.email ] =
            form.password;
        fs.writeFile(
            process.cwd() + '/store/users.json',
            JSON.stringify( users ),
            function(){} );

        // (!)
        // temporary storage of registrations
        var id = Math.random().toString( 16 ).substr( 2 );
        fs.writeFile(
            process.cwd() + '/store/person-'+ id,
            JSON.stringify( form ),
            function(){});
        // (!)
    }
};