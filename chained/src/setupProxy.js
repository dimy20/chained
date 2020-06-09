const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
	app.use(
		"/api",
		createProxyMiddleware({
			target: `https://pixabay.com/api/?key=16381049-c197cfa5caeabac8c93d8da2c&q=${""}&image_type=photo&per_page=${2}&page=${1}`,
			changeOrigin: true,
		})
	);
};
