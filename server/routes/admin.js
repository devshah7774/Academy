const express = require('express');
const { Course, Admin } = require("../db");
const jwt = require('jsonwebtoken');
const { SECRET } = require("../middleware/auth")
const { authenticateJwt } = require("../middleware/auth");

const router = express.Router();

router.post('/signup', (req, res) => {
  const { username, password, name } = req.body;
  Admin.findOne({ username }).then((admin)=>{
    if (admin) {
      res.json({ message: 'Admin already exists' }).status(403);
    } else {
      const newAdmin = new Admin({username, password, name});
      newAdmin.save();

      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Admin created successfully', token });
    }
  });
});
  
router.post('/login', async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.json({ message: 'Invalid username or password' }).status(403);
  }
});

router.post('/courses', authenticateJwt, async (req, res) => {
  const obj = req.body;
  obj.adminID = req.user.username;
  const adm = await Admin.findOne({username:req.user.username});
  obj.adminName = adm.name;
  const course = new Course(obj);
  await course.save();
  
  res.json({ message: 'Course created successfully', courseId: course.id });
});

router.put('/courses/:courseId', authenticateJwt, async (req, res) => {
  const validCIDs = (await Course.find({ adminID: req.user.username })).map(course => course.id);
  const targetID = validCIDs.find(id => id === req.params.courseId);
  const course = await Course.findByIdAndUpdate(targetID, req.body, { new: true });

  if (course) {
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

router.get('/courses', authenticateJwt, async (req, res) => {
  const courses = await Course.find({ adminID: req.user.username });
  res.json({ courses });
});

router.get('/course/:courseId', authenticateJwt, async (req, res) => {
  const validCIDs = (await Course.find({ adminID: req.user.username })).map(course => course.id);
  const targetID = validCIDs.find(id => id === req.params.courseId);
  const course = await Course.findById(targetID);
  if(course)res.json({ course });
  else res.status(404).json({message: "Course not found"});
});

router.delete('/course/:courseId', authenticateJwt, async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.params.courseId });
    res.json({ message: 'Course Deleted Successfully' });
  } catch (e) {
    console.error(e); // Log the error for debugging purposes
    res.status(500).json({ message: 'Unable to Delete' }); // Send a generic error message
  }
});

module.exports = router;