const { createProxyMiddleware } = require('http-proxy-middleware');
const { createError } = require('http-errors');

module.exports = function (app) {
  // Define an object to map endpoints to their corresponding microservices
  const services = {
    '/api/user': 'http://localhost:4000',
    '/api/query': 'http://localhost:4001',
    '/api/transaction': 'http://localhost:4002',
  };

  // Loop through the services object and create a proxy middleware for each endpoint
  Object.entries(services).forEach(([endpoint, target]) => {
    app.use(
      endpoint,
      createProxyMiddleware({
        target,
        changeOrigin: true,
        onError: (err, req, res, next) => {
          if (err.code === 'ECONNREFUSED') {
            res.status(503).send('Service Unavailable');
          } else {
            res.status(500).send('Internal Server Error');
          }
        },
      })
    );
  });
};
