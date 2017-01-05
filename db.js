const Sequelize = require('sequelize');

const conn = new Sequelize(
  'graphql',
  'postgres',
  'postgres', {
    dialect: 'postgres',
    host: 'localhost',
  });

const Person = conn.define('person', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
  },
});

const Post = conn.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Person.hasMany(Post);
Post.belongsTo(Person);

module.exports = conn;

