const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const app = express();
const isAuth = require("./middleware/is-auth");

app.use(bodyParser.json());

const graphqlSchema = require("./graphql/schema/index");
const graphqlResolver = require("./graphql/resolvers/index");

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  })
);

url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.0u2rn.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
mongoose
  .connect(url)
  .then(() => {
    console.log("We are connected to the DB");
    app.listen(3000);
  })
  .catch((err) => {
    console.log("Hello World");
    console.log(err);
  });
