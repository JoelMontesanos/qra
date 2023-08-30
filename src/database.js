const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://mongo:27017';

mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
.then(db => console.log('Database is connected'))
.catch(err => console.log(err));
