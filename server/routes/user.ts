import express from 'express';
import jwt from "jsonwebtoken";
import { authenticateJwt, SECRET } from "../middleware/auth";
import { User, Course } from "../db";

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password, name } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: 'User already exists' });
  } else {
    const newUser = new User({ username, password, name });
    await newUser.save();
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'User created successfully', token });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

router.get('/courses', authenticateJwt, async (req, res) => {
  const courses = await Course.find({published: true});
  res.json({ courses });
});

router.post('/courses/:courseId', authenticateJwt, async (req, res) => {
  const course = await Course.findOne({
    _id: req.params.courseId,
    published: true
  });
  if (course) {
    const user = await User.findOne({ username: req.headers.userEmail });
    if (user) {
      user.purchasedCourses.push(course.id);
      await user.save();
      res.json({ message: 'Course purchased successfully' });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

router.get('/courses/:courseId', authenticateJwt, async (req, res) => {
  const course = await Course.findOne({
    _id: req.params.courseId,
    published: true
  });

  if (course) {
    res.json({ course });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

router.get('/purchasedCourses', authenticateJwt, async (req, res) => {
  const user = await User.findOne({ username: req.headers.userEmail }).populate('purchasedCourses');
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: 'User not found' });
  }
});

export default router;