const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
  friendId : mongoose.SchemaTypes.ObjectId,
  approved : {
    type: Boolean,
    default : false
  }
});

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  friends: [friendSchema],  
});


userSchema.methods.friendRequestAdd = function(friendId, cb) {
  
  let friend =  this.friends.find(item => {(item.friendId == friendId)});
  if (!friend) {
    newFriend = new (mongoose.model('Friend', friendSchema))({friendId : friendId});
    this.friends.push(newFriend);
    this.save();
    cb('', newFriend);
  } else {
    cb('', friend);
  }
};

userSchema.methods.friendRequestApprove = function(friendId, cb) {
 
  let friend =  this.friends.find(item => {
    return (item.friendId == friendId);
  });
  if (friend) {
    friend.approved = true; // approved
     this.save();
     cb('', friend);
  } else {
    cb('', {})
  };
};

userSchema.methods.friendDelete = function(friendId, cb) {
  ;
  let friendArrIndex= this.friends.findIndex(item => item.friendId == friendId);
  //let friend = this.friends[friendArrIndex];
  
  if (friendArrIndex >= 0) {
    this.friends.splice(friendArrIndex, 1);
    this.save(); 
    cb('', {}); 
  } else {
    cb('', {});
  };
};

userSchema.methods.aboutMe = function () {
  console.log('user method aboutMe');
};

userSchema.statics.findUser_And_AddFriendRequest = function(userId, friendId, cb) {
  
  this.findById( userId, (err, user)=>{
    if(err) return console.log(err);
    user.friendRequestAdd(friendId, (err, friend)=>{
      if(err) return console.log(err);
      cb('', friend);
    });
  });

  //doc.set('socialHandles.stackOverflow', 'vkarpov15'); 
  //doc.get('socialHandles.stackOverflow')); 

};

userSchema.statics.findUser_And_ApproveFriend = function(userId, friendId, cb) {

  this.findById( userId, (err, user)=>{
    if(err) return console.log(err);
    user.friendRequestApprove(friendId, (err, friend)=>{
    if(err) return console.log(err);
    cb('', friend);
  });

  });
};

userSchema.statics.findUser_And_DeleteFriend = function(userId, friendId, cb) {

  this.findById( userId, (err, user)=>{
    if(err) return console.log(err);
    
   user.friendDelete(friendId, (err, friend)=>{
    if(err) return console.log(err);
    cb('', friend);
  });

  });
};




const userModel = mongoose.model('User', userSchema, 'users');




//module.exports = UserModel;