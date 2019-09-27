module.exports = (req, res, next) => {
  if (req.session && !req.session.user) {
    return next();
  }

  return res.redirect("app/dashboard");
};

//se não exister o user manda pro login
//se exister redireciona na pagina princiapl sem passar pelo login
