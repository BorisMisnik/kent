/*!
 * Module: Module
 *
 * @author Andjey Guzhovskiy, <me.the.ascii@gmail.com>
 * @copyright (c) 2013 Andjey Guzhovskiy
 * @licence CLOSED
 * @version 0.0.1
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
