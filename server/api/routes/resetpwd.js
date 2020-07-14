const express = require("express");
const router = express.Router();
const joi = require("joi");
const db = require("../../db/connection"); // Bringin in db
const { json } = require("body-parser");
const users = db.get("users"); //get the users collection from auth-testing db

const schema = joi.object({
	email: joi.string().email({
		minDomainSegments: 2,
		tlds: { allow: ["com", "net", "org"] },
	}),
});
//422 Unprocessable Entity - No user withs given email
const ResponseError422 = () => {
	const error = new Error("We could not find this email!");
	error.status = 422;
	return error;
};
router.post("/reset", (req, res, next) => {
	users
		.findOne({
			email: req.body.email,
		})
		.then((user) => {
			//User exists in the db
			//Sends email to req.body.email
			if (user) {
				res.status(200);
				res.json({
					message: `An email with reset details has been sent to ${req.body.email}`,
				});
			} else {
				next(ResponseError422());
			}
		})
		//db error!!
		.catch((err) => {
			res.json({
				error: err,
			});
		});
});

module.exports = router;
