const express = require('express')
const { connectToDb, getDb } = require('./db')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())

let total_user;

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

app.get('/', (req, res) => {
    res.status(200).send("Server started !!!!!!!")
})

app.get('/user/show', (req, res) => {

    const page = req.query.p || 0

    const datapage = 5

    let data = []

    db.collection('users')
        .find()
        .skip(page * datapage)
        .limit(datapage)
        .forEach(a => data.push(a))
        .then(() => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).send("I do't Know")
        })

})

app.get('/user/data_all', (req, res) => {

    let data = []

    db.collection('users')
        .find()
        .forEach(a => data.push(a))
        .then(() => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).send("I do't Know")
        })

})

app.post('/user/add', (req, res) => {
    let data = req.body
    console.log(data)

    db.collection('users')
        .findOne({ email: data["email"] })
        .then(doc => {
            if (doc != null) {
                res.status(400).send("Already exist")
            }
            else {
                db.collection('users')
                    .insertOne(data)
                    .then(result => {
                        res.status(200).json(result)
                    })
                    .catch(err => {
                        res.status(404).json(err)
                    })
            }
        })


})


app.post('/user', (req, res) => {

    db.collection('users')
        .findOne(req.body)
        .then(a => {
            res.status(200).json(a)
        })
        .catch(err => {
            res.status(404).json(err)
        })

})

app.delete('/user/delete', (req, res) => {


    db.collection('users')
        .findOne(req.body)
        .then(a => {
            if (a == null) {
                res.status(400).send("Not Found")
            }
            else {
                db.collection('users')
                    .deleteOne(req.body)
                    .then(result => {
                        res.status(200).json(result)
                    })
                    .catch(err => {
                        res.status(404).json(err)
                    })
            }
        })
})

