const graphql = require("graphql")
const _ = require("lodash")
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = graphql

//dummy data
const books = [
  { name: "A Game of Thrones", genre: "Fantasy", id: "1", authorId: "1" },
  {
    name: "The song of Ice and Fire",
    genre: "Fantasy",
    id: "2",
    authorId: "1",
  },
  { name: "Harry Potter", genre: "Fantasy", id: "3", authorId: "2" },
  { name: "Fantastic Beast", genre: "Fantasy", id: "4", authorId: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "5", authorId: "3" },
  { name: "The Winds of Winter", genre: "Fantasy", id: "6", authorId: "1" },
  { name: "A Dance with Dragons", genre: "Fantasy", id: "7", authorId: "1" },
  { name: "Fire and Blood", genre: "Fantasy", id: "8", authorId: "1" },
  { name: "The Ickabog", genre: "Fairy tale", id: "8", authorId: "2" },
  {
    name: "The Tales of Beedle the Bard ",
    genre: "Fantasy",
    id: "9",
    authorId: "2",
  },
]

const authors = [
  { name: "George RR Martin", id: "1", age: 64 },
  { name: "JK Rowling", id: "2", age: 54 },
  { name: "Terry Pratchett", id: "3", age: 64 },
]

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId })
      },
    },
  }),
})

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id })
      },
    },
  }),
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db/other sources
        return _.find(books, { id: args.id })
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id })
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        return books
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return authors
      },
    },
  },
})

module.exports = new GraphQLSchema({ query: RootQuery })
