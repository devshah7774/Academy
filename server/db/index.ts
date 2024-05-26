import mongoose from "mongoose";
// Define mongoose schemas
const userSchema = new mongoose.Schema({
  username: {type: String, required:true},
  password: {type: String, required:true},
  name: {type: String, required:true},
  role: {type: String, require:true},
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

const adminSchema = new mongoose.Schema({
  username: {type: String, required:true},
  password: {type: String, required:true}, 
  role: {type: String, require:true},
  name: {type: String, required:true}
});
  
const courseSchema = new mongoose.Schema({
  adminID: {type: String, required:true},
  adminName: {type: String, required:true},
  title: {type: String, required:true},
  description: {type: String, required:true},
  price: {type: Number, required:true},
  imageLink: {type: String, required:true},
  published: {type: Boolean, required:true}
});

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);
  
export { User, Admin, Course };