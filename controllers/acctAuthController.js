const UserModel = require("../models/Users");

const signUpHandler = async (req, res) => {
    const { username, email, password } = req.body;

    user = new UserModel({
        username,
        email,
        password,
    });

    await user.save();

    req.session.userId = user._id;
    req.session.isAuth = true;
    res.redirect("./");
};

const loginHandler = async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (!user) {
        req.session.error = true;
        res.redirect("/signup")
        return;
    }

    if (password !== user.password) {
        req.session.error = true;
        res.redirect("/signup")
        return;
    }

    req.session.userId = user._id;
    req.session.isAuth = true;

    
    res.redirect('/');
    
}

module.exports = { signUpHandler, loginHandler };