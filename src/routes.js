const express = require("express");
const routes = express.Router();

// const UserController = require("./app/controllers/UserController");


routes.get("/",(req, res)=>{
  res.render("auth/singup");
});


// routes.post("/signup", UserController.store);

module.exports = routes;
