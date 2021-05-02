const express = require('express');
const router = express.Router();
const faq_controller = require('../controllers/faq_controller');

router.get("/", faq_controller.load_all);

router.get("/:cat_id", faq_controller.load_cat);

router.post("/", faq_controller.post_faq);

module.exports = router;