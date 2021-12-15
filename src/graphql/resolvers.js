const controller = require('../controllers/book');
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
      return await ({ _id, title, author, pages, status, createdAt, updatedAt } = newBook);
    },
    async updateBook(_, { id, book }) {
      const updatedBook = await bookService.updateBook(id, { ...book });
      return await updatedBook;
    },
    async deleteBook(_, { id }) {
      const deletedBook = await bookService.deleteBook(id);
      return true;
    },
  },
};

module.exports = resolvers;
