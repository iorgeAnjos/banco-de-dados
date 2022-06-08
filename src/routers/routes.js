const routes = require('express').Router();
const FilmController = require('../controllers/FilmController')

routes.get('/', FilmController.getAll);

module.exports = routes;