const express = require("express");
const router = express.Router();
const acctAuthController = require("../controllers/acctAuthController");

router.get("/signup", (req, res) => {
    let error = "";

    if (req.session.error) {
        error = "Invalid username or password.";
    }
    res.render('signup', { error : error});
})

router.post("/signup", acctAuthController.signUpHandler);

router.post("/login", acctAuthController.loginHandler);


module.exports = router;