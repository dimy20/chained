const express = require("express");
const router = express.Router();
const joi = require("joi");
const db = require("../../db/connection");
const middleware = require("../middlewares/middlewares");
const monk = require("monk");
const { ObjectID } = require("mongodb");

const quoteSchema = joi.object({
	tittle: joi.string().max(20).min(1).required(),
	quote: joi.string().max(150).min(10).required(),
	author: joi.string().alphanum().max(20).min(1).required(),
});

// GET request for especific quote with id
router.get("/id/:quoteId", (req, res) => {
	const quotes = db.get("quotes");
	const quoteId = req.params.quoteId;
	quotes
		.findOne({
			_id: quoteId,
		})
		.then((doc) => {
			console.log(doc);
			res.json({
				quote: doc,
			});
		})
		.catch((err) => {
			console.log(err);
		});
});

// needs auth to POST in this route
router.post("/createQuote", middleware.CheckTokenSetUser, (req, res) => {
	const { error, value } = quoteSchema.validate(req.body);
	if (!error) {
		//	no errors in validation
		console.log("All good");
		const users = db.get("users"); // instance of users collection
		const quotes = db.get("quotes"); // instace of quotes collection
		quotes.createIndex("quote", { unique: true });
		users
			.findOne({
				_id: req.user._id,
			})
			.then((user) => {
				//If user with _id exists in db, (wich is almost 100% likely beacause he sould be authenticated to hit this rout)
				if (user) {
					const newQuote = {
						title: value.tittle,
						author: value.author,
						quote: value.quote,
						likes: 0,
						views: 0,
						date: new Date(),
						user: user._id,
						likedBy: [],
					};
					quotes
						.insert(newQuote)
						.then((quoteCreated) => {
							console.log("Quote added to db");
							res.json({
								message: `${user.username} just added a quote : ${quoteCreated.tittle}`,
							});
							// +1 to user quotes
							users
								.findOneAndUpdate(
									{
										_id: user._id,
									},
									{ $inc: { quotes: 1 } }
								)
								.then((updateDocs) => {
									console.log("+1");
								});
						})
						.catch((err) => {
							console.log(err);
						});
				}
			})
			.catch((err) => {
				console.log("Database error : ", err);
			});
	} else {
		// sends Validation error
		res.json({
			message: error.details[0].message,
		});
	}
});

//Increases likes by 1 to quoteId
router.patch("/incLikes", middleware.CheckTokenSetUser, (req, res) => {
	const loggedUserId = req.user._id;
	const quoteId = req.body.quoteId;
	const quotes = db.get("quotes");
	quotes
		.findOneAndUpdate(
			{
				_id: quoteId,
			},
			{
				$inc: { likes: 1 },
				$push: { likedBy: ObjectID(loggedUserId) }, // increases the value of likes by 1
			}
		)
		.then((updateDocs) => {
			console.log(updateDocs);
			res.json({
				message: `liked : ${updateDocs.likedBy.length} `,
			});
		})
		.catch((err) => {
			console.log(err);
		});
});
router.patch("/removeLike", middleware.CheckTokenSetUser, (req, res) => {
	const loggedUserId = req.user._id;
	const quoteId = req.body.quoteId;
	const quotes = db.get("quotes");
	quotes
		.findOneAndUpdate(
			{
				_id: quoteId,
			},
			{
				$inc: { likes: -1 }, // increases the value of likes by 1
				$pull: { likedBy: ObjectID(loggedUserId) },
			}
		)
		.then((updateDocs) => {
			console.log(updateDocs);
			res.json({
				message: `liked : ${updateDocs.likes} `,
			});
		})
		.catch((err) => {
			console.log(err);
		});
});
router.post(
	"/isLikedByLoggedUser",
	middleware.CheckTokenSetUser,
	(req, res) => {
		const loggedUserId = req.user._id;
		const quoteId = req.body.quoteId;
		const quotes = db.get("quotes");
		quotes
			.findOne({
				_id: quoteId,
			})
			.then((doc) => {
				const obj = doc.likedBy.find((x) => {
					return x == loggedUserId;
				});
				if (obj) {
					res.json({
						isLikedByLoggedUser: true,
						likesQty: doc.likedBy.length,
					});
				} else {
					res.json({
						isLikedByLoggedUser: false,
						likesQty: doc.likedBy.length,
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}
);

//Increases views by 1 to quoteId
router.patch("/incViews", (req, res) => {
	const quoteId = req.body.quoteId; // quoteId must come in the body request
	const quotes = db.get("quotes"); // gets quotes collection instace

	quotes
		.findOneAndUpdate(
			{
				_id: quoteId,
			},
			{ $inc: { views: 1 } } // increases the value of views by 1
		)
		.then((updateDocs) => {
			res.json({
				message: ` views : ${updateDocs.views}`,
			});
		})
		.catch((err) => {
			console.log(err);
		});
});
//If auth,  deletes quoteID from db
router.delete("/delete", middleware.CheckTokenSetUser, (req, res) => {
	const quoteId = req.body.quoteId;
	const quotes = db.get("quotes");
	quotes
		.findOneAndDelete({
			_id: quoteId,
		})
		.then((deletedDoc) => [
			res.json({
				message: `${deletedDoc.quote} by ${deletedDoc.author} has been removed`,
			}),
		])
		.catch((err) => {
			console.log(err);
		});
});

module.exports = router;
