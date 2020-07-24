const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/middlewares");
const db = require("../../db/connection");
const { route } = require("./quote");
const { ObjectID } = require("mongodb");
const isUserIdHex = require("../functions/isUserIdHex");
// Returns json conatarin data about the logged in user * PROTECTED
router.get("/profile", middleware.CheckTokenSetUser, (req, res, next) => {
	const loggedUser = req.user; // gets user from request thats been added by the CheckTokenSetUser middleware
	console.log(loggedUser);
	const users = db.get("users");
	users
		.findOne({
			_id: ObjectID(loggedUser._id),
		})
		.then((user) => {
			if (user) {
				delete user.password; // removes pwd from the user retrived, so it is not sent;
				res.json({
					data: {
						user,
					},
				});
			} else {
				const err = new Error("This user doesnt exist");
				err.status = 400; // bad request
				next(err);
			}
		})
		.catch((err) => {
			console.log(err);
		});
});
// Returns json data about the user with the userId if exists
router.get("/:userId", (req, res, next) => {
	const userId = req.params.userId;
	const users = db.get("users");
	users
		.findOne({
			_id: ObjectID(`${userId}`), // i dont know why but it needs to be pasrse to int
		})
		.then((user) => {
			if (user) {
				delete user.password; // removes pwd from the user retrived, so it is not sent;
				console.log(user);
				res.json({
					data: {
						user,
					},
				});
			} else {
				const err = new Error("User not found");
				err.status = 404; // bad request
				next(err);
			}
		})
		.catch((err) => {
			console.log(err);
		});
});
module.exports = router;
