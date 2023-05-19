const { createProxyMiddleware } = require('http-proxy-middleware');

// setupProxy locates the environment on localhost:4000, so we can omit that for every frontend fetch
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
};