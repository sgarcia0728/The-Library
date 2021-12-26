const resolvers = require('./resolvers');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typeDefs = `
    type Query {
        book(id: String!): Book
        books(bookFilter: bookFilter , pagination: pagination): [Book]
    }

    input pagination{
        sort: sort
        pageNumber: Int
        pageSize: Int
    }

    input bookFilter{
        title: String
        author: String
        pages: pages
        status: String        
    }

    input sort{
        title: Int
        author: Int
        pages: Int
        status: Int 
    }

    input pages{
        min: Int
        max: Int
    }

    type Book{
        _id: String
        title: String
        author: String
        pages: Int
        status: String
    }

    type Mutation {
        createBook(book: addBook!): Book
        updateBook(id: ID,book: udpBook!): Book
        deleteBook(id: String): Boolean
    }

    input addBook {
        title: String!
        author: String!
        pages: Int!
        status: String!
    }

    input udpBook {
        title: String
        author: String
        pages: Int
        status: String
    }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
