const express = require('express');
const graphHttp = require('express-graphql');
const schema = require('./schema.js');

const PORT = 3000;

const app = express();

app.use('/graphql', graphHttp({
  schema,
  pretty: true,
  graphiql: true,
}));

app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});
