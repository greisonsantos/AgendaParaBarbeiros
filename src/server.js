const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const flash = require("connect-flash");

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV != "production"; //development or test or production

    //ateção para ordem
    this.middlewares();
    this.views();
    this.routes();
  }

  // para lidar com formularios
  middlewares() {
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(flash());
    this.express.use(
      session({
        name: "root",
        secret: "MyAppSecret",
        resave: true,
        store: new FileStore({
          path: path.resolve(__dirname, "..", "tmp", "sessios")
        }),
        saveUninitialized: true
      })
    );
  }

  views() {
    nunjucks.configure(path.resolve(__dirname, "app", "views"), {
      watch: this.isDev,
      express: this.express,
      autoescape: true
    });

    //para acessar arquivos na pasta public independente da plataforma
    this.express.use(express.static(path.resolve(__dirname, "public")));
    //engine de views
    this.express.set("view engine", "njk");
  }

  routes() {
    //confi arquivos de rotas
    this.express.use(require("./routes"));
  }
}

module.exports = new App().express;
