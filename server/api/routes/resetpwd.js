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
router.get("/reset", (req, res) => {
	users
		.findOne({
			email: req.body.email,
		})
		.then((user) => {
			//User exists in the db
			//Sends email to req.body.email
			if (user) {
				res.json({
					message: `An email with reset details has been sent to ${req.body.email}`,
				});
			} else {
				res.json({
					message: "You are not registered!",
				});
			}
		})
		.catch((err) => {
			res.json({
				error: err,
			});
		});
});

module.exports = router;
