const express = require('express');
const { environment } = require('./config/index.js');
const csrf = require('csurf');
const db = require('./db/models');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const csrfProtection = csrf({ cookie: true });
const parkValidators = [
    check("parkName")
        .exists({checkFalsy: true})
        .withMessage("Please Provide a Value for Park Name")
        .isLength({max: 255})
        .withMessage("Park Name Must Not Be More Than 255 Characters Long"),
    check("city")
        .exists({checkFalsy: true})
        .withMessage("Please Provide a Value for City")
        .isLength({max: 100})
        .withMessage("City Must Not Be More Than 100 Characters Long"),
    check("provinceState")
        .exists({checkFalsy: true})
        .withMessage("Please Provide a Value for Province/State")
        .isLength({max: 100})
        .withMessage("Province/State Must Not Be More Than 100 Characters Long"),
    check("country")
        .exists({checkFalsy: true})
        .withMessage("Please Provide a Value for Country")
        .isLength({max: 100})
        .withMessage("Country Must Not Be More Than 100 Characters Long"),
    check("opened")
        .exists({checkFalsy: true})
        .withMessage("Please Provide a Value for Opened")
        .isISO8601()
        .withMessage("Please Provide a Valid Date for Opened"),
    check("size")
        .exists({checkFalsy: true})
        .withMessage("Please Provide a Value for Size")
        .isLength({max: 100})
        .withMessage("Size Must Not Be More Than 100 Characters Long"),
    check("description")
        .exists({checkFalsy: true})
        .withMessage("Please Provide a Value for Description")
        
];
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

router.get('/parks', asyncHandler( async (req, res) => {
    const parks = await db.Park.findAll({
        order: [['parkName', 'ASC' ]]
    });
    res.render('park-list', { title: 'Parks', parks })
}));

router.get('/park/:id(\\d+)',asyncHandler(async(req,res)=>{
    const id = parseInt(req.params.id,10);
    const details = await db.Park.findByPk(id);
    res.render('park-detail',{
        title: 'Park Detail',
        details
    });
}));

router.get('/park/add', csrfProtection, (req,res)=>{
    const park = db.Park.build();
    res.render('park-add',{
        title: 'Add Park', 
        park,
        csrfToken: req.csrfToken()
    });
});

router.post('/park/add', csrfProtection, parkValidators, asyncHandler(async(req,res)=>{
    const { parkName, city, provinceState, country, opened, size, description } = req.body;
    const park = db.Park.build({ parkName, city, provinceState, country, opened, size, description });
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
        await park.save();
        res.redirect("/");
    } else {
        const errors = validatorErrors.array().map(error => error.msg);
        res.render('park-add',{
            title: 'Add Park', 
            park,
            errors,
            csrfToken: req.csrfToken()
        });
    };
    
}));

if (environment !== "production") {
    router.get("/error-test", () => {
        throw new Error("This is a test error.");
    });
};



module.exports = router;
