const mongoose = require("mongoose");


async function  connectToDb() {
    // const uri = "mongodb+srv://eyal:eyal123456@e-commerce.fsngodq.mongodb.net/test2"
    const uri = "mongodb+srv://tkuk:tkuk@cluster0.lkam2.mongodb.net/sample_mflix"

    try {
      await mongoose.connect(uri)
      console.log("db connected")
    } catch (error) {
        console.log(error);
    }
}


module.exports = connectToDb;