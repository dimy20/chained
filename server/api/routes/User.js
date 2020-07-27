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
router.get("/id/:userId", (req, res, next) => {
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
// Returs json data for all quotes relaed to the user Logged in
router.get("/quotes", middleware.CheckTokenSetUser, (req, res) => {
	const quotes = db.get("quotes");
	const userId = req.user._id;
	quotes
		.find({
			user: ObjectID(userId),
		})
		.then((docs) => {
			res.json({
				quotes: docs,
			});
			console.log(docs);
		})
		.catch((err) => {
			console.log(err);
		});
});
//Returns json for quotes related to the userId
router.get("/quotes/:userId", (req, res) => {
	const userId = req.params.userId;
	const quotes = db.get("quotes");
	quotes
		.find({
			user: ObjectID(userId),
		})
		.then((docs) => {
			res.json({
				quotes: docs,
			});
			console.log(docs);
		})
		.catch((err) => {
			console.log(err);
		});
});
router.post("/follow", middleware.CheckTokenSetUser, (req, res) => {
	const loggedUserId = req.user._id;
	const userToFollowId = req.body.userToFollowId;
	console.log("HELLO", userToFollowId);
	const users = db.get("users");
	users
		.findOneAndUpdate(
			{
				_id: loggedUserId,
			},
			{
				$push: { following: ObjectID(userToFollowId) },
			}
		)
		.then((updatedDoc) => {
			users
				.findOneAndUpdate(
					{
						_id: userToFollowId,
					},
					{
						$push: { followers: ObjectID(loggedUserId) },
					}
				)
				.then((doc) => {
					res.json({
						message: `You just followed ${userToFollowId}`,
					});
					console.log(`You just followed ${userToFollowId}`);
				});
		});
});
router.post("/unFollow", middleware.CheckTokenSetUser, (req, res) => {
	const users = db.get("users");
	const LoggedUserId = req.user._id;
	const userToUnfollow = req.body.userToUnfollow;
	users
		.findOneAndUpdate(
			{
				_id: ObjectID(LoggedUserId),
			},
			{
				$pull: { following: ObjectID(userToUnfollow) },
			}
		)
		.then((updatedDoc) => {
			users
				.findOneAndUpdate(
					{
						_id: ObjectID(userToUnfollow),
					},
					{
						$pull: { followers: ObjectID(LoggedUserId) },
					}
				)
				.then((updatedDoc) => {
					res.json({
						message: `you no longer follow ${userToUnfollow}`,
					});
				});
		});
});

router.post(
	"/isFollowedByLoggedUser",
	middleware.CheckTokenSetUser,
	(req, res, next) => {
		const loggedUserId = req.user._id;
		const UserId = req.body.userId;
		console.log(UserId);
		const users = db.get("users");
		users
			.findOne({
				_id: ObjectID(UserId),
			})
			.then((doc) => {
				const obj = doc.followers.find((x) => {
					return x == loggedUserId;
				});
				if (obj) {
					res.json({
						isFollowedByLoggedUser: true,
					});
				} else {
					res.json({
						isFollowedByLoggedUser: false,
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}
);
module.exports = router;
