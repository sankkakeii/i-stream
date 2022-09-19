const express = require('express');
const router = express.Router();
const clientController = require('../controllers/video.controller');

/* API ROUTES FOR USERS WHO WANT TO UPLOAD VIDEOS */
router.post('/add-video', clientController.addVideo);
router.get('/videos', clientController.getVideos);
router.post('/videos', clientController.getVideos);

module.exports = router;