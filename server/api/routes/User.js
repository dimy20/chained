const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/middlewares");
const db = require("../../db/connection");
const { route } = require("./quote");
const { ObjectID } = require("mongodb");
const isUserIdHex = require("../functions/isUserIdHex");
const multer = require("multer");
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "/uploads/");
	},
	filename: (req, file, cb) => {
		const filename = file.originalname;
		cb(null, filename);
	},
});
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
});
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
/*router.post(
	"/uploadProfileImage",
	middleware.CheckTokenSetUser,
	upload.single("ProfileImage"),
	(req, res) => {
		const users = db.get("users");

		const ProfileImages = db.get("ProfileImages");
		const loggedUserId = req.user._id;
		console.log(loggedUserId);
		users
			.findOne({
				_id: loggedUserId,
			})
			.then((doc) => {
				const newImag = {
					Profileimage: req.file.path,
					user: ObjectID(loggedUserId),
				};
				ProfileImages.insert(newImag)
					.then((insertedDoc) => {
						console.log(insertedDoc);
						res.json({
							message: insertedDoc,
						});
					})
					.catch((err) => {
						console.log(err);
					});
			});
		console.log(req.file);
	}
);
router.get("/ProfileImage", middleware.CheckTokenSetUser, (req, res) => {
	const LoggedUserId = req.user._id;
	const ProfileImages = db.get("ProfileImages");
	console.log(LoggedUserId);
	ProfileImages.findOne({
		user: ObjectID(LoggedUserId),
	})
		.then((doc) => {
			console.log(doc);
			res.json({
				path: doc.Profileimage,
			});
		})
		.catch((err) => {
			console.log(err);
		});
});
*/

// ADDS A CERTAIN QUOTEID TO USER BOOKMARKS ARRAY
router.patch("/addToBookmarks", middleware.CheckTokenSetUser, (req, res) => {
	const LoggedUserid = req.user._id;
	const quoteId = req.body.quoteId;
	const quotes = db.get("quotes"); // calls the quotes collection to find the quoteid
	const users = db.get("users"); // calls users collection to find and add quotoid to its bookmarks array
	quotes
		.findOne({
			_id: ObjectID(quoteId),
		})
		.then((quoteDoc) => {
			//Found the quote!!
			if (quoteDoc) {
				//query for the user logged in to add this quote
				users
					.findOneAndUpdate(
						{
							_id: ObjectID(LoggedUserid),
						},
						{
							$push: { bookmarks: quoteId },
						}
					)
					.then((updatedUser) => {
						res.json({
							message: updatedUser,
						});
					})
					.catch((err) => {
						console.log(err);
					});
			} else {
				//quote is null
				res.json({
					message: `no quote with id : ${quoteId}`,
				});
			}
		})
		.catch((err) => {
			console.log(err);
		});
});
//REMOVES CERTAIN QUOTE ID FROM THE USER'S BOOKMARK ARRAY <- OPOSITE TO THE ROUTE ABOVE
router.patch(
	"/removeFromBookmarks",
	middleware.CheckTokenSetUser,
	(req, res) => {
		const quoteId = req.body.quoteId;
		const LoggedUserId = req.user._id;
		const users = db.get("users"); // calls the quotes collection to find the quoteid
		const quotes = db.get("quotes"); // calls users collection to find and add quotoid to its bookmarks array
		quotes
			.find({
				_id: ObjectID(quoteId),
			})
			.then((quoteDoc) => {
				//Found the quote
				if (quoteDoc) {
					users
						.findOneAndUpdate(
							{
								_id: ObjectID(LoggedUserId),
							},
							{
								$pull: { bookmarks: quoteId },
							}
						)
						.then((updatedUser) => {
							res.json({
								message: updatedUser,
							});
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					res.json({
						message: `no quote with id : ${quoteId}`,
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}
);
//CHECKS IF THE QUOTE ID IS STORED IN THE USER'S BOOKSMARKS ARRAY
router.post("/isQuoteInBookmarks", middleware.CheckTokenSetUser, (req, res) => {
	const LoggedUserId = req.user._id;
	const quoteId = req.body.quoteId;
	const users = db.get("users");
	users
		.findOne({
			_id: LoggedUserId,
		})
		.then((userDoc) => {
			const obj = userDoc.bookmarks.find((q) => {
				return q == quoteId;
			});
			// the quote is in bookmarks
			if (obj) {
				res.json({
					isQuoteInBookmarks: true,
				});
			} else {
				res.json({
					isQuoteInBookmarks: false,
				});
			}
		})
		.catch((err) => {
			console.log(err);
		});
});
//Array : RETURNS ALL QUOTES STORED IN THE BOOKMARKS ARRAY OF THE USER LOGGED IN
router.get("/profile/bookmarks", middleware.CheckTokenSetUser, (req, res) => {
	const LoggedUserId = req.user._id;
	const users = db.get("users");
	users
		.findOne({
			_id: LoggedUserId,
		})
		.then((doc) => {
			if (doc) {
				res.json({
					bookmarks: doc.bookmarks,
				});
			} else {
				res.json({
					message: "you are not logged in",
				});
			}
		})
		.catch((err) => {
			console.log(err);
		});
});
//Array : RETURNS ALL QUOTES STORED IN THE BOOKMARKS ARRAY OF USER ID
router.get("/bookmarks/:userId", (req, res) => {
	const userId = req.params.userId;
	const users = db.get("users");
	users
		.findOne({
			_id: ObjectID(userId),
		})
		.then((userDoc) => {
			if (userDoc) {
				res.json({
					bookmarks: userDoc.bookmarks,
				});
			} else {
				res.json({
					message: "user doesnt exist",
				});
			}
		})
		.catch((err) => {
			console.log(err);
		});
});

module.exports = router;
