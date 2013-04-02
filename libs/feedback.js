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

exports.feedback = function( req, res ) {

    var errors = {},
        email = String( req.body.email || '' ),
        name = String( req.body.name || '' ),
        message = String( req.body.message || '' );

    // checks
    // name
    if ( !name
        || name.length >254 )
        errors.name = true;

    // email
    if ( !email
        || email.length > 254
        || !check.notEmpty( email )
        || !check.isEmail( email ))
        errors.email = true;

    // message
    if ( !message
        || message.length > 4069 )
        errors.message = true;

    console.log(
        'Feedback form:', {
            email: email,
            name: name,
            message: message
        });
    console.log( 'errors', errors );


    if ( Object.keys( errors ).length ) {
        errors.error = true;
        res.json( errors );
    }
    else {
        debugger;
        res.json({ success: true });

        // (!)
        // temporary storage of feedbacks
        var id = Math.random().toString( 16 ).substr( 2 );
        fs.writeFile(
            process.cwd() + '/store/feedback-'+ id,
            JSON.stringify({
                email: email,
                name: name,
                message: message
            }),
            function(){ console.log( 'fs:', arguments ); } );
        // (!)
    }

};