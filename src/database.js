const mongoose = require('mongoose');

const {QRA_MONGODB_HOST,
    QRA_MONGODB_DATABASE} = process.env;

//const MONGODB_URI = `mongodb://${QRA_MONGODB_HOST}/${QRA_MONGODB_DATABASE}`;
const MONGODB_URI = `mongodb://mongo:27017/qr`;

mongoose.connect(MONGODB_URI,{
    useUnifiedTopology: true,
    useNewUrlParser:true,
})
.then(db => console.log('Database is connected'))
.catch(err => console.log(err));