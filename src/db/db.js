const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');

const db = (URI) => {
    return mongoose.connect(URI)
}

module.exports = db