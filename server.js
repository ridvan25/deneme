const express = require('express');
const hbs = require('hbs');
const path = require('path');
const ejs = require('ejs');
const routes = require('./views/pages');

var app = express();

//app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

//app.set('views', path.join(__dirname, '/pages/'));

console.log(__dirname);

app.get('/', (req, res) => {
  res.render('pages/index.ejs', {
    pageTitle: 'İndex',
    pageDatas: 'İndex İçerik',
    pageCopyRight : 'Rıdvan Karataş'
  });
});

app.get('/hakkinda', (req, res) => {

  var user_id = req.param('id');
  var token = req.param('token');

  res.render('pages/hakkinda.ejs', {
    pageTitle: 'Hakkında',
    pageDatas: 'Hakkında Sayfası İçerik',
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
