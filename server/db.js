const { MongoClient } = require('mongodb')

// const link = 'mongodb+srv://pizza_hunt:pizzahunt@cluster0.dugatei.mongodb.net/pizzahunt?retryWrites=true&w=majority';
const link = 'mongodb+srv://devheathackathon:devheathackathon@cluster0.dbx1oxr.mongodb.net/test'

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
