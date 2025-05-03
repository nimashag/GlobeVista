const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
    getFavorites,
    addFavorite,
    removeFavorite
} = require('../controllers/favoriteController');

// All routes below are protected
router.use(protect);

router.get('/', getFavorites);
router.post('/', addFavorite);
router.delete('/:country', removeFavorite);

module.exports = router;
