const jwt = require("jsonwebtoken");
const CheckTokenSetUser = (req, res, next) => {
	const AuthorizationHeader = req.get("Authorization");
	/*IF the Authorization Header exists in the request!
       Authorization may not be in the request if the request
       is sent when the user is not looged in, for example : in the login form */
	if (AuthorizationHeader) {
		const token = AuthorizationHeader.split(" ")[1]; // Removes Bearer from string
		jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
			if (error) {
				console.log(error);
			}
			req.user = user;
			next();
		});
	} else {
		next();
	}
};

module.exports = {
	CheckTokenSetUser,
};
