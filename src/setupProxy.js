const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // This is the path that will be proxied
    createProxyMiddleware({
      target: 'https://crystal-readymade-production.up.railway.app/', // Backend URL
      changeOrigin: true,
    })
  );
};