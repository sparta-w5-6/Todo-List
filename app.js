const express = require("express")
const app = express()
require("dotenv").config()
const port = process.env.PORT || 3000

const router = require("./routes")

app.use(express.json())

app.use("/api", router)

app.listen(port, () => {
  console.log(port, " server is opened")
})

module.exports = app

// .env
