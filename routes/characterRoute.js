const router = require('express').Router();

const characterController = require('../controller/characterController');

router
    .route('/character')
        .post(characterController.newCharacter);

router
    .route('/character/:id')
        .get(characterController.getCharacters);



module.exports = router;