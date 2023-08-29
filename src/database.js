const mongoose = require('mongoose');

const { QRA_MONGODB_DATABASE } = process.env;

// Conexión a MongoDB en el sistema host (localhost)
const MONGODB_URI = `mongodb://3.135.134.158:27017/${QRA_MONGODB_DATABASE}`;

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));
