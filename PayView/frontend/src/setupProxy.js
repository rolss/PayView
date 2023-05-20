const { createProxyMiddleware } = require('http-proxy-middleware');
const { createError } = require('http-errors');


// setupProxy locates the environment on localhost:4000, so we can omit that for every frontend fetch
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
      onError: (err, req, res, next) => {
        if (err.code === 'ECONNREFUSED') {
          // Handle the backend offline error
          res.status(503).send('Service Unavailable');
        } else {
          // Handle other proxy errors
          res.status(500).send('Internal Server Error');
        }
      }
    })
  );
};