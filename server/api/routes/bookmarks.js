const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
const middleware = require("../middlewares/middlewares");
const { ObjectId, ObjectID } = require("mongodb");

// ADDS A CERTAIN QUOTEID TO USER BOOKMARKS ARRAY
router.post("/add", middleware.CheckTokenSetUser, (req, res) => {
	const LoggedUserid = req.user._id;
	const quoteId = req.body.quoteId;
	const quotes = db.get("quotes"); // calls the quotes collection to find the quoteid
	const users = db.get("users"); // calls users collection to find and add quotoid to its bookmarks array
	const bookmarks = db.get("bookmarks");
	quotes
		.findOne({
			_id: ObjectID(quoteId),
		})
		.then((quoteDoc) => {
			//Found the quote!!
			if (quoteDoc) {
				//query for the user logged in to add this quote
				users
					.findOne({
						_id: LoggedUserid,
					})
					.then((userDoc) => {
						if (userDoc) {
							const newBookmark = {
								quoteId: ObjectID(quoteId),
								quote: {
									tittle: quoteDoc.title,
									author: quoteDoc.author,
									quote: quoteDoc.quote,
									likes: quoteDoc.likes,
									views: quoteDoc.views,
									date: quoteDoc.date,
									user: quoteDoc.user,
									likedBy: quoteDoc.likedBy,
								},
								user: ObjectID(userDoc._id),
							};
							bookmarks
								.insert(newBookmark)
								.then((doc) => {
									res.json({
										newBookmark: doc,
									});
								})
								.catch((err) => {
									console.log(err);
								});
						} else {
							//user is null
							res.json({
								message: "you are not logged in",
							});
						}
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
router.delete("/remove", middleware.CheckTokenSetUser, (req, res) => {
	const LoggedUserId = req.user._id;
	const quoteId = req.body.quoteId;
	const bookmarks = db.get("bookmarks");
	bookmarks
		.remove({
			user: ObjectID(LoggedUserId),
			quoteId: ObjectID(quoteId),
		})
		.then((doc) => {
			res.json({
				message: doc,
			});
		})
		.catch((err) => {
			console.log(err);
		});
});
//CHECKS IF THE QUOTE ID IS STORED IN THE USER'S BOOKSMARKS ARRAY
router.post("/isQuoteInBookmarks", middleware.CheckTokenSetUser, (req, res) => {
	const LoggedUserId = req.user._id;
	const quoteId = req.body.quoteId;
	const bookmarks = db.get("bookmarks");
	bookmarks
		.findOne({
			user: ObjectID(LoggedUserId),
			quoteId: ObjectID(quoteId),
		})
		.then((bookmDoc) => {
			if (bookmDoc) {
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
			cosole.log(err);
		});
});
//Array : RETURNS ALL THE QUOTES IN BOOKMARKS STORED FOR THE USER LOGGED IN
router.get("/profile", middleware.CheckTokenSetUser, (req, res) => {
	const LoggedUserId = req.user._id;
	const bookmarks = db.get("bookmarks");
	const quotes = db.get("quotes");
	bookmarks
		.find({
			user: ObjectID(LoggedUserId),
		})
		.then((bookmarksDocs) => {
			res.json({
				bookmarks: bookmarksDocs,
			});
		})
		.catch((err) => {
			console.log(err);
		});
});
//Array : RETURNS ALL QUOTES STORED IN BOOKMARKDS FOR THIS ESPECIFIC USERId
router.get("/:userId", (req, res) => {
	const userId = req.params.userId;
	const bookmarks = db.get("bookmarks");
	bookmarks
		.find({
			user: ObjectID(userId),
		})
		.then((bookmarksDocs) => {
			if (bookmarksDocs) {
				res.json({
					bookmarks: bookmarksDocs,
				});
			} else {
				res.json({
					message: "no bookmarks found",
				});
			}
		})
		.catch((err) => {
			console.log(err);
		});
});

module.exports = router;
