// Admin/controllers/adminAuthController.js

const AdminUser = require('../models/AdminUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login Admin
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await AdminUser.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { loginAdmin };
