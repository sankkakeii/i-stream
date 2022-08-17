const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');

/* API ROUTES FOR USERS WHO WANT TO UPLOAD VIDEOS */
router.post('/sign-up', clientController.signUp);
router.post('/login', clientController.login);
router.get('/dashboard', clientController.dashboard);
// router.put('/add-user', clientController.addUser);
router.get('/view-users', clientController.viewUsers);
router.get('/analytics', clientController.viewAnalytics);
router.post('/settings', clientController.settings);

module.exports = router;