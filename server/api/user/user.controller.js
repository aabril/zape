import _ from 'lodash'
import User from "./user.model"

function handleError(res, err) {
  return res.status(500).send(err);
}

export function list(req, res) {
  User.find(function (err, users) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(users);
  });
}

export function create(req, res) {
  User.create(req.body, function(err, user) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(user);
  });
}

export function me(req, res) {
  let userId = "";
  User.findById(userId, function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    return res.status(200).json(user);
  });
}

export function item(req, res) {
  User.findById(req.params.id, function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    return res.status(200).json(user);
  });
}

export function update(req, res) {
  if(req.body._id) { delete req.body._id; }
  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    const updated = _.merge(user, req.body);
    return updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(user);
    });
  });
}

export function destroy(req, res) {
  User.findById(req.params.id, function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    return user.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send();
    });
  });
}