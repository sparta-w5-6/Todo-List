const express = require('express');
const router = express.Router();

const LogoutController = require('../controllers/logout.controller');

const logoutController = new LogoutController();

router.post('/', logoutController.logoutUser);

module.exports = router;
