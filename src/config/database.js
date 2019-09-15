//dialect qual banco
//no caso postgres  yarn add pg
// caso mysql  yarnn add mysql2

module.expots = {
  dialect: "postgres",
  host: "127.0.0.1",
  username: "",
  password: " ",
  database: " ",
  operatorAliases: false,
  define: {
    timestamps: true,
    underscored: true, //  camocase with underline in name campos
    underscoredAll: true
  }
};
