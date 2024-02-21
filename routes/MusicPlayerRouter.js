const express = require("express");
const router = express.Router();
const musicPlayerController = require("../controllers/musicPlayerController");

router.get("/", musicPlayerController.homePageHandler);

router.get("/getsongqueue", musicPlayerController.getSongQueueHandler);

router.post("/incrindex", musicPlayerController.getIndexIncrHandler);

router.post("/decrindex", musicPlayerController.getIndexDecrHandler);

router.get("/getplaylists", musicPlayerController.getPlaylistsHandler);

router.post("/setplaylist", musicPlayerController.setNewPlaylist);


module.exports = router;