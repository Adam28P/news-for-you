var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var commentSchema = new Schema({
  _articleId: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  },
  date: String,
  commentText: String
});

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;