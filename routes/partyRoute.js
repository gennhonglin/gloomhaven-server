const router = require('express').Router();
//controller

const partyController = require('../controller/partyController');


router
    .route('/party')
        .post(partyController.newParty);

router
    .route('/party/:id')
        .get(partyController.getParty);

router
    .route('/party/login')
        .post(partyController.loginParty);

router
    .route('/party/prosperity/:id')
        .get(partyController.displayProsperity)
        .post(partyController.updateProsperity);

router
    .route('/party/reputation/:id')
        .get(partyController.displayReputation)
        .post(partyController.updateReputation);



module.exports = router;

