const isUserIdHex = (id) => {
	const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
	return checkForHexRegExp.test(userId);
};

module.exports = isUserIdHex;
