
const asyncHandler = require("express-async-handler");
const contactModel = require('../models/contactModel');
const Contact = require("../models/contactModel")


//Get Contact
const getContact = asyncHandler(async (req, res) => {
    console.log("came")
    const contactData = await Contact.find();
    console.log(contactData)
    if (contactData) {
        res.status(200).json({
            message: 'Hellllo',
            data: contactData
        })
    } else {
        console.log('No data')
    }
})

//Post Contact
const postContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    console.log(req.body)

    if (!name || !email) {
        res.status(404);
        throw Error("All Fields Are Mandatory");
    }
    else {
        console
        const newContact = new Contact({
            name: name,
            email: email,
            phone: phone,
            user_id: req.user.id,
        })
        const data = await newContact.save();
        res.status(200).json({
            message: 'Posting Contact Through This Route',
            data: data
        })
    }
    res.json({
        message: 'hello'
    })
})


//Edit Contact
const editContact = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { name, email, phone } = req.body;
    const findContact = await Contact.findOne({ _id: id });
    if (findContact) {
        await Contact.findByIdAndUpdate({ _id: id }, {
            name: name,
            email: email,
            phone: phone
        })
        const updatedContact = await Contact.findById({ _id: id });

        res.status(200).json({
            message: `Updating Contact With ID ${id}`,
            data: updatedContact
        })
    }
})


//Delete Contact
const deleteContact = asyncHandler(async (req, res) => {
    const { id } = req.params
    const findContact = await Contact.findOne({ _id: id });
    if (findContact) {
        const deletedContact = await Contact.findByIdAndDelete({ _id: id });

        res.status(200).json({
            message: `Delete Contact With ID ${id}`,
            data: deletedContact
        })
    }
})
module.exports = { getContact, postContact, editContact, deleteContact }