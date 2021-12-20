const bookService = require('../services/bookService');
const resolvers = {
  Query: {
    async books() {
      return await bookService.getAll();
    },
    async book(root, { id }) {
      return await bookService.getOne(id);
    },
  },

  Mutation: {
    async createBook(_, { book }) {
      const newBook = await bookService.saveBook(book);
      const res = await ({ _id, title, author, pages, status, createdAt, updatedAt } = newBook);
      return res;
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
