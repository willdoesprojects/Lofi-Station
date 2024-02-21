const UserModel = require("../models/Users");
const PlaylistsModel = require("../models/Playlists");

const homePageHandler = async (req, res) => {
    if (!req.session.index) {
        req.session.index = 0;
    }

    if (req.session.isAuth) {
        
        const user = await UserModel.findById(req.session.userId);

        if (user.playlists.length === 0) {
            res.render('index', {func: "logOut()", link: "#", username: user["username"], songName: "Hello", artist: "Please create a playlist to begin."});
        }
        
        else {
            if (req.session.currPlaylist == null) {
                req.session.currPlaylist = user.playlists[0]
            } 

            const playlist = await PlaylistsModel.findById(req.session.currPlaylist);
            if (playlist.songs.length == 0) {
                res.render('index', {func: "logOut()", link: "#", username: user["username"], songName: "Hello", artist: "Please add songs to the playlist."});
            }

            else {
                res.render('index', {func: "logOut()", link: "#", username: user["username"], songName: playlist.songs[req.session.index].name, artist: playlist.songs[req.session.index].artist});
            }

        }
        
    }
    else {
        res.render('index', {func: "", link: "./signup", username: "Login", songName: "Welcome!", artist: "Please Login to Get Started."});
    }
}


const getSongQueueHandler = async (req, res) => {
    const playlist = await PlaylistsModel.findById(req.session.currPlaylist)

    if (playlist == null) {
        res.json(null);
    }
    
    else {
        res.json({queuedSongs: playlist.songs, index: req.session.index});
    }
    
};

const getPlaylistsHandler = async (req, res) => {
    const user = await UserModel.findById(req.session.userId);

    if (user == null) {
        res.json(null);
    }

    else {
        let playlists = []
        
        for (let i = 0; i < user.playlists.length; i++) {
            const playlist = await PlaylistsModel.findById(user.playlists[i]);
            playlists.push(playlist);
        }

        res.json({ playlists: playlists });
    }

    
}

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

const setNewPlaylist = async (req, res) => {
    const { playlistId } = req.body;
    req.session.currPlaylist = playlistId;
    res.redirect("/")
}
module.exports = { setNewPlaylist, getPlaylistsHandler, homePageHandler, getSongQueueHandler, getIndexIncrHandler, getIndexDecrHandler };


