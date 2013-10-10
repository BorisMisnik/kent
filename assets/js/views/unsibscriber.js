define(
	[
		'views/forms/init'
	],
	function( form ) {
		Backbone.log( 'app.unsibscriber' );

		var Unsibscriber = Backbone.Layout.extend(
		{
			template: 'unsibscriber',
			model: null,
			events: {
				'click .submit': 'submit'
			},

			initialize: function() {
				this.model = new Backbone.Model();
			},

			serialize: function( ) {
				this.log( 'feedback data:', this.model.toJSON() );
				return this.model.toJSON();
			},
			afterRender: function() {
				// custom form fields
				form.init();
				$('.error').hide();
				// init scroll and text

			},

			submit: function( e ) {
				e.preventDefault();

				// values
				var self = this,
					form = {
						email: this.$( '#email' ).val(),
					};

				self.model
					.clear({ silent: true })
					.set( form );
				  // values
					var self = this,
						email = self.$( '#email' ).val();
					this.model
						.clear({ silent: true })
						.set( 'email', email );

					self.log( 'unsibscriber email', email );

				if ( !email.length ) return $('.error').show();

				$('.error').hide();
				$.post(
					'/unsibscriber', form )
					.done( function( res ) {
						if( res )
							$('.submit').val('Ваше повідомлення надіслано')
										.attr('disabled', true);
					})
					.fail( function( def, type, status ) {
						self.log( 'unsibscriber. ajax error:', status );
					});
			}
		}),
		unsibscriber = new Unsibscriber();
		return unsibscriber;
	});