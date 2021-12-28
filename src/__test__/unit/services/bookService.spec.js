const bookService = require('../../../services/bookService');
const redisHelper = require('../../../helpers/redisHelper');
const BookModel = require('../../../models/book');

const { mongoose } = require('@condor-labs/mongodb')();
require('dotenv').config();
const book = {
  _id: 'sdf334d33dd2t555',
  title: 'Captain America',
  author: 'MARVEL',
  pages: 540,
  status: 'AVAILABLE',
  createdAt: '2021-12-15T21:46:29.001Z',
  updatedAt: '2021-12-15T21:46:29.001Z',
};

const bookId = new mongoose.Types.ObjectId().toString();

describe('bookService getAll', () => {
  it('should return array to book objects', async () => {
    const expected = [book];

    jest.spyOn(BookModel, 'get').mockImplementation(() => ({
      find: jest.fn(() => ({
        sort: () => ({ skip: () => ({ limit: () => ({ lean: () => Promise.resolve([book]) }) }) }),
      })),
    }));

    const response = await bookService.getAll(bookId);

    expect(response).toEqual(expected);
    BookModel.get.mockRestore();
  });
});

describe('bookService getOne', () => {
  it('should return one book object', async () => {
    const expected = book;

    jest.spyOn(BookModel, 'get').mockImplementation(() => ({
      findById: jest.fn(() => ({ lean: () => Promise.resolve(book) })),
    }));

    jest.spyOn(redisHelper, 'redisGet').mockImplementation(async () => {
      return Promise.resolve(null);
    });

    jest.spyOn(redisHelper, 'redisSet').mockImplementation(async () => {
      return Promise.resolve(null);
    });

    const response = await bookService.getOne(bookId);

    expect(response).toEqual(expected);

    redisHelper.redisGet.mockRestore();
    redisHelper.redisSet.mockRestore();
    BookModel.get.mockRestore();
  });
});
