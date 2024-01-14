const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "email must be provided"],
    },
    phone: {
        type: Number,
        required:true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

// secure password

userSchema.pre('save', async function ( next ) {

    if(!this.isModified('password')){
        next(); //like continue
    }

    try{
        const salt = await bcrypt.genSalt(10); // 10 is the salt round.
        const hashPwd = await bcrypt.hash(this.password, salt);
        this.password = hashPwd;

    } catch ( error ) {

        next(error);
    }

})


userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare( password, this.password );
};

module.exports = mongoose.model("User", userSchema);