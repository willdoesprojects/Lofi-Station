const UserModel = require("../models/Users");
const DJModel = require("../models/Playlists");

const homePageHandler = async (req, res) => {
    if (!req.session.index) {
        req.session.index = 0;
    }

    if (req.session.isAuth) {
        
        const user = await UserModel.findById(req.session.userId);

        if (user.playlists.length === 0) {
            res.render('index', {func: "logOut()", link: "#", username: user["username"], songName: "Hello", artist: "Please create a playlist to begin.x`x`"});
        }
        
        else {
            res.render('index', {func: "logOut()", link: "#", username: user["username"], songName: "song test", artist: "artist test"});

        }
        
    }
    else {
        res.render('index', {func: "", link: "./signup", username: "Login", songName: "Welcome!", artist: "Please Login to Get Started."});
    }
}


const getSongQueueHandler = async (req, res) => {
    // const user = await UserModel.findById(req.session.userId);

    const userListener = await DJModel.findById(req.session.playlistId);

    if (userListener == null) {
        res.json(null);
    }
    
    else {
        res.json({queuedSongs: userListener.songs, index: req.session.index});
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


