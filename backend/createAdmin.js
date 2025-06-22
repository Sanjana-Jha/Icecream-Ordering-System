const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AdminInfo = require('./models/AdminInfo'); // path to your model

mongoose.connect('mongodb://127.0.0.1:27017/testdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log("Connected to MongoDB");

  await AdminInfo.deleteMany({}); // optional: clear existing admins

  const hashedPassword = await bcrypt.hash("adminpassword", 10);
  await AdminInfo.create({
    email: "sanjanajha7644@gmail.com",
    password: hashedPassword
  });

  console.log("Admin created");
  mongoose.connection.close();
}).catch(console.error);
