const { error } = require("console");
const express = require("express");
const fs = require('fs');
const port = 8080;
const host = '0.0.0.0'
// const host = '192.168.0.12'
//const host = '172.30.16.1'
const routes = require("./routes")
const app = express();
//app.use(express.static("public"));
//app.use(express.json());


app.use("/", routes);

    // app.get('/', (req, res) => {
    //     res.status(200).send('<h1>Hola, pagina 1</h1>')
    // })

app.listen(port, host, () => console.log("Server on port: " + port));

