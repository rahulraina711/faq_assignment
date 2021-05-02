const mongoose = require('mongoose');

const faqSchema = mongoose.Schema({
    cat_id:{type: String},
    question:{type: String},
    answer:{type: String}
});

module.exports = mongoose.model('Faq', faqSchema);

