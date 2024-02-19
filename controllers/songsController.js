const UserModel = require("../models/Users");
const PlaylistModel = require("../models/Playlists");
const SongsModel = require("../models/Songs");
const { redirect } = require("express/lib/response");

const getSongs = async (req, res) => {
    const songs = await SongsModel.find();

    res.json({ songsList: songs });
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

}

const removeSongHandler = async (req, res) => {
    const { song } = req.body;
    const playlist = await PlaylistModel.findById(req.session.currPlaylist);
    
    playlist.songs = playlist.songs.filter(item => item._id !== song._id);
    
    await playlist.save();
}

const removePlaylistHandler = async (req, res) => {
    const { playlist_id } = req.body;
    const user = await UserModel.findById('65c568e53350d866ae0ed0c2');

    user.playlists = user.playlists.filter(item => item != playlist_id);

    await user.save();
    await PlaylistModel.deleteOne( {_id: playlist_id });
}   

module.exports = { removePlaylistHandler, removeSongHandler, addSongHandler, setCurrPlaylistHandler, getPlaylistsHandler, createPlaylistHandler, getSongs };