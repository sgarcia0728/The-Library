const bookService = require('../services/bookService');
const bookModel = require('../models/book');
require('dotenv').config();
const getBooks = async (req, res) => {
  try {
    const books = await bookService.getAll(req.body);

    return res.json(books);
  } catch (err) {
    console.log(err);
    if (err instanceof SyntaxError) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(500).json({ error: 'Server error' });
  }
};

const getBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await bookService.getOne(id, bookModel);
    return res.json(book);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ error: `Id ${err.value} is not found` });
    }

    return res.status(500).json(err);
  }
};

const createBook = async (req, res) => {
  try {
    const newBook = await bookService.saveBook(req.body);
    return res.status(201).json(newBook);
  } catch (err) {
    const error = err.details
      ? res.status(400).json({ error: err.details[0].message })
      : err.message.includes('validation failed')
      ? res.status(400).json({ error: err.message })
      : res.status(500).json({ error: 'Error in server' });

    return error;
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookService.updateBook(id, { ...req.body });
    return res.json(book);
  } catch (err) {
    let error;
    if (err.kind === 'ObjectId') {
      error = res.status(404).json({ error: `Id ${err.value} is not found` });
    } else if (err.codeName === 'DuplicateKey') {
      const key = Object.keys(err.keyValue)[0];
      const valueKey = err.keyValue[key];
      error = res.status(400).json({ error: `Duplicate Key, "${key} : ${valueKey}" ` });
    } else if (err.details) {
      error = res.status(400).json({ error: err.details[0].message });
    } else {
      error = res.status(500).json({ error: 'Error in Server' });
    }

    return error;
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookService.deleteBook(id);
    return res.json(book);
  } catch (err) {
    let error;
    if (err.kind === 'ObjectId') {
      error = res.status(404).json({ error: `Id ${err.value} is not found` });
    } else {
      error = res.status(500).json({ error: 'Error in server' });
    }

    return error;
  }
};

module.exports = {
  getBooks,
  getBook,
  updateBook,
  deleteBook,
  createBook,
};
