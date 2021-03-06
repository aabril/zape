import _ from 'lodash'
import Image from "./image.model"
import multer from 'multer'

function handleError(res, err) {
  return res.status(500).send(err);
}

export function list(req, res) {
  Image.find(function (err, images) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(images);
  });
}

export function item(req, res) {
  Image.findById(req.params.id, function (err, image) {
    if(err) { return handleError(res, err); }
    if(!image) { return res.send(404); }
    return res.status(200).json(image);
  });
}

export function create(req, res) {
  const upload = multer({ dest: 'uploads/' }).single('imagefile')
  upload(req, res, (err) =>{
    if(err) return res.json(err)

    const newImage = {
      imagefile: req.file,
    }

    Image.create(newImage, function(err, image) {
      if(err) { return handleError(res, err); }
      return res.status(201).json(image);
    });
  })
}

export function update(req, res) {
  if(req.body._id) { delete req.body._id; }
  Image.findById(req.params.id, function (err, image) {
    if (err) { return handleError(res, err); }
    if(!image) { return res.send(404); }
    const updated = _.merge(image, req.body);
    return updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(image);
    });
  });
}

export function destroy(req, res) {
  Image.findById(req.params.id, function (err, image) {
    if(err) { return handleError(res, err); }
    if(!image) { return res.send(404); }
    return image.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send();
    });
  });
}
