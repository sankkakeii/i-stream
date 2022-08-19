const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');

/* API ROUTES FOR USERS WHO WANT TO UPLOAD VIDEOS */
router.post('/sign-up', clientController.signUp);
router.post('/login', clientController.login);

module.exports = router;