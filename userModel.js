const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

userSchema.methods.aboutMe = function () {
  //this.name;
  //this.age;
  console.log('user method aboutMe');
}

mongoose.model('User', userSchema, 'users');


//module.exports = UserModel;