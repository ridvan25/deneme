const express = require('express');
const path = require('path');
const ejs = require('ejs');
const routes = require('./views/pages');
const bodyParser = require('body-parser');


var {Admin} = require('./models/admin');
var {mongoose} = require('./database/mongoose');
var {authControl} = require('./middlewares/authControl');

var app = express();

app.use(bodyParser());
//app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

//app.set('views', path.join(__dirname, '/pages/'));

//console.log(__dirname);

app.get('/', (req, res) => {
  res.render('pages/index.ejs', {
    pageTitle: 'İndex',
    pageDatas: 'İndex İçerik',
    pageCopyRight : 'Rıdvan Karataş'
  });
});

app.get('/hakkinda', authControl,  (req, res) => {

  console.log('HAkkında get');
  var user_id = req.param('id');
  var token = req.param('token');

  res.render('pages/hakkinda.ejs', {
    pageTitle: 'Hakkında',
    pageDatas: 'Hakkında Sayfası İçerik',
    pageCopyRight : 'Rıdvan Karataş',
  });
});

app.post('/hakkinda', authControl, (req, res) => {

  console.log('HAkkında post');

  var user_id = req.param('id');
  var token = req.param('token');

  res.send(req.token);

});

app.get('/admin/admin_giris', (req, res) => {

  res.render('admin/admin_giris.ejs', {
    pageTitle: 'Hakkında',
    pageDatas: 'Admin Giriş Sayfası İçerik',
    pageCopyRight : 'Rıdvan Karataş',
  });
});



app.post('/admins/', (req, res) => {

    console.log('gelen isim', req.body.userName);
    console.log('gelen şifre', req.body.password);

    var admin = new Admin({
      userName: req.body.userName,
      password: req.body.password,
    });

    admin.save().then(() => {
      return admin.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(admin);
    }).catch((e) => {
      res.status(400).send(e);
    })

});



app.post('/admin/login/sonuc/', (req, res) => {
    console.log('gelen isim', req.body.userName);
    console.log('gelen şifre', req.body.password);


    Admin.findByCredentials(req.body.userName, req.body.password).then((admin) => {
      console.log('Admin ', admin.userName);
      return admin.generateAuthToken().then((token) => {
        res.header('x-auth', token).redirect('/hakkinda');
        console.log('Gelen Token ', token);
        //res.redirect('http://localhost:3000/hakkinda');
      });
    }).catch((e) => {
        console.log('Credentials Hata!!', e.stack);
        res.status(400).send();
    });
 });

 app.get('/admin/admin_login', (req, res) => {

   var user_id = req.param('id');
   var token = req.param('token');
   console.log('hersey tamam');

   res.render('admin/admin_login.ejs', {

     pageTitle: 'Admin JS',
     pageDatas: 'Admin JS Sayfası İçerik',
     pageCopyRight : 'Rıdvan Karataş',
   });
 });


app.get('/uyari', (req, res) => {
  res.send({
    errorMessage: 'Geçersiz istek!!! '
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
