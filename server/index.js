const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const BodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
//middlewares
const middlewares = require("./api/middlewares/middlewares");
// importing routes
const auth = require("./api/routes/auth");
const resetpwd = require("./api/routes/resetpwd");
const quote = require("./api/routes/quote");
const user = require("./api/routes/user");
const tags = require("./api/routes/tags");
const bookmarks = require("./api/routes/bookmarks");
//handles cors erros
app.use(cors());
// request logger
app.use(morgan("dev"));
app.use(
	BodyParser.urlencoded({
		extended: false,
	})
);
app.use(BodyParser.json());
app.use(middlewares.CheckTokenSetUser);
app.use("/auth", auth);
app.use("/password", resetpwd);
app.use("/quote", quote);
app.use("/user", user);
app.use("/tags", tags);
app.use("/bookmarks", bookmarks);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// if we reach this line, it means none of the previous routes was able to handle the request
// so we can set up a middleware with a not found error
app.use((req, res, next) => {
	const error = new Error("Not found");
	error.status = 404;
	next(error);
});
// this middleware handles errors thrown from anywhere in the app
app.use((error, req, res, next) => {
	const status = error.status;
	console.log(error.message);
	res.status(status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});
module.exports = app;
