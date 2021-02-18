const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/tarot';

const db = mongoose.connect(mongoUri, { useNewUrlParser: true });

console.log('Tarot Database Connected')

module.exports = db;