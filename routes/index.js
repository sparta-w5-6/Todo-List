const express = require('express');
const router = express.Router();

const signupRouter = require('./signup.routes');
const todoRouter = require('./todo.routes');
router.use('/signup/', signupRouter);
router.use('/todo/', todoRouter);
module.exports = router;
