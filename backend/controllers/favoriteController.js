const User = require('../models/User');

// GET /favorites
exports.getFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json({ favorites: user.favorites || [] });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// POST /favorites
exports.addFavorite = async (req, res) => {
    const { country } = req.body;
    if (!country) return res.status(400).json({ message: 'Country is required' });

    try {
        const user = await User.findById(req.user._id);
        if (!user.favorites.includes(country)) {
            user.favorites.push(country);
            await user.save();
        }
        res.status(200).json({ favorites: user.favorites });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// DELETE /favorites/:country
exports.removeFavorite = async (req, res) => {
    const { country } = req.params;
    try {
        const user = await User.findById(req.user._id);
        user.favorites = user.favorites.filter((fav) => fav !== country);
        await user.save();
        res.status(200).json({ favorites: user.favorites });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
