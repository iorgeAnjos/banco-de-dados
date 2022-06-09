const routes = require("express").Router();
const FilmController = require("../controllers/FilmController");

routes.get("/", FilmController.getAll);
routes.get("/filmes/:id", FilmController.getById);
//rota para pegar o filme especifico
routes.get("/criar", FilmController.criar);
routes.post("/criacao", FilmController.criacao);
routes.get("/editar/:id", FilmController.editar1);
routes.post("/editar/:id", FilmController.editar);
routes.get("/deletar/:id", FilmController.deletar);
module.exports = routes;
