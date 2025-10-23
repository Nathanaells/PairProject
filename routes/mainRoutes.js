const express = require('express');
const router = express.Router();

const Controller = require('../controllers/controller');
const loginRouter = require('./login');
const adminRouter = require('./admin');
const userRouter = require('./user');

router.use('/', loginRouter);

router.use((req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login?errors=Login Dulu');
  }
  next();
});


router.use('/admin', (req, res, next) => {
  if (req.session.user.role === "Admin") {
    next();
  } else {
    return res.redirect(`/home/${req.session.user.userId}`);
  }
}, adminRouter);

router.use('/', (req, res, next) => {
  if (req.session.user.role === "User") {
    next();
  } else {
    return res.redirect(`/admin/${req.session.user.userId}`);
  }
}, userRouter);

module.exports = router;
