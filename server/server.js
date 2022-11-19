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


app.get('/user/show' , (req , res) => {

    const page = req.query.p || 0

    const datapage = 5 

    let data = []

    db.collection('users')
    .find()
    .skip(page*datapage)
    .limit(datapage)
    .forEach(a => data.push(a))
    .then( () => {
        res.status(200).json(data)
    })
    .catch(err => {
        console.log(err)
        res.status(404).send("I do't Know")
    })

})