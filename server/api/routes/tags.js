const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
router.get("/", (req, res) => {
	res.json({
		message: "We are in the tags route!",
	});
});

module.exports = router;
