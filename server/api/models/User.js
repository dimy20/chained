const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: mongoose.Schema.Types.String,
	lastname: mongoose.Schema.Types.String,
	email: mongoose.Schema.Types.String,
	password: mongoose.Schema.Types.String,
});
module.exports = mongoose.model("UserModel", UserSchema);
