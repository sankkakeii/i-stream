const express = require('express');
const router = express.Router();
const clientController = require('../controllers/admin.controller');

/* API ROUTES FOR ADMiNS TO REVIEW USERS AND VIDEOS */
router.get('/review-creators', clientController.getCreators);
router.put('/review-creators', clientController.reviewCreators);
router.get('/review-videos', clientController.getVideos);
router.put('/review-videos', clientController.reviewVideos);

// SUPER USER ENDPOINTS
router.get('/get-reviewers', clientController.getReviewers);
router.post('/add-reviewer', clientController.addReviewer);

module.exports = router;