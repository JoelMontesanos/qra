const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://mongo:cE4H32fC3Hfb2CCe1d4CC4BbGgDdDBCH@roundhouse.proxy.rlwy.net:24701';

mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
.then(db => console.log('Database is connected'))
.catch(err => console.log(err));
