const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
  //trim: Khi user input: anh nguyen -> trim cat string thanh anhnguyen
  //unique id phai rieng biet va ko dong nhat
  name: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Name must be required"],
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Email must be required"],
  },
  password: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Password must be required"],
    minLength: [6, "Password must be at 6 characters"],
  },
},{timestamps: true});

userSchema.pre('save',  function(next) {
  //this chinh la documment duoc tao ra trong mongo
  let user = this;
  bcrypt.hash(user.password, 10 , function(error, hash){
    if(error){
      return next(error)
    }else{
      user.password = hash;
      //thuc hien luu
      next();
    }
  })
})

const User = mongoose.model('User', userSchema)

module.exports = User