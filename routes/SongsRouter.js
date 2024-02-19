const express = require("express");
const router = express.Router();
const songsController = require("../controllers/songsController");

router.get("/songslist", songsController.getSongs);

router.post("/addplaylist", songsController.createPlaylistHandler);

router.get("/getplaylists", songsController.getPlaylistsHandler);

router.post("/setcurrplaylist", songsController.setCurrPlaylistHandler);

router.post("/addsong", songsController.addSongHandler);

router.post("/removesong", songsController.removeSongHandler);

router.post("/removeplaylist", songsController.removePlaylistHandler);

module.exports = router;