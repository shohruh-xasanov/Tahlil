const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    fullname:{
            type:String,
            required:[true, 'Ism va familya kiriting'],
            trim:true,
            minlength:7
    },
    password:{
        type:String,
        required:[true, 'Parol kiriting'],
        trim:true,
        minlength:7
    },
    login:{
        type:String,
        required:[true, 'Login kiriting'],
        trim:true,
        unique:true,
        minlength:7
    },
    role:{
        type:Number,
        default:401
    }
},{
    timestamps:true
})

// Encrypt password using bcrypt
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) {
        next()
    };
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
});

//  Match user entered password to hashed password in database
userSchema.methods.matchPassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return res.redirect('/api/auth/login');
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema)