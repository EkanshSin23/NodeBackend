const express = require('express');
const router = express.Router();
const { getContact, postContact, editContact, deleteContact } = require("../controllers/contactController")
const validateToken = require("../middleware/validateTokenHandler")

// router.use(validateToken);
router.route("/").get(getContact).post(postContact);
router.route("/:id").put(editContact).delete(deleteContact);






module.exports = router;
