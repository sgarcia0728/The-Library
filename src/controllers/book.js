const bookService = require('../services/bookService');
const mongoHelper = require('../database/mongoHelper');
const BookModel = require('../database/models/book');
const { async } = require('rxjs');

const getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAll();

    return res.json(books);
  } catch (error) {
    return res.json(error);
  }
};

const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookService.getOne(id);
    return res.json(book);
  } catch (error) {
    return res.json(error);
  }
};

const createBook = async (req, res) => {
  try {
    const book = await bookService.saveBook(req.body);
    return res.json(book);
  } catch (error) {
    console.log;
    return res.json(error);
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('este es el id: ' + id);
    const book = await bookService.updateBook(id, { ...req.body });
    return res.json(book);
  } catch (error) {
    return res.json(error);
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookService.deleteBook(id);
    return res.json(book);
  } catch (error) {
    return res.json(error);
  }
};
/*
const updateBook = async (req, res) => {
  const book = await BookModel.get(mongoHelper);
  const { id } = req.params;
  book
    .findById(id)
    .then((data) => {
      Object.assign(data, req.body);
      data.save();
      res.send({ data });
    })
    .catch((e) => {
      res.status(404).send({ error: 'book is not found!' });
    });
};

const deleteBook = async (req, res) => {
  const book = await bookModel.get(mongoHelper);
  const { id } = req.params;
  book
    .findById(id)
    .then((data) => {
      data.remove();
      res.send({ data: true });
    })
    .catch((error) => {
      res.send({ error });
    });
};


*/
module.exports = {
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
  createBook,
};
