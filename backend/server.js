// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const dotenv = require('dotenv');

// const authRoutes = require('./routes/auth');
// const menuRoutes = require('./routes/menu');
// const orderRoutes = require('./routes/orders');
// const adminRoutes = require('./routes/admin');
//  dotenv.config();
// connectDB();
// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/menu', menuRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/admin', adminRoutes);
// app.use("/api/auth", require("./routes/authRoutes"));

// const PORT = process.env.PORT || 4000;
// connectDB().then(() => {
//   app.listen(PORT, () => console.log(`Server running on ${PORT}`));
// });


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 4000;

connectDB()
  .then(async () => {require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 4000;

connectDB()
  .then(async () => {
    // ✅ Auto-create admin if not exists
    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existingAdmin) {
      const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await User.create({
        name: 'Admin',
        email: process.env.ADMIN_EMAIL,
        password: hash,
        role: 'admin'
      });
      console.log(`✅ Admin created: ${process.env.ADMIN_EMAIL} / password: ${process.env.ADMIN_PASSWORD}`);
    } else {
      console.log(`✅ Admin already exists: ${process.env.ADMIN_EMAIL}`);
    }

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error("❌ MongoDB connection failed:", err.message));

    // ✅ Auto-create admin if not exists
    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existingAdmin) {
      const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await User.create({
        name: 'Admin',
        email: process.env.ADMIN_EMAIL,
        passwordHash: hash,
        role: 'admin'
      });
      console.log(`✅ Admin created: ${process.env.ADMIN_EMAIL} / password: ${process.env.ADMIN_PASSWORD}`);
    } else {
      console.log(`✅ Admin already exists: ${process.env.ADMIN_EMAIL}`);
    }

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error("❌ MongoDB connection failed:", err.message));

