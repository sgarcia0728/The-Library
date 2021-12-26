const bookService = require('../services/bookService');
const resolvers = {
  Query: {
    async books(root, { bookFilter, pagination }) {
      const params = { ...bookFilter, ...pagination };
      return await bookService.getAll(params);
    },
    async book(root, { id }) {
      return await bookService.getOne(id);
    },
  },

  Mutation: {
    async createBook(_, { book }) {
      return await bookService.saveBook(book);
    },
    async updateBook(_, { id, book }) {
      return await bookService.updateBook(id, { ...book });
    },
    async deleteBook(_, { id }) {
      await bookService.deleteBook(id);
      return true;
    },
  },
};

module.exports = resolvers;
