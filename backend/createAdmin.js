// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const dotenv = require("dotenv");
// const User = require("./models/User");

// dotenv.config();

// const createAdmin = async () => {
//     try {
//         // Connect to MongoDB
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log("MongoDB connected!");

//         const adminEmail = "admin@hamroaawaj.com";
//         const adminPassword = "Admin1234";

//         // Check if admin already exists
//         const existingAdmin = await User.findOne({
//             email: adminEmail
//         });

//         if (existingAdmin) {
//             console.log("Admin already exists.");

//             await mongoose.connection.close();
//             return;
//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(adminPassword, 10);

//         // Create admin
//         const admin = await User.create({
//             name: "Hamro Aawaj Admin",
//             email: adminEmail,
//             password: hashedPassword,
//             role: "admin"
//         });

//         console.log("Admin created successfully!");
//         console.log("Email:", admin.email);
//         console.log("Role:", admin.role);

//         await mongoose.connection.close();

//     } catch (error) {
//         console.error("Error creating admin:", error.message);
//         process.exit(1);
//     }
// };

// createAdmin();