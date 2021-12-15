const mongoHelper = require('../database/mongoHelper');
const BookModel = require('../database/models/book');
const { async } = require('rxjs');

const getAll = async () => {
  const bookModel = await BookModel.get(mongoHelper);
  const books = await bookModel.find();
  return books;
};

const getOne = async (id) => {
  const bookModel = await BookModel.get(mongoHelper);
  const book = await bookModel.findById(id).lean();
  return book;
};

const saveBook = async (bookInfo) => {
  const data = { ...bookInfo };
  const bookModel = await BookModel.get(mongoHelper);
  return await bookModel.create(data);
};

const updateBook = async (id, bookInfo) => {
  console.log('id en service:' + id);
  const bookModel = await BookModel.get(mongoHelper);
  const data = await bookModel.findOneAndUpdate({ _id: id }, { ...bookInfo }, { new: true });
  console.log(data);
  return data;
};

const deleteBook = async (id) => {
  const bookModel = await BookModel.get(mongoHelper);
  const data = await bookModel.findById(id);
  const { ...deletedBook } = await data.remove();
  return true;
};

module.exports = {
  getAll,
  getOne,
  saveBook,
  updateBook,
  deleteBook,
};
