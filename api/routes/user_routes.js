const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controllers');

router.post("/signup", user_controller.sign_up);

router.post("/login", user_controller.log_in);

module.exports = router ;