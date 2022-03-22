const mongoose = require('mongoose');
const EmailUnique = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
email: { type:String, unique: true, required:true},
password: { type:String,required:true },
})

userSchema.plugin(EmailUnique);

module.exports = mongoose.model('user', userSchema);
