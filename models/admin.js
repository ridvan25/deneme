const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

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


AdminSchema.methods.generateAuthToken = function() {
  var admin = this;

  console.log('user id ', user._id);

  var access = 'auth';
  var token = jwt.sign({_id: admin._id.toHexString(), access}, 'ridvan25').toString();

  admin.tokens.push({access, token});

  admin.save().then(()=>{
    return token;
  });

};



var Admin = mongoose.model('Admin', AdminSchema);

module.exports = {Admin};
