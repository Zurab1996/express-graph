const mongoose = require("mongoose");
require("dotenv").config();

const { MONGO_URL } = require('./src/configs')
const User = require("./src/Models/User");

mongoose
    .connect(
        MONGO_URL,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(async () => {
        const user = await User.findOne({ email: admin.email})
        if(!user){
            const newUser = await User.create(admin)
            console.log({ newUser })
        }
        process.exit()
    })

// Data array containing seed data - documents organized by Model
const admin = {
    role: "admin",
    active: true,
    userName: "admin",
    email: "zura.aug@gmail.com",
    password: 1234567
}