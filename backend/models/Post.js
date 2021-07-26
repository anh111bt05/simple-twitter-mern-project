const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({
  //trim: Khi user input: anh nguyen -> trim cat string thanh anhnguyen
  //unique id phai rieng biet va ko dong nhat
  content: {
    type: String,
    trim: true,
    required: [true, "Post must have content"],
  },
  author: {
    // Luu user id tu trong User
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

},{timestamps: true});

const User = mongoose.model('Post', postSchema)

module.exports = User