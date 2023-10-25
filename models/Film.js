const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    acteurs: [{
        type: String,
        required: true,
    }],
    realisateur: {
        type: String,
        required: true,
    },
});

const Film = mongoose.model('Film', filmSchema);
module.exports = Film;
