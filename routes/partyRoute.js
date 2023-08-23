const router = require('express').Router();
//controller

const partyController = require('../controller/partyController');


router
    .route('/party')
        .post(partyController.newParty);

router
    .route('/party/login')
        .post(partyController.loginParty);



module.exports = router;

