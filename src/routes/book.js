const express = require('express');
const router = express.Router();
const controller = require('../controllers/book');
const mongoHelper = require('../database/mongoHelper');
const bookModel = require('../database/models/book');
const path = '/books';

router.post(path, controller.createBook);
router.get(path, controller.getAllBooks);
router.get(path + '/:id', controller.getBook);
router.patch(path + '/:id', controller.updateBook);
router.delete(path + '/:id', controller.deleteBook);

module.exports = router;
