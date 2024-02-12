const UserModel = require("../models/Users");
const PlaylistModel = require("../models/Playlists");
const SongsModel = require("../models/Songs");
const { redirect } = require("express/lib/response");

const favSongsListHandler = async (req, res) => {
    const user = await ListenersModel.findOne({userId: req.session.userId});
    res.json(user);
}

const addFavSongHandler = async (req, res) => {
    const { song } = req.body;

    const user = await ListenersModel.findOne({userId: req.session.userId});

    user.favoriteSongs.push(song);

    await user.save();
}

const removeFavSongHandler = async (req, res) => {
    const { song } = req.body;

    const user = await ListenersModel.findOne({userId: req.session.userId});
    user.favoriteSongs.remove(song);
    user.queuedSongs.remove(song);

    await user.save();
}

const getSongs = async (req, res) => {
    const songs = await SongsModel.find();

    res.json({ songsList: songs });
}

const addDJQueueHandler = async (req, res) => {
    const { dj } = req.body;
    const user = await UserModel.findById(req.session.userId);


    if (user.playlistId == null) {
        user.playlistId = dj._id;
        req.session.playlistId = dj._id;
        req.session.save();
    }

    const listener = await ListenersModel.findOne({userId: req.session.userId});
    listener.queuedDJs.push(dj);

    await listener.save();

    await user.save();

}

const removeDJHandler = async (req, res) => {
    const { dj } = req.body;
    
    const user = await UserModel.findById(req.session.userId);
    const listener = await ListenersModel.findOne({userId: req.session.userId});

    if (user.playlistId == dj._id) {
        user.playlistId = null;
        req.session.playlistId = null;

        await user.save();
        await req.session.save();
    }

    listener.queuedDJs.remove(dj);
    await listener.save();

}

const DJRetrieveHandler = async (req, res) => {
    const listener = await ListenersModel.findOne({userId: req.session.userId});

    res.json(listener.queuedDJs);
}

const setQueueHandler = async (req, res) => {
    const user = await UserModel.findById(req.session.userId);

    await UserModel.findByIdAndUpdate(req.session.userId, { $set: { queuedSongs: user.favoriteSongs } });

    await user.save();
}

const createPlaylistHandler = async (req, res) => {
    const user = await UserModel.findById('65c568e53350d866ae0ed0c2');
    const { name } = req.body;
    
    const newPlaylist = new PlaylistModel({
        name: name,
    });

    await newPlaylist.save();
    
    user.playlists.push(newPlaylist._id);
   
    await user.save();

    res.redirect("./preferences")
}

const getPlaylistsHandler = async (req, res) => {
    let playlists = [];
    const user = await UserModel.findById('65c568e53350d866ae0ed0c2');

    for (let i = 0; i < user.playlists.length; i++) {
        const playlist = await PlaylistModel.findById(user.playlists[i]);
        playlists.push(playlist)
    }
    
    res.json({ playlists: playlists, id: req.session.currPlaylist });
}

const setCurrPlaylistHandler = async (req, res) => {
    const { playlist_id } = req.body;
    req.session.currPlaylist = playlist_id;

    res.redirect("./preferences")
}

const addSongHandler = async (req, res) => {
    const { song } = req.body;
    const playlist = await PlaylistModel.findById(req.session.currPlaylist);

    playlist.songs.push(song);

    await playlist.save();

    res.redirect("./preferences")
}

module.exports = { addSongHandler, setCurrPlaylistHandler, getPlaylistsHandler, createPlaylistHandler, favSongsListHandler, addFavSongHandler, removeFavSongHandler, getSongs, setQueueHandler, addDJQueueHandler, removeDJHandler, DJRetrieveHandler };