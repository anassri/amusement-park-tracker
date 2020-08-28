const express = require('express');
const { environment } = require('./config/index.js')
const db = require('./db/models')
const router = express.Router();

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

router.get('/parks', asyncHandler( async (req, res) => {
    const parks = await db.Park.findAll({
        order: [['parkName', 'ASC' ]]
    })
    res.render('park-list', { title: 'Parks', parks })
}));

if (environment !== "production") {
    router.get("/error-test", () => {
        throw new Error("This is a test error.");
    });
}



module.exports = router;
