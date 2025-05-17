// seedAdmin.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const AdminUser = require('./Admin/models/AdminUser');

dotenv.config(); // Load your .env file

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const existing = await AdminUser.findOne({ email: 'onnes@gmail.com' });
    if (existing) {
      console.log('Admin already exists');
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('1@#$@@!#$', 10); //example for password

    const admin = new AdminUser({
      email: 'onnes123.com',
      password: hashedPassword,
    });

    await admin.save();
    console.log('✅ Admin user created');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding admin:', err);
    process.exit(1);
  }
};

seedAdmin();
