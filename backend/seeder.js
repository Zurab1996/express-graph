const User = require("./src/Models/User");

(async function(){
    const admin = {
        role: "admin",
        active: true,
        userName: "admin",
        email: "zura.aug@gmail.com",
        password: 1234567
    }
    const user = await User.findOne({ email: admin.email})
    if(!user){
        const newUser = await User.create(admin)
        console.log({ newUser })
    }
})()