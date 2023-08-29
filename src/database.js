const mongoose = require('mongoose');

const { QRA_MONGODB_HOST, QRA_MONGODB_DATABASE } = process.env;

// Actualiza la URI para conectarte a MongoDB en la instancia del sistema
const MONGODB_URI = `mongodb://localhost:27017/${QRA_MONGODB_DATABASE}`;

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));