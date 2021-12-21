const mongoHelper = require('../helpers/mongoHelper');
const BookModel = require('../models/book');
const redisHelper = require('../helpers/redisHelper');
const validateData = require('../helpers/validateDataHelper');

const getAll = async () => {
  const bookModel = await BookModel.get(mongoHelper);
  const books = await bookModel.find();
  return books;
};

const getOne = async (id) => {
  const bookModel = await BookModel.get(mongoHelper);
  const res = await redisHelper.redisGet(id);
  if (res) {
    return res;
  }

  const book = await bookModel.findById(id).lean();
  await redisHelper.redisSet(id, JSON.stringify(book));
  return book;
};

const saveBook = async (bookInfo) => {
  const data = { ...bookInfo };
  await validateData.validateBook(data);
  data.status = data.status.toUpperCase();
  const bookModel = await BookModel.get(mongoHelper);
  const res = await bookModel.create(data);
  return res;
};

const updateBook = async (id, bookInfo) => {
  const data = { ...bookInfo };
  //await validateData.validateBook(data);

  data.status = data?.status?.toUpperCase();

  const bookModel = await BookModel.get(mongoHelper);
  const foundCache = await redisHelper.redisGet(id);
  const res = await bookModel.findOneAndUpdate({ _id: id }, { $set: { ...data } }, { new: true });
  if (foundCache) {
    await redisHelper.redisDel(id);
    await redisHelper.redisSet(id, JSON.stringify(res));
  }
  return res;
};

const deleteBook = async (id) => {
  const bookModel = await BookModel.get(mongoHelper);
  const data = await bookModel.findById(id);
  const res = await redisHelper.redisGet(id);
  await data.remove();
  if (res) {
    await redisHelper.redisDel(id);
  }
  return true;
};

module.exports = {
  getAll,
  getOne,
  saveBook,
  updateBook,
  deleteBook,
};
