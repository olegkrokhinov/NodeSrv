const mongoose = require('mongoose');

const FRІEND_ALREADY_EXISTS = 'Friend (friend request) already exists.';
const FRIEND_NOT_FOUND = 'Friend (friend request) not found.';
const USER_NOT_FOUND = 'User not found.';



// const friendSchema = new mongoose.Schema({
//   friendId : mongoose.SchemaTypes.ObjectId,
//   approved : {
//     type: Boolean,
//     default : false
//   }
// });

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  friends: [{
    friendId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'userShema'},
    approved: Boolean
  }]

//  friends: [friendSchema],  
});


userSchema.methods.addFriendRequest = function(friendId, callback) {
  err = '';
  let friend =  this.friends.find(item => item.friendId == friendId);

  if (!friend) {
    friend = {friendId: friendId, approved: 0};
    this.friends.push(friend);
    this.save();
  } else {
      err = FREND_ALREADY_EXISTS;  
  }

  callback? callback(err, friend) : '';
  return friend;
};

userSchema.methods.approveFriendRequest = function(friendId, callback) { 
  err = '';
  let friend =  this.friends.find(item => item.friendId == friendId);
  
  if (friend) {
    friend.approved = true; // approved
     this.save();
  } else {
    err = FRIEND_NOT_FOUND;  
  };

  callback? callback(err, friend) : '';
  return friend;
};

userSchema.methods.deleteFriendRequest = function(friendId, callback) {
  err = '';
  let friend;
  let friendArrayIndex= this.friends.findIndex(item => item.friendId == friendId);
  
  if (friendArrayIndex >= 0) {
    this.friends.splice(friendArrayIndex, 1);
    this.save(); 
  } else {
    err = FRIEND_NOT_FOUND;  
  };
  
  callback? callback(err, friend) : '';
  return friend;
};

userSchema.statics.addFriendRequestToUser = function(userId, friendId, callback) { 
  let err = '';
  let friend;
  let user;

  user = this.find(userId).exec();
console.log(user);
  if (user) {
    
    user.addFriendRequest(friendId, (_err, _friend) => {
      err = _err;
      friend = _friend;
    });
  } else {
      err = USER_NOT_FOUND; 
  };

  callback? callback(err, friend) : '';
  return friend;
};

// userSchema.statics.addFriendRequestToUser = function(userId, friendId, callback) { 
//   let err = '';
//   let friend;
//  // let user;

//   this.find(userId, (_err, _user) => {
//       let user = _user;
//   });

//   if (user) {
    
//     user.addFriendRequest(friendId, (_err, _friend) => {
//       err = _err;
//       friend = _friend;
//     });
//   } else {
//       err = USER_NOT_FOUND; 
//   };

//   callback? callback(err, friend) : '';
//   return friend;
// };


userSchema.statics.approveFriendRequestForUser = function(userId, friendId, callback) { 
  let err = '';
  let friend;
  let user;
  this.findById(userId, (_err, _user) => {
      user = _user;    
  });

  if (user) {
    user.approveFriendRequest(friendId, (_err, _friend) => {
      err = _err;
      friend = _friend;
    });
  } else {
      err = USER_NOT_FOUND; 
  };

  callback? callback(err, friend) : '';
  return friend;
};

userSchema.statics.deleteFriendRequestFromUser = function(userId, friendId, callback) {
  err = '';
  let friend;
  let user;
  this.findById(userId, (_err, _user) => {
    user = _user;    
  });
  
  if(user) {
    console.log(user);
    user.deleteFriendRequest(friendId, (_err, _friend) => {
      err = _err;
      friend = _friend;
    });
  } else {
      err = USER_NOT_FOUND; 
  };

  callback? callback(err, friend) : '';
  return friend;
};


const userModel = mongoose.model('User', userSchema, 'users');




//module.exports = UserModel;