require('dotenv').config();
const BookModel = require('../models/book');
const helperMongo = require('../helpers/mongoHelper');
const redisHelper = require('../helpers/redisHelper');
const validateData = require('../helpers/validateDataHelper');

const getAll = async (params) => {
  let sort = params.sort || { title: 1 };
  let pages = params.pages || { min: 0, max: Infinity };
  const pageNumber = parseInt(params.pageNumber) || 1;
  const pageSize = parseInt(params.pageSize) || 5;

  //const clientConnect = helperMongo.clients[process.env.MONGODB_CONNECTION_NAME];
  //console.log(clientConnect)
  //const BookModel = await clientConnect.model(bookModel);
  //console.log(BookModel.find());
  const bookModel = await BookModel.get();

  sort = typeof sort !== 'object' ? JSON.parse(sort) : sort;
  pages = typeof pages !== 'object' ? JSON.parse(pages) : pages;

  let books = await bookModel
    .find({
      title: { $regex: params.title || '', $options: 'i' },
      author: { $regex: params.author || '', $options: 'i' },
      status: { $regex: params.status || '', $options: 'i' },
      pages: { $gte: pages.min || 0, $lte: pages.max || Infinity },
    })
    .sort(sort)
    .skip(pageNumber * pageSize - pageSize)
    .limit(pageSize)
    .lean();

  return books;
};

const getOne = async (id) => {
  const bookModel = await BookModel.get();
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
  await validateData.validateSaveBook(data);
  data.status = data.status.toUpperCase();
  const bookModel = await BookModel.get();
  const res = await bookModel.create(data);
  return res;
};

const updateBook = async (id, bookInfo) => {
  const data = { ...bookInfo };
  await validateData.validateUpdateBook(data);
  if (data.status) {
    data.status = data.status.toUpperCase();
  }

  const bookModel = await BookModel.get();
  const foundCache = await redisHelper.redisGet(id);
  const res = await bookModel.findOneAndUpdate({ _id: id }, { $set: { ...data } }, { new: true });
  if (foundCache) {
    await redisHelper.redisDel(id);
    await redisHelper.redisSet(id, JSON.stringify(res));
  }
  return res;
};

const deleteBook = async (id) => {
  const bookModel = await BookModel.get();
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
