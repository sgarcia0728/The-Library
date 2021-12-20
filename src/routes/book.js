const express = require('express');
const router = express.Router();
const controller = require('../controllers/book');
const path = '/books';

router.post(path, controller.createBook);
router.get(path, controller.getAllBooks);
router.get(path.concat('/:id'), controller.getBook);
router.patch(path.concat('/:id'), controller.updateBook);
router.delete(path.concat('/:id'), controller.deleteBook);

module.exports = router;
