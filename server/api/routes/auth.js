const express = require("express");
const router = express.Router();
const joi = require("joi");
const bcrypt = require("bcrypt");
const db = require("../../db/connection");
const jwt = require("jsonwebtoken");

require("dotenv").config();
//Validation schema
const schema = joi.object({
	username: joi.string().alphanum().min(5).max(30).required(),
	email: joi.string().email({
		minDomainSegments: 2,
		tlds: { allow: ["com", "net"] },
	}),
	password: joi.string().min(8).required(), // MAKE THIS STRONGER LATER
	repeat_password: joi.ref("password"),
});
const LoginSchema = joi.object({
	username: joi.string().alphanum().min(5).max(30).required(),
	password: joi.string().min(8).required(), // MAKE THIS STRONGER LATER
});
const ResponseError422 = () => {
	//422 Unprocessable Entity
	const error = new Error("Username or password wrong.");
	error.status = 422;
	return error;
};
const ResponseError409 = () => {
	//409 Conflict
	const error = new Error("User already exists");
	error.status = 409;
	return error;
};
//get the users collection from auth-testing db
const users = db.get("users");
users.createIndex("username", { unique: true });
//route for signing up
router.post("/signup", (req, res, next) => {
	const { error, value } = schema.validate(req.body);
	//console.log(value);
	if (!error) {
		//valid
		users
			.findOne({ username: req.body.username })
			.then((user) => {
				if (user) {
					//User already exists!!
					next(ResponseError409());
				} else {
					//user doesnt exist so we hash the pwd and store the user in the db
					bcrypt
						.hash(req.body.password, 12)
						.then((hashedPassword) => {
							const newUser = {
								username: req.body.username,
								email: req.body.email,
								password: hashedPassword,
								quotes: 0,
								followers: [],
								following: [],
								notifications: 0,
								inspires: 0,
							};
							users
								.insert(newUser)
								.then((userCreated) => {
									console.log(userCreated);
									res.json({
										message: `${req.body.username} has been added to the server`,
									});
								})
								.catch((err) => {
									console.log(err);
								});
						})
						.catch((err) => {
							console.log(err);
						});
				}
			})
			.catch((err) => {
				// if some error happens searching the user on the db
				console.log(err);
			});
	} else {
		if (error.details[0].type === "any.allowOnly") {
			res.json({
				message: "Passwords dont match",
			});
		}
	}
});
//route handles login
router.post("/login", (req, res, next) => {
	// use same validation schema here
	const { error, value } = LoginSchema.validate(req.body);
	if (!error) {
		users.findOne({ username: req.body.username }).then((user) => {
			if (user) {
				//Found the user in db
				bcrypt.compare(req.body.password, user.password).then((result) => {
					if (result) {
						//password matched!!
						//payload for token
						const payload = {
							_id: user._id,
							username: user.username,
						};
						// creating token
						jwt.sign(
							payload,
							process.env.TOKEN_SECRET,
							{ expiresIn: "1d" },
							(err, token) => {
								if (err) {
									next(ResponseError422());
								} else {
									//Send token to front-end
									res.json({ token });
								}
							}
						);
					} else {
						//password did not match
						next(ResponseError422());
					}
				});
			} else {
				//user is not on db//
				// Maybe suggets signup
				const error = ResponseError422();
				error.message = "User does not exist";
				next(error);
			}
		});
	} else {
		//Validation schema failed
		next(ResponseError422());
	}
});
module.exports = router;
