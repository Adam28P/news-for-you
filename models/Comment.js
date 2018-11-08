var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  _articleId: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  },
  date: String,
  commentText: String
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;