
const mongoose = require("mongoose");
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const dbConnect = async () => {

    mongoose.connect("mongodb+srv://eknsh:x6Ja1o5STSq4Firo@cluster0.urjdf37.mongodb.net/test", connectionParams)
        .then(() => {
            console.log('Connected to database ')
        })
        .catch((err) => {
            console.error(`Error connecting to the database. \n${err}`);
        })
}


module.exports = dbConnect;