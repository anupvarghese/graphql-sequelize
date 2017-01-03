/* eslint no-use-before-define: 0 */
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');
const db = require('./db');

const Post = new GraphQLObjectType({
  name: 'Post',
  description: 'Blog Post',
  fields: () => ({
    title: {
      type: GraphQLString,
      resolve: post => post.title,
    },
    content: {
      type: GraphQLString,
      resolve: post => post.content,
    },
    person: {
      type: Person,
      resolve: post => post.getPerson(),
    },
  }),
});

const Person = new GraphQLObjectType({
  name: 'Person',
  description: 'Person who wrote the blog',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: person => person.id,
    },
    firstName: {
      type: GraphQLString,
      resolve: person => person.firstName,
    },
    lastName: {
      type: GraphQLString,
      resolve: person => person.lastName,
    },
    email: {
      type: GraphQLString,
      resolve: person => person.email,
    },
    posts: {
      type: new GraphQLList(Post),
      resolve: person => person.getPosts(),
    },
  }),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',
  fields: () => ({
    people: {
      type: new GraphQLList(Person),
      args: {
        id: {
          type: GraphQLInt,
        },
        email: {
          type: GraphQLString,
        },
      },
      resolve: (root, args) => db.models.person.findAll({ where: args }),
    },
    posts: {
      type: new GraphQLList(Post),
      resolve: (root, args) => db.models.post.findAll({ where: args }),
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  description: 'Functions to update/create',
  fields: () => ({
    addPerson: {
      type: Person,
      args: {
        firstName: {
          type: new GraphQLNonNull(GraphQLString),
        },
        lastName: {
          type: new GraphQLNonNull(GraphQLString),
        },
        email: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (source, args) => db.models.person.create({
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
      }),
    },
  }),
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

module.exports = Schema;
