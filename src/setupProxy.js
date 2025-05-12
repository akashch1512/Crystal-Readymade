const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // This is the path that will be proxied
    createProxyMiddleware({
      target: 'http://localhost:5000', // Backend URL
      changeOrigin: true,
    })
  );
};