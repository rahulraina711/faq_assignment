const User = require('../models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_secret = "sfohfiwefweifuewhf9823r3820397r30r37r3073rhfw9f8y32r09j2039r";


function validateEmail(mail){
    let isTrue = false
    let mailArr = mail.split("");


    if (mailArr.includes("@")&&mailArr.includes(".")&& mailArr.indexOf(".")>mailArr.indexOf("@")){
        isTrue = true;
    }
    
    return isTrue;
}


// for sign up

exports.sign_up = async (req, res) => {
    try {

        const {
            fname,
            lname,
            password,
            confPass,
            email,
            contact
        } = req.body;

        if (!validateEmail(email)){
            return res.status(400).json({
                message: "Not a valid email"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Passwords must be 8 characters long"
            });
        }
        if (password !== confPass) {
            return res.status(400).json({
                message: "Passwords donot match"
            });
        }
        // hash the pass
        const hashedPass = await bcrypt.hash(password, 10);

        // search for exiting user
        const existingUser = await User.findOne({
            email
        });
        if (existingUser) {
            return res.status(400).json({
                message: "User Already exists"
            });
        };
        const user = new User({
            fname,
            lname,
            email,
            contact,
            password: hashedPass
        });

        const savedUser = await user.save();
        res.status(200).json({
            savedUser
        })

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
};

exports.log_in = async (req, res) => {

    const {
        email,
        password
    } = req.body;

    const existingUser = await User.findOne({
        email
    });
    if (!existingUser) {
        res.status(400).json({
            message: "User not found. Please signUp first"
        });
    };
    bcrypt.compare(password, existingUser.password, (err, result) => {
        if (err) return res.json({
            message: "Auth failed"
        });
        if (result) {
            const token = jwt.sign({
                email: existingUser.email,
                u_id: existingUser._id

            }, jwt_secret, {
                expiresIn: "3h"
            });
            res.status(201).json({
                name: existingUser.fname + " " + existingUser.lname,
                contact: existingUser.contact,
                email: existingUser.email,
                token
            });
        };
    });


};