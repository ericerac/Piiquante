const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type:String, required:true, unique: true},
    name:{ type:String, required:true},
    manufacturer:{ type:String, required:true},
    description: { type:String, required:true},
    mainPepper:{ type:String, required:true},
    imageUrl: { type:String, },
    heat:{ type: Number, required:true},
    likes:{type: Number, default: 0},
    dislikes:{type: Number, default: 0},
    usersLiked: [{ type:String}], //<usersId>, tableau des id des utilisateurs qui ont liked
    usersDisliked: [{ type:String}], //<usersId>, tableau des id des utilisateurs qui ont disliked
})

module.exports = mongoose.model('sauces', sauceSchema);