const express = require('express');
const graphQlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(express.json());

app.use(
  '/api',
  graphQlHttp({
    schema: buildSchema(`
    type RootQuery {
      events: [String!]!
    }

    type RootMutation {
      createEvent(name: String): String
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
    rootValue: {}
  })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Listening on port ${PORT}`));
