/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
var Dispatcher = require( 'dispatcher' ),
	analytics = require( 'analytics' ),
	actions = require( './constants' ).actions,
	me = require( 'lib/wp' ).undocumented().me();

var SecurityCheckupActions = {
	addEmail: function( email ) {
		Dispatcher.handleViewAction( {
			type: actions.ADD_ACCOUNT_RECOVERY_EMAIL,
			email: email
		} );

		me.addAccountRecoveryEmail( email, function( error, data ) {
			Dispatcher.handleServerAction( {
				type: actions.RECEIVE_ADDED_ACCOUNT_RECOVERY_EMAIL,
				email: email,
				data: data,
				error: error
			} );

			recordEvent( 'calypso_security_checkup_email_added', error );
		} );
	},

	deleteEmail: function( email ) {
		Dispatcher.handleViewAction( {
			type: actions.DELETE_ACCOUNT_RECOVERY_EMAIL,
			email: email
		} );

		me.deleteAccountRecoveryEmail( email, function( error, data ) {
			Dispatcher.handleServerAction( {
				type: actions.RECEIVE_DELETED_ACCOUNT_RECOVERY_EMAIL,
				email: email,
				data: data,
				error: error
			} );

			recordEvent( 'calypso_security_checkup_email_deleted', error );
		} );
	},

	addPhone: function( country, number ) {
		Dispatcher.handleViewAction( {
			type: actions.UPDATE_ACCOUNT_RECOVERY_PHONE,
			country: country,
			number: number
		} );

		me.addAccountRecoveryPhone( country, number, function( error, data ) {
			Dispatcher.handleServerAction( {
				type: actions.RECEIVE_UPDATED_ACCOUNT_RECOVERY_PHONE,
				country: country,
				number: number,
				data: data,
				error: error
			} );

			recordEvent( 'calypso_security_checkup_sms_added', error );
		} );
	},

	verifyPhone: function( code ) {
		Dispatcher.handleViewAction( {
			type: actions.UPDATE_ACCOUNT_RECOVERY_PHONE,
			code: code
		} );

		me.updateAccountRecoveryPhone( code, function( error, data ) {
			Dispatcher.handleServerAction( {
				type: actions.RECEIVE_UPDATED_ACCOUNT_RECOVERY_PHONE,
				code: code,
				data: data,
				error: error
			} );

			recordEvent( 'calypso_security_checkup_sms_verified', error );
		} );
	},

	deletePhone: function() {
		Dispatcher.handleViewAction( {
			type: actions.DELETE_ACCOUNT_RECOVERY_PHONE
		} );

		me.deleteAccountRecoveryPhone( function( error, data ) {
			Dispatcher.handleServerAction( {
				type: actions.RECEIVE_DELETED_ACCOUNT_RECOVERY_PHONE,
				data: data,
				error: error
			} );

			recordEvent( 'calypso_security_checkup_sms_deleted', error );
		} );
	},

	dismissEmailsNotice: function() {
		Dispatcher.handleViewAction( {
			type: actions.DISMISS_ACCOUNT_RECOVERY_EMAILS_NOTICE
		} );
	},

	dismissPhoneNotice: function() {
		Dispatcher.handleViewAction( {
			type: actions.DISMISS_ACCOUNT_RECOVERY_PHONE_NOTICE
		} );
	}
};

function recordEvent( event, error ) {
	if ( error ) {
		analytics.tracks.recordEvent( event + '_error', {
			error
		} );
	} else {
		analytics.tracks.recordEvent( event );
	}
}

module.exports = SecurityCheckupActions;
