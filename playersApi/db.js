
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://rulik:merch1976@clusterfirst.ymyif.gcp.mongodb.net/players?retryWrites=true&w=majority";
const connection = new MongoClient(uri, { useNewUrlParser: true });

connection.connect(err => {
    if (err) throw err;
    console.log("mongo connected");
})

module.exports = connection;