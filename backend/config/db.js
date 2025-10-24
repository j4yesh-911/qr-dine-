// const mongoose = require('mongoose');

// const connectDB = async () => {
//   if (!process.env.MONGO_URI) throw new Error('mongodb+srv://qr_dine:WcZzjNST7vhfoIh3@cluster0.mongodb.net/qr_restro?retryWrites=true&w=majority');
//   await mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   });
//   console.log('MongoDB connected');
// };

// module.exports = connectDB;


const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
