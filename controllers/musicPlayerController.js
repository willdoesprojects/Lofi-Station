const UserModel = require("../models/Users");
const PlaylistsModel = require("../models/Playlists");

const homePageHandler = async (req, res) => {
    if (!req.session.index) {
        req.session.index = 0;
    }

    if (1) {
        
        const user = await UserModel.findById('65c568e53350d866ae0ed0c2');

        if (user.playlists.length === 0) {
            res.render('index', {func: "logOut()", link: "#", username: user["username"], songName: "Hello", artist: "Please create a playlist to begin."});
        }
        
        else {
            if (req.session.playlistId == null) {
                req.session.playlistId = user.playlists[0]
            } 

            const playlist = await PlaylistsModel.findById(req.session.playlistId)

            console.log()
            res.render('index', {func: "logOut()", link: "#", username: user["username"], songName: playlist.songs[req.session.index].name, artist: playlist.songs[req.session.index].artist});

        }
        
    }
    else {
        res.render('index', {func: "", link: "./signup", username: "Login", songName: "Welcome!", artist: "Please Login to Get Started."});
    }
}


const getSongQueueHandler = async (req, res) => {
    
    const playlist = await PlaylistsModel.findById(req.session.playlistId)

    if (playlist == null) {
        res.json(null);
    }
    
    else {
        res.json({queuedSongs: playlist.songs, index: req.session.index});
    }
    
};

const getIndexIncrHandler = async (req, res) => {
    const { index } = req.body;
    req.session.index = index;
    res.redirect("/");
    
}

const getIndexDecrHandler = async (req, res) => {
    const { index } = req.body;
    req.session.index = index;
    res.redirect("/");
    
}

module.exports = { homePageHandler, getSongQueueHandler, getIndexIncrHandler, getIndexDecrHandler };


