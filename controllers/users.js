const User = require('../models/user');
const {isAuthorized} = require('../utils/jwt');



const getUsers = (req, res) => {
  if(!isAuthorized(req.headers.authorization)) {
    return res.status(403).send({ message: 'authrize first'})
  }


  return User.find({})
        .then(users => res.status(200).send(users))
        .catch(err => res.status(400).send(err))
}

const getProfile = (req, res) => {
  if(!isAuthorized(req.headers.authorization)) {
    return res.status(403).send({ message: 'authrize first'})
  }

  return User.findOne({ id: req.params.id })
        .then((user) => {
          if (!user) {
            return res.status(404).send({ message: 'Нет пользователя с таким id' });
          }

          return res.status(200).send(user);
        })
        .catch((err) => res.status(400).send(err));
  }

const createProfile = (req, res) => {
  if(!isAuthorized(req.headers.authorization)) {
    return res.status(403).send({ message: 'authrize first'})
  }

  return User.countDocuments({})
    .then((id) => { 
      return User.create({ ...req.body, id }) 
        .then((user) => {
          return res.status(200).send(user);
        })
        .catch((err) => res.status(400).send(err));
    });
}

module.exports = {getUsers, getProfile, createProfile};
