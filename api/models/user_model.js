const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fname:{type:String },
    lname:{type:String },
    contact:{type: Number},
    email:{type: String},
    password:{type: String}
});

module.exports = mongoose.model("User", userSchema);

// • FirstName
// • LastName
// • Contact no.
// • Email Address
// • Password
// • Repeat password