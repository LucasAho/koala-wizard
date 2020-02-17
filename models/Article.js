const mongoose = require("mongoose");

var articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    desc: {
        type: String,
        required: true,
        trim: true
    },
    URL:{
        type: String,
        required: true
    }
    // ,
    // comment: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Comment"
    // }
    
});

var Article = mongoose.model("Article", articleSchema);

module.exports = Article;