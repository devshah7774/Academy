const mongoose = require("mongoose");
// Define mongoose schemas
const userSchema = new mongoose.Schema({
  username: {type: String},
  password: {type: String},
  name: {type: String},
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});
  
const adminSchema = new mongoose.Schema({
  username: String,
  password: String, 
  name: String
});
  
const courseSchema = new mongoose.Schema({
  adminID: String,
  adminName: String,
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean
});

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);
  
module.exports = {
  User,
  Admin,
  Course
}