const config = require('config');
const request = require('request');

const se = {
	getToken: function(callback) {
		var now = Math.round(new Date().getTime()/1000)
		if (se.token) {
			var diff = se.token.death - now;
			if (now <= token.death) {
				console.log('[getToken]: Reusing cached token. Token death at: ' + token.death);
				callback(se.token);
				return true;
			}
		}

		var options = {
			url: config.get('token.url'),
			auth: {
				user: config.get('token.auth.user'),
				pass: config.get('token.auth.pass')
			},
			form: {
				grant_type: config.get('token.form.grant_type'),
				username: config.get('token.form.username'),
				password: config.get('token.form.password')
			}
		}

		request.post(options, function (err, response, body) {
			if (err || response.statusCode !== 200) {
				console.log('[getToken]: Error getting token');
				callback(body);
				return false;
			}
			console.log('[getToken]: Fetching fresh token.');
			delete se.token;
			token = JSON.parse(body);

			token.birth = now;
			token.death = token.birth + (token.expires_in-600);
			se.token=token;
			callback(token);
		});
	}
}

module.exports = se;
