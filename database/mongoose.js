var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Blog')
.then(()=>{
	console.log('Database Başarıyla bağlanıldı');
})
.catch((err)=>{
	console.error('App starting error:', err.stack);
});

module.exports = {mongoose};
