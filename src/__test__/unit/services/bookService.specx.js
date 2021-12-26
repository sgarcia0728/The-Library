require('dotenv').config();
const bookService = require('../../../services/bookService');
const BookModel = require('../../../models/book');

describe('bookService', () => {
  describe('bookService,getAll', () => {
    it('should return all books', async () => {
      const expected = [];

      jest.spyOn(BookModel, 'get').mockImplementation(() => {
        return Promise.resolve({
          find: () => {
            sort: () => {};
          },
        });
      });

      const books = await bookService.getAll({});

      expect(books).toEqual(expect.arrayContaining(expected));
    });
  });
});
