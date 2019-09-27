const { User } = require("../models");

class SessionControle {
  async create(req, res) {
    return res.render("auth/signin");
  }

  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log("user not found");
      return res.redirect("/");
    }
    if (!(await user.checkPassword(password))) {
      console.log("incorrect password");
      return res.redirect("/");
    }
    //se o email e senha estiver ok
    //redis para salvar a sessão ou banco nosql
    req.session.user = user;

    return res.redirect("/app/dashboard");
  }
}

module.exports = new SessionControle();
