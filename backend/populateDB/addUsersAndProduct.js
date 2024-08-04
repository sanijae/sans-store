const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Product = require('../models/Product');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sans-store');
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const addUsersAndProducts = async () => {
  await connectDB();

  const users = [
    { username: 'user1', email: 'user1@example.com', password: 'password1' },
    { username: 'user2', email: 'user2@example.com', password: 'password2' },
    { username: 'user3', email: 'user3@example.com', password: 'password3' },
    { username: 'user4', email: 'user4@example.com', password: 'password4' },
    { username: 'user5', email: 'user5@example.com', password: 'password5' },
    { username: 'user6', email: 'user6@example.com', password: 'password6' },
    { username: 'user7', email: 'user7@example.com', password: 'password7' },
    { username: 'user8', email: 'user8@example.com', password: 'password8' },
    { username: 'user9', email: 'user9@example.com', password: 'password9' },
    { username: 'user10', email: 'user10@example.com', password: 'password10' },
    { username: 'user11', email: 'user11@example.com', password: 'password11' },
    { username: 'user12', email: 'user12@example.com', password: 'password12' },
    { username: 'user13', email: 'user13@example.com', password: 'password13' },
    { username: 'user14', email: 'user14@example.com', password: 'password14' },
    { username: 'user15', email: 'user15@example.com', password: 'password15' },
    { username: 'user16', email: 'user16@example.com', password: 'password16' },
    { username: 'user17', email: 'user17@example.com', password: 'password17' },
    { username: 'user18', email: 'user18@example.com', password: 'password18' },
    { username: 'user19', email: 'user19@example.com', password: 'password19' },
    { username: 'user20', email: 'user20@example.com', password: 'password20' },
    { username: 'user21', email: 'user21@example.com', password: 'password21' },
    { username: 'user22', email: 'user22@example.com', password: 'password22' },
    { username: 'user23', email: 'user23@example.com', password: 'password23' },
    { username: 'user24', email: 'user24@example.com', password: 'password24' },
    { username: 'user25', email: 'user25@example.com', password: 'password25' },
    { username: 'user26', email: 'user26@example.com', password: 'password26' },
    { username: 'user27', email: 'user27@example.com', password: 'password27' },
    { username: 'user28', email: 'user28@example.com', password: 'password28' },
    { username: 'user29', email: 'user29@example.com', password: 'password29' },
    { username: 'user30', email: 'user30@example.com', password: 'password30' }
  ];

  try {
    for (let user of users) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    const createdUsers = await User.insertMany(users);

    const products = [];
    for (let i = 1; i <= 100; i++) {
      products.push({
        name: `Product ${i}`,
        description: `Description for product ${i}`,
        price: Math.floor(Math.random() * 1000) + 1,
        imageURL: `https://example.com/product${i}.jpg`,
        createdBy: createdUsers[Math.floor(Math.random() * createdUsers.length)]._id
      });
    }

    await Product.insertMany(products);
    console.log('Users and products added successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error(err.message);
    mongoose.connection.close();
  }
};

addUsersAndProducts();
