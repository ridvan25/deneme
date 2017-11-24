const express = require('express');
const hbs = require('hbs');
const path = require('path');
const ejs = require('ejs');

var app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));


app.get('/', (req, res) => {
  res.render('index.ejs', {
    pageTitle: 'İndex',
    pageDatas: 'İndex İçerik',
    pageCopyRight : 'Rıdvan Karataş'
  });
});

app.get('/hakkinda', (req, res) => {

  var user_id = req.param('id');
  var token = req.param('token');

  res.render('hakkinda.ejs', {
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
