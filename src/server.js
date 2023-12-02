const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');

const routes = require('../route/routes');

const app = express();
const port = 8000;

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// ROUTES
app.use(routes);

// ERROR HANDLING
app.use((req, res, next) => {
  next(new createError.NotFound('Path URL Tidak Ditemukan'));
});


app.use((err, req, res, next) => {
  const {
    status = 500,
    message,
  } = err;

  const errorResponse = {
    error: {
      status,
      message,
      path: req.url,
      method: req.method,
    },
  };

  if (status === 500) {
    errorResponse.error.details = 'Internal Server Error';
  } else if (status === 404) {
    errorResponse.error.details = 'Resource Not Found';
  }

  res.status(status).json(errorResponse);
});

app.listen(port, () => {
  console.log(`Server berjalan pada http://localhost:${port}`);
});
