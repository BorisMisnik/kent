/*!
 * Module: Module
 *
 * @author Andjey Guzhovskiy, <me.the.ascii@gmail.com>
 * @copyright (c) 2013 Andjey Guzhovskiy
 * @licence CLOSED
 * @version 0.0.1
 */


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
            username == '1' &&
            password == '2';

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