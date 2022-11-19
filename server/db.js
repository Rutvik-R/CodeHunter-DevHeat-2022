const { MongoClient } = require('mongodb')

const link = 'mongodb+srv://devheathackathon:devheathackathon@cluster0.dbx1oxr.mongodb.net/CodeHunter-DevHeat-2022?retryWrites=true'

let dbConnection

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(link)
            .then(client => {
                dbConnection = client.db()
                return cb()
            })
            .catch(err => {
                console.log(err)
                return cb(err)
            })
    },
    getDb: () => dbConnection
}

