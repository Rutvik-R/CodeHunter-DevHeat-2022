const express = require('express')
const { connectToDb, getDb } = require('./db')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())


let db

connectToDb((err) => {
  if (!err) {
    app.listen(5000, () => {
      console.log("started on 5000 !!!")

    })
    db = getDb()
  }
  else {
    console.log(err)
  }
})
