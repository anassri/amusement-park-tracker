const express = require('express');
const morgan = require('morgan');

const routes = require('./routes');

const app = express();

app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(routes);


module.exports = app;
app.use((req, res, next) => {
    const err = new Error("The requested page couldn't be found.");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ) {
        // log err to database
        // don't worry about this for now
    } else {
        console.error(err);
    }
    next(err);
});

module.exports = app;
