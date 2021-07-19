const model = require('./toyModel');

const fileUpload = require('express-fileupload');

exports.addToy = function(req, res) {
  new model({
          name: req.body.name, 
          description: req.body.description, 
          imageUploadPath: ''})
  .save()
  .then((toy) => {
    saveToyImage(req, res, toy);
    res.send(toy)})  
  .catch((error) => res.send(error.message))     
};

exports.updToy = function(req, res) {
  model.findOneAndUpdate({_id: req.body.toyId}, {
    name : req.body.name, 
    description: req.body.description})
  .exec()
  .then((toy) => {
    saveToyImage(req, res, toy);
    res.send(toy)})  
  .catch((error) => res.send(error.message))
};

exports.delToy = function(req, res) {
  model.findOneAndDelete({_id: req.body.toyId})
    .exec()
    .then((toy) => {res.send(toy)})
    .catch((error) => res.send(error.message)); 
};
 
saveToyImage = function(req, res, toy) {
  if (req.files) {
    imageFile = req.files.imageFile;
    uploadPath = __dirname + '/media/images/' + imageFile.name;  
    imageFile.mv(uploadPath) 
    .then(()=>{
      res.send('File uploaded!');
      toy.imageUploadPath = uploadPath;
      toy.save();
    })
    .catch((error)=> {return res.status(500).send(error)})
  };   
};