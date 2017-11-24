const express = require('express');
const hbs = require('hbs');

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('anasayfa.hbs', {
    pageTitle: 'Ana Sayfa',
    pageDatas: 'Ana Sayfa İçerik',
    pageCopyRight : 'Rıdvan Karataş'
  });
});

app.get('/hakkinda', (req, res) => {
  res.render('hakkinda.hbs', {
    pageTitle: 'Hakkında',
    pageDatas: 'Hakkında Sayfası İçerik',
    pageCopyRight : 'Rıdvan Karataş'
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
