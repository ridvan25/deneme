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

  var access = 'auth';
  var token = jwt.sign({_id: admin._id.toHexString(), access}, 'ridvan25').toString();
  let clone = {access, token};


  admin.tokens.push(clone);

  return admin.save().then(()=>{
    return token;
  });



};





var Admin = mongoose.model('Admin', AdminSchema);

module.exports = {Admin};
