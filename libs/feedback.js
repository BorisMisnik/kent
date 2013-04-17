/*!
 * Module: Module
 *
 * @author Andjey Guzhovskiy, <me.the.ascii@gmail.com>
 * @copyright (c) 2013 Andjey Guzhovskiy
 * @licence CLOSED
 * @version 0.0.1
 */

var pipe = require( './pipe' );

exports.feedback = function( req, res ) {
    console.log( 'Feedback form:', req.body );
    pipe( req, res, '/feedback', { form: req.body });
};