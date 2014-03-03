/*!
 * Module: Module
 *
 * @author Andjey Guzhovskiy, <me.the.ascii@gmail.com>
 * @copyright (c) 2013 Andjey Guzhovskiy
 * @licence CLOSED
 * @version 0.0.1
 */

var config = require( '../config.json' ),
	pipe = require( './../libs/pipe' ),
	request = require( 'request');

exports.login =
	function( req, res, next ) {
		var username = req.body.username;
		// check is promo-login used	
		if( username !== 'sms' && username !== 'email' && username !== 'ahead' )
			return next();

		isPromoLogin( req, res, function(result){
			// use promo login
			if( !result )
				return next();
				
			res.send({ success: { promo: true }});
		});
	};

exports.logout =
	function( req, res ) {
		console.log( 'Logout:', req.session );
		pipe.request( 'GET', '/logout',
			{ cookie: req.headers.cookie },
			function ( error, response, body) {
				res.redirect( '/' );
			});
	};

exports.signupPromo =
	function( req, res ) {
		console.log( 'Promo signup'.cyan.bold, req.body );
		// check is promo-login used
		var username = req.body.promo_login;
		// return error if not
		// because of signupPromo uses only for promo-logins
		if(( username !== 'sms' && username !== 'email' && username !== 'ahead' ) ){
			delete req.body.promo_login;
			delete req.body.promo_password;
			return;
		} 
		isPromoLogin(req, res, function(result){
			console.log('Promo Singup');
			if( !result ){
				delete req.body.promo_login;
				delete req.body.promo_password;
				return;
			};

			// make simple promo signup ( without photo upload needs )
			// prepare form data

			var form = req.body;
			// secret used to prevent direct call of promo-signup from unregistered user
			form.secret = config.promo_secret;
			pipe.request( 'POST', '/account/signup/promo',
				{
					form: form,
					cookie: req.header.cookie
				},
				function ( error, response, body ) {
					console.log( 'res', error, body );
					var result;
					try { result = JSON.parse( body ); }
					catch( e ) {}
					res.send( result );
				});

			});
		
	};

// Helpers

function isPromoLogin( req, res, callback ) {
	// promo resgestartion
	var form = req.body;
	pipe.request('GET', '/auth/promo' , {
		form : form
	}, function(err, res, result){
		try{
			var body = JSON.parse(result);
			if( body.error ){
				callback(false);
			} 
			else if( body.success.promo && body.user ) {
				req.body.promoUser = body.user;
				callback(true);
			}
		} catch ( e ) {
			callback(false);
		}
		
	});

}