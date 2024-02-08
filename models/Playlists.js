const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    
    totalSongs: {
        type: Number
    },

    imgSrc: {
        type: String
    },

    songs: {
        type: Array
    }
});

module.exports = mongoose.model("playlists", playlistsSchema);