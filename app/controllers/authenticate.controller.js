let User = require('../models/user.model'),
    jwt  = require('jsonwebtoken'),
    path = require('path');

module.exports = {
  userLogin   : (req, res) => {

    if (!req.body.username) {
      res.json({success : false, message : 'Authentication failed. User not found!'});
      return;
    }

    User.findOne({
      'username' : req.body.username
    }, (err, user) => {
      if (err) {
        console.log(err);
        throw err;
      }

      if (!user) {
        res.json({success : false, message : 'Authentication failed. User not found.'});
      } else if (user) {

        if (user.password != req.body.password) {
          res.json({success : false, message : 'Authentication failed. Wrong password.'});
        } else {
          let secret = process.env.SECRET;
          let token = jwt.sign(user, secret, {
            expiresIn : '24h'
          });

          res.json({
            success : true,
            message : 'Enjoy your token!',
            token   : token
          });
        }
      }
    });
  },
  verifyToken : (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers[ 'x-access-token' ];
    if (token) {
      let secret = process.env.SECRET;
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.json({success : false, message : 'Failed to authenticate token.'});
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).send({
        success : false,
        message : 'No token provided.'
      });
    }
  }
};