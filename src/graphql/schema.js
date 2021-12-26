const resolvers = require('./resolvers');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typeDefs = `
    type Query {
        book(id: String!): Book
        books: [Book]
    }

    type Book{
        id: ID
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
