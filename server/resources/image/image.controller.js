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
  // if (!req.files) return res.status(400).send('No files were uploaded.')
  // const imagefile = req.files.imagefile

  // Image.create(req.body, function(err, image) {
  //   if(err) { return handleError(res, err); }
  //   return res.status(201).json({image, imagefile});
  // });
  // console.log(req.files);
  // console.log(req.file);
  // return res.status(200).json({})

    const multerStorage =  multer.diskStorage({
      destination: (req, file, callback) => {
        
        console.log('req.body', req.body)
        console.log('file', file)

        let path = "./uploads";
        switch(req.body.type)
        {
            case 'link': path += '/link'; break;
            case 'PDF': path += '/PDF'; break;
            case 'video': path += '/video'; break;
            case 'audio': path += '/audio'; break;
            case 'image': path += '/image/' + req.body.folder; break;
        }
        callback(null, path);
      },
      filename: (req, file, callback) => {
          callback(null, file.originalname);
      }
    });

    const onFileUploadCompleteCb = (req, file, callback) => {
      const asset = new Asset(req.body);
      asset.save(function(err, asset){
          if(err) return next(err);
          return next();
      });
    }

    multer({ storage: multerStorage, onFileUploadComplete: onFileUploadCompleteCb})
      .single('imagefile')(req, res, (err) => {
        if(err) return res.send("Err: "+ err);
        res.status(201).json({});
    });
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
