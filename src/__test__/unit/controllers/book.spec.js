require('dotenv').config();
const request = require('supertest');
const app = require('../../../app');
const bookService = require('../../../services/bookService');
const { mongoose } = require('@condor-labs/mongodb')();

const book = {
  _id: 'sdf334d33dd2t555',
  title: 'Captain America',
  author: 'MARVEL',
  pages: 540,
  status: 'AVAILABLE',
  createdAt: '2021-12-15T21:46:29.001Z',
  updatedAt: '2021-12-15T21:46:29.001Z',
};

const bookSave = {
  title: 'Captain America',
  author: 'MARVEL',
  pages: 540,
  status: 'AVAILABLE',
};

const statusList = ['LENT', 'AVAILABLE', 'UNAVAILABLE'];
const bookId = new mongoose.Types.ObjectId().toString();

describe('GET /books', () => {
  it('should return 200 status code', async () => {
    const expected = 200;
    jest.spyOn(bookService, 'getAll').mockImplementation(() => Promise.resolve([]));

    const response = await request(app).get('/v1/books').send();

    expect(response.status).toBe(expected);

    bookService.getAll.mockRestore();
  });

  it('should return an array of books', async () => {
    const expected = [];
    jest.spyOn(bookService, 'getAll').mockImplementation(() => Promise.resolve([]));

    const response = await request(app).get('/v1/books').send();

    expect(response.body).toEqual(expect.arrayContaining(expected));

    bookService.getAll.mockRestore();
  });

  it('should return an array of books with equals properties', async () => {
    const expected = [{ ...book }];
    jest.spyOn(bookService, 'getAll').mockImplementation(() => Promise.resolve([{ ...book }]));

    const response = await request(app).get('/v1/books').send();

    const expectedProperties = Object.keys(expected);

    expect(response.body).toEqual(expect.arrayContaining(expected));
    expect(response.body).toHaveProperty(expectedProperties);

    bookService.getAll.mockRestore();
  });

  it('should return empty array when do not exists any book', async () => {
    const expected = [];
    jest.spyOn(bookService, 'getAll').mockImplementation(() => Promise.resolve(null));

    const response = await request(app).get('/v1/books').send();

    expect(response.body).toEqual(expect.arrayContaining(expected));

    bookService.getAll.mockRestore();
  });
});

describe('GET /books/:id', () => {
  it('should return 404 status code when ID do not exists', async () => {
    const expected = 404;
    jest.spyOn(bookService, 'getOne').mockImplementation(() => Promise.reject({ kind: 'ObjectId' }));

    const response = await request(app).get('/v1/books/wer234').send();

    expect(response.status).toEqual(expected);

    bookService.getOne.mockRestore();
  });

  it('should return 200 status code when ID exists and return an objects with the correct properties', async () => {
    const statusExpected = 200;
    const objectExpected = { ...book };

    jest.spyOn(bookService, 'getOne').mockImplementation(() => Promise.resolve({ ...book }));

    const response = await request(app)
      .get('/v1/books/' + bookId)
      .send();

    expect(response.status).toEqual(statusExpected);
    expect(response.body).toMatchObject({
      _id: expect.any(String),
      title: expect.any(String),
      author: expect.any(String),
      pages: expect.any(Number),
      status: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    bookService.getOne.mockRestore();
  });

  it('should return 500 status code for internal error ', async () => {
    const statusExpected = 500;

    jest.spyOn(bookService, 'getOne').mockImplementation(() => Promise.reject(new Error()));

    const response = await request(app)
      .get('/v1/books/' + bookId)
      .send();

    expect(response.status).toEqual(statusExpected);
    bookService.getOne.mockRestore();
  });
});

describe('POST /books', () => {
  it('Should return 201 status code and object to new document', async () => {
    const statusExpected = 201;
    jest.spyOn(bookService, 'saveBook').mockImplementation(() => {
      //Promise.resolve({ ...book });
      return book;
    });
    /*
    bookService.saveBook = jest.fn(() => {
      //Promise.resolve(book);
      return book;
    });*/

    const response = await request(app).post('/v1/books').send(bookSave);

    expect(response.status).toEqual(statusExpected);
    expect(response.body).toMatchObject({
      _id: expect.any(String),
      title: expect.any(String),
      author: expect.any(String),
      pages: expect.any(Number),
      status: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    expect(response.header['content-type']).toEqual(expect.stringContaining('application/json'));

    bookService.saveBook.mockRestore();
  });

  it('Should return 500 status code ', async () => {
    const statusExpected = 500;
    jest.spyOn(bookService, 'saveBook').mockImplementation(async () => {
      return Promise.reject(new Error());
    });
    /*
    bookService.saveBook = jest.fn(() => {
      //Promise.resolve(book);
      return book;
    });*/

    const response = await request(app).post('/v1/books').send(bookSave);
    expect(response.status).toEqual(statusExpected);
    bookService.saveBook.mockRestore();
  });
});

describe('PATCH /books', () => {
  it('should return 200 sstatus code when send id valid and return object with correct properties', async () => {
    const statusExpected = 200;
    jest.spyOn(bookService, 'updateBook').mockImplementation(async () => {
      return Promise.resolve(book);
    });

    const response = await request(app)
      .patch('/v1/books/' + bookId)
      .send();

    expect(response.status).toEqual(statusExpected);
    expect(response.body).toMatchObject({
      _id: expect.any(String),
      title: expect.any(String),
      author: expect.any(String),
      pages: expect.any(Number),
      status: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    bookService.updateBook.mockRestore();
  });

  it('should return 404 status code when id do not exists ', async () => {
    const statusExpected = 404;
    jest.spyOn(bookService, 'updateBook').mockImplementation(async () => Promise.reject({ kind: 'ObjectId' }));

    const response = await request(app)
      .patch('/v1/books/' + bookId)
      .send();

    expect(response.status).toEqual(statusExpected);

    bookService.updateBook.mockRestore();
  });

  it('should return 500 sstatus code when id do not exists ', async () => {
    const statusExpected = 500;
    jest.spyOn(bookService, 'updateBook').mockImplementation(async () => Promise.reject(new Error()));

    const response = await request(app)
      .patch('/v1/books/' + bookId)
      .send();

    expect(response.status).toEqual(statusExpected);

    bookService.updateBook.mockRestore();
  });
});

describe('DELETE /books', () => {
  it('should return 200 status code when delete sucessfully', async () => {
    const statusExpected = 200;
    jest.spyOn(bookService, 'deleteBook').mockImplementation(async () => {
      return true;
    });

    const response = await request(app)
      .delete('/v1/books/' + bookId)
      .send();

    expect(response.status).toEqual(statusExpected);
    expect(response.body).toBe(true);

    bookService.deleteBook.mockRestore();
  });

  it('should return 500 status code', async () => {
    const statusExpected = 500;
    jest.spyOn(bookService, 'deleteBook').mockImplementation(async () => {
      return Promise.reject(new Error());
    });

    const response = await request(app)
      .delete('/v1/books/' + bookId)
      .send();

    expect(response.status).toEqual(statusExpected);

    bookService.deleteBook.mockRestore();
  });

  it('should return 404 status code', async () => {
    const statusExpected = 404;
    jest.spyOn(bookService, 'deleteBook').mockImplementation(async () => {
      return Promise.reject({ kind: 'ObjectId', value: '123asd' });
    });

    const response = await request(app)
      .delete('/v1/books/' + bookId)
      .send();

    expect(response.status).toEqual(statusExpected);

    bookService.deleteBook.mockRestore();
  });
});
