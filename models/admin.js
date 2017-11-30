const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var AdminSchema = new mongoose.Schema({
    userName: { type: String,
                required: true,
              },
    password: {
      type: String,
      required: true
    },
    tokens: [{
     access: {
       type: String,
       required: true
     },
     token: {
       type: String,
       required: true
     }
   }]
});

AdminSchema.pre('save', function (next) {
  var admin = this;

  if (admin.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(admin.password, salt, (err, hash) => {
        admin.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});


AdminSchema.methods.generateAuthToken = function() {
  var admin = this;
  //console.log('user id ', user._id);

  var access = 'x-auth';
  var token = jwt.sign({_id: admin._id.toHexString(), access}, 'ridvan25').toString();
  let clone = {access, token};

  admin.tokens.push(clone);

  return admin.save().then(() => {
    return token;
  });
};


AdminSchema.statics.findByCredentials = function (userName, password) {
  var Admin = this;

  return Admin.findOne({userName}).then((admin) => {
    if (!admin) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      // Use bcrypt.compare to compare password and user.password
      bcrypt.compare(password, admin.password, (err, res) => {
        if (res) {
          resolve(admin);
        } else {
          reject();
        }
      });
    });
  });
};

AdminSchema.statics.findByToken = function (token) {
  var Admin = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'ridvan25');
  } catch (e) {
    return Promise.reject();
  }

  return Admin.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'x-auth'
  });
};


var Admin = mongoose.model('Admin', AdminSchema);
module.exports = {Admin};
