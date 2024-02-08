const express = require("express");
const router = express.Router();
const songsController = require("../controllers/songsController");

router.get("/getfavoritesongs", songsController.favSongsListHandler);

router.post("/addsongtofavorites", songsController.addFavSongHandler);

router.post("/removefavoritesong", songsController.removeFavSongHandler);

router.get("/songslist", songsController.getSongs);

router.post("/setqueue", songsController.setQueueHandler);

router.post("/djaddqueue", songsController.addDJQueueHandler);

router.post("/removedj", songsController.removeDJHandler);

router.get("/getdjs", songsController.DJRetrieveHandler);

module.exports = router;