require("dotenv").config()
const express = require("express")
const cors = require("cors")
const { graphqlHTTP } = require("express-graphql")
const mongoose = require("mongoose")

const schema = require("./schema/schema")

const app = express()
app.use(cors())

mongoose
  .connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started on the port ${process.env.PORT}`)
    })
  })
  .catch((error) => console.error(error))

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
)
