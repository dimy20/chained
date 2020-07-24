const jwt = require("jsonwebtoken");
const ResponseError403 = () => {
	const error = new Error("Auth failed");
	error.status = 403;
	return error;
};
const CheckTokenSetUser = (req, res, next) => {
	const AuthorizationHeader = req.get("Authorization");
	/*IF the Authorization Header exists in the request!
       Authorization may not be in the request if the request
       is sent when the user is not looged in, for example : in the login form */
	if (AuthorizationHeader) {
		const token = AuthorizationHeader.split(" ")[1]; // Removes Bearer from string
		jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
			if (error) {
				next(ResponseError403());
			}
			req.user = user;
			next(); // all good continue
		});
	} else {
		next(ResponseError403());
	}
};

module.exports = {
	CheckTokenSetUser,
};
