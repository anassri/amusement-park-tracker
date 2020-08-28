const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const { environment } = require('./config/index.js')
const app = express();

app.set('view engine', 'pug');

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(routes);


app.use((req, res, next) => {
    const err = new Error("The requested page couldn't be found.");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (environment === 'production' || environment === 'test' ) {
        // log err to database
        // don't worry about this for now
    } else {
        console.error(err);
    }
    next(err);
});

app.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status(404)
        res.render('page-not-found', { title: "Page Not Found" })
    } else {
        next(err)
    }
});

app.use((err, req, res, next) => {
    res.status( err.status || 500 );
    const isProduction = environment === "production";
    res.render("error", {
                         title: "Server Error",
                         message: isProduction? null: err.message,
                         stack: isProduction? null: err.stack });
});

module.exports = app;
