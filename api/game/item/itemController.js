const model = require('./itemModel');
const path = require('path');
const url = require('url');
const appDir = path.dirname(require.main.filename);

function saveImage(reqfiles){
  let uploadPath = '';
  let imageFile = '';
  if (reqfiles) {
    imageFile = reqfiles.itemImageFile;
    realUploadPath = path.join(appDir, '/images/items/', imageFile.name);
    //uploadPath = path.join('/images/items/', imageFile.name);
    uploadPath = path.posix.join(path.posix.sep, '/images/items/', imageFile.name)

    imageFile.mv(realUploadPath, err => {

      if (err) {
        //return res.status(500).send(err);
      }
    });
  };
  return uploadPath;
}

exports.getItems = function(req, res) {

  model.find().exec()
  .then((items) => {res.send(items)})
  .catch((error) => res.send(error.message))

};

exports.getItem = function(req, res) {
  model.findOne({_id: req.body.itemId}).exec()
    .then(item => res.status(200).send(item))
    .catch(error => res.status(500).send(error.message));
};

exports.addItem = function(req, res) {

  new model({
    name: req.body.itemName,
    description: req.body.itemDescription,
    imageUploadPath: saveImage(req.files)}).save()
  .then(item => {
    res.status(200).send(item)})
  .catch(error => res.status(500).send(error.message))

};

exports.updItem = function(req, res) {

  model.findOneAndUpdate({_id: req.body.itemId}, {
    name : req.body.name,
    description: req.body.description,
    imageUploadPath: saveImage(req.files)}).exec()
  .then(item => res.status(200).send(item))
  .catch(error => res.status(500).send(error.message))

};

exports.delItem = function(req, res) {
  model.findOneAndDelete({_id: req.body.itemId}).exec()
    .then(item => res.status(200).send(item))
    .catch(error => res.status(500).send(error.message));
};
