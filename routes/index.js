const express = require('express');
const router = express.Router();

const signupRouter = require('./signup.routes');

const todoRouter = require('./todo.routes');

const commentRouter = require('./comment.routes');
const loginRouter = require('./login.routes');
const logoutRouter = require('./logout.routes');

router.use('/todo/', todoRouter);
router.use('/signup/', signupRouter);
router.use('/login/', loginRouter);
router.use('/logout/', logoutRouter);
router.use('/comments/', commentRouter);


module.exports = router;
