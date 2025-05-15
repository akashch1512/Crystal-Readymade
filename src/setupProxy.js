const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://crystal-readymade-production.up.railway.app:5000', // Add port
      changeOrigin: true,
      secure: false, // Try adding this if you have SSL issues
    })
  );
};