const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri, { useNewUrlParser: true });

//client.connect(error => {
//        if (error) {
//            return res.status(500).send({ status: "failed", message: "Error connecting to DB" });
//        }
//        const collection = client.db("sh").collection("sh_clients_lopd");
//        collection.insertOne(data, function (err, dbRes) {
//            if (err) {
//                return res.status(500).send({ status: "failed", message: "Error inserting data to DB" });
//            }
//            client.close();
//            res.status(200).send({ status: "recieved", message: "Data recieved and inserted" });
//        });
//    });
//

module.exports = client;