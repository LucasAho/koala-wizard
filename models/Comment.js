import mongoose from "mongoose";

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    URL:{
        type: String,
        required: true
    },
    parentArt: {
        type: Schema.Types.ObjectId,
        ref: "Article"
      }
    
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;