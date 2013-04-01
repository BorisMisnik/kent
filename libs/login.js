/*!
 * Module: Module
 *
 * @author Andjey Guzhovskiy, <me.the.ascii@gmail.com>
 * @copyright (c) 2013 Andjey Guzhovskiy
 * @licence CLOSED
 * @version 0.0.1
 */

exports.index = function( req, res ) {
    res.json({
        authorized: false
    });
};

exports.login = function( req, res ) {
    res.json({
        authorized: true,
        session: 'session_id',
        user: 'user_id',
        role: 'user',       // visitor, user, admin
        datetime: + new Date()
    });
};
