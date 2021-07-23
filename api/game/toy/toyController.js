const model = require('./toyModel');
const path = require('path');
const appDir = path.dirname(require.main.filename);

exports.getToys = function(req, res) {

  model.find().exec()
  .then((toys) => {res.send(toys)})  
  .catch((error) => res.send(error.message))   

};            

function saveImage(reqfiles){
  let uploadPath = '';
  let imageFile = '';
  if (reqfiles) {
    imageFile = reqfiles.toyImageFile;
    realUploadPath = path.join(appDir, '/images/toys/', imageFile.name);  
    uploadPath = path.join('/images/toys/', imageFile.name);  
    imageFile.mv(realUploadPath, err => {
    
      if (err) {
        //return res.status(500).send(err); 
      }
    });
  };
  return uploadPath;
}

exports.addToy = function(req, res) {
    
  new model({
    name: req.body.toyName, 
    description: req.body.toyDescription, 
    imageUploadPath: saveImage(req.files)}).save()
  .then(toy => {
    res.status(200).send(toy)})
  .catch(error => res.status(500).send(error.message))     

};

exports.updToy = function(req, res) {

  model.findOneAndUpdate({_id: req.body.toyId}, {
    name : req.body.name, 
    description: req.body.description,
    imageUploadPath: saveImage(req.files)}).exec()
  .then(toy => res.status(200).send(toy))  
  .catch(error => res.status(500).send(error.message))

};

exports.delToy = function(req, res) {
  model.findOneAndDelete({_id: req.body.toyId}).exec()
    .then(toy => res.status(200).send(toy))
    .catch(error => res.status(500).send(error.message)); 
};