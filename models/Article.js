var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique:true
  },
  link: {
    type: String,
    required: true
  },
  sentence: {
    type: String,
    required: true
  },
  date: String,
  saved: {
    type: Boolean,
    default: false
  },
  comment: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

var Article = mongoose.model("Article", ArticleSchema);

//export model
module.exports = Article;