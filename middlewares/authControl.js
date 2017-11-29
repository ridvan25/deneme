var {Admin} = require('./../models/admin');

var authControl = (req, res, next) => {
  var token = req.header('x-auth');
  console.log('req.token :   ' , token);
  console.log('admin.token' , Admin.tokens.token);

  Admin.findByToken(token).then((admin) => {
    if (!admin) {
      console.log('Bu tokenda admin yok!!');
      return Promise.reject();
    }

    req.token = token;
    next();
  }).catch((e) => {
    console.log('Baska bir hata!!!');
    res.status(401).send();
  });
};

module.exports = {authControl};
