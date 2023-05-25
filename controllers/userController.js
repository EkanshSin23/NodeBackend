
const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const Contact = require("../models/contactModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Get Contact
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, mobile } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All Fields are mandaotry");
    }


    const userAvailable = await User.findOne({ email: email });
    if (userAvailable) {
        res.status(201).json({
            message: 'User Already Existed'
        });
        // throw new Error("User already registered");
    }


    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword, mobile
    });
    console.log(`User created ${user}`);

    if (user) {
        res.status(201).json({
            _id: user.id, email: user.email, message: 'Registered'
        })
    } else {
        res.status(400);
        throw new Error("User data us not valid");
    }
    res.json({ message: "Register the user" });
})


//Login 
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ email: email });

    //Password comparing with hashed one
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id

            }
        },
            process.env.SECRET_KEY,
            { expiresIn: "15d" }
        );
        res.status(200).json({
            message: "Logged the user", name: user.username,
            email: user.email, accessToken
        });

    } else {
        res.status(401);
        throw new Error("email or password is not correct")
    }

})


const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});
module.exports = { registerUser, loginUser, currentUser };