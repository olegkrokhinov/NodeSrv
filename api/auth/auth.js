const userModel = require('../user/userModel');
const roleModel = require('../user/roleModel');



// exports.verifyToken = (req, res, next) => {
//   let jwtAccessToken = req.jwtAccessToken;

//   if (!jwtAccessToken) {
//     return res.status(403).send({ message: "No access token provided!" });
//   }

//   jwt.verify(jwtAccessToken, secretKey)
//   .then(decoded => {
//     req.userId = decoded.id;
//     next();
//   })
//   .catch(err => {
//     return res.status(401).send({ message: "Unauthorized!" });
//   });
// };

exports.isAdmin = (req, res, next) => {
    return isRole('admin', req, res, next);
};

exports.isModerator = (req, res, next) => {
    return isRole('moderator', req, res, next);
};

exports.isUser = (req, res, next) => {
  return isRole('user', req, res, next);
};

isRole = (role, req, res, next) => {
  
  if (!req.user) {
    return;
  };

  userModel.findById(req.user.Id).exec()
  .then(user => {

    roleModel.find({_id: { $in: user.roles }}).exec()
        .then(roles =>{
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === role) {
                  next();
                }
              }
      
            return res.status(403).send({ message: "Require "+ role +" role!" });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });   
        })
  
  })
  .catch(err => {
      res.status(500).send({ message: err.message });
  })
   
    
  };