import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Product from './models/Product.js';
import Cart from './models/Cart.js';
import Order from './models/Order.js';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const productsData = [
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    image: 'https://placehold.co/400x400?text=Airpods',
    description: 'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    price: 89.99,
    category: 'Electronics',
    stock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'iPhone 13 Pro 256GB Memory',
    image: 'https://placehold.co/400x400?text=iPhone+13+Pro',
    description: 'Introducing the iPhone 13 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    price: 999.99,
    category: 'Electronics',
    stock: 7,
    rating: 4.8,
    numReviews: 8,
  },
  {
    name: 'Sony Playstation 5',
    image: 'https://placehold.co/400x400?text=Playstation+5',
    description: 'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    price: 499.99,
    category: 'Electronics',
    stock: 11,
    rating: 4.9,
    numReviews: 14,
  },
  {
    name: 'Logitech G-Series Gaming Mouse',
    image: 'https://placehold.co/400x400?text=Gaming+Mouse',
    description: 'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    price: 49.99,
    category: 'Electronics',
    stock: 25,
    rating: 4.3,
    numReviews: 10,
  },
  {
    name: 'Men\'s Casual Cotton T-Shirt',
    image: 'https://placehold.co/400x400?text=Cotton+T-Shirt',
    description: 'Comfortable cotton t-shirt perfect for everyday wear. Available in multiple colors.',
    price: 19.99,
    category: 'Clothing',
    stock: 50,
    rating: 4.1,
    numReviews: 22,
  },
  {
    name: 'Women\'s Running Shoes',
    image: 'https://placehold.co/400x400?text=Running+Shoes',
    description: 'Lightweight and breathable running shoes designed for maximum comfort during your workouts.',
    price: 79.99,
    category: 'Clothing',
    stock: 15,
    rating: 4.6,
    numReviews: 18,
  },
  {
    name: 'The Great Gatsby by F. Scott Fitzgerald',
    image: 'https://placehold.co/400x400?text=The+Great+Gatsby',
    description: 'A classic novel set in the Roaring Twenties. A must-read for literature lovers.',
    price: 14.99,
    category: 'Books',
    stock: 30,
    rating: 4.8,
    numReviews: 45,
  },
  {
    name: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    image: 'https://placehold.co/400x400?text=Clean+Code',
    description: 'Learn how to write better code and improve your software development skills.',
    price: 39.99,
    category: 'Books',
    stock: 20,
    rating: 4.9,
    numReviews: 30,
  },
  {
    name: 'Stainless Steel Cookware Set',
    image: 'https://placehold.co/400x400?text=Cookware+Set',
    description: 'Durable and elegant stainless steel cookware set for all your cooking needs.',
    price: 129.99,
    category: 'Home & Kitchen',
    stock: 8,
    rating: 4.5,
    numReviews: 15,
  },
  {
    name: 'Automatic Coffee Maker',
    image: 'https://placehold.co/400x400?text=Coffee+Maker',
    description: 'Start your morning right with this programmable automatic coffee maker.',
    price: 59.99,
    category: 'Home & Kitchen',
    stock: 12,
    rating: 4.4,
    numReviews: 20,
  },
  {
    name: 'Yoga Mat with Alignment Lines',
    image: 'https://placehold.co/400x400?text=Yoga+Mat',
    description: 'Non-slip yoga mat with alignment lines to help perfect your poses.',
    price: 29.99,
    category: 'Sports',
    stock: 40,
    rating: 4.7,
    numReviews: 25,
  },
  {
    name: 'Dumbbell Set with Stand',
    image: 'https://placehold.co/400x400?text=Dumbbell+Set',
    description: 'Adjustable dumbbell set with a convenient storage stand for home workouts.',
    price: 149.99,
    category: 'Sports',
    stock: 5,
    rating: 4.6,
    numReviews: 10,
  },
];

const importData = async () => {
  try {
    await connectDB();

    await Order.deleteMany();
    await Cart.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const adminUser = {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
    };

    const regularUser = {
      name: 'Test User',
      email: 'user@example.com',
      password: 'user123',
      role: 'user',
    };

    const createdUsers = await User.create([adminUser, regularUser]);

    await Product.insertMany(productsData);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

importData();
