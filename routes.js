const { error } = require("console");
const express = require("express");
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;
const client = require("./db");
//const router = express();
const router = express.Router();
router.use(express.static("public"));
router.use(express.json());

const db_name = "bit95gdkjmasj4qqbbzy";


//<---- POST para cuestionario --->
let resp_c = [];
router.post("/cuest_post", (req, res) => {
    const { resp_cuest, replace } = req.body;
    resp_c = resp_cuest;
    if (!resp_cuest) {
        return res.status(400).send({ status: "failed" });
    }
    else {
        // console.log("Post Cuest OK. " + resp_cuest[0])
        // res.status(200).send({ status: "recieved" });
        const data = {
            "nombre": resp_cuest[0],
            "dni": resp_cuest[1],
            "sex": resp_cuest[2],
            "bdate": resp_cuest[3],
            "tel": resp_cuest[4],
            "peso": resp_cuest[5],
            "estat": resp_cuest[6],
            "cs0": resp_cuest[7], "cn0": resp_cuest[8], "cobs0": resp_cuest[9],
            "cs1": resp_cuest[10], "cn1": resp_cuest[11], "cobs1": resp_cuest[12],
            "cs2": resp_cuest[13], "cn2": resp_cuest[14], "cobs2": resp_cuest[15],
            "cs3": resp_cuest[16], "cn3": resp_cuest[17], "cobs3": resp_cuest[18],
            "cs4": resp_cuest[19], "cn4": resp_cuest[20], "cobs4": resp_cuest[21],
            "cs5": resp_cuest[22], "cn5": resp_cuest[23], "cobs5": resp_cuest[24],
            "cs6": resp_cuest[25], "cn6": resp_cuest[26], "cobs6": resp_cuest[27],
            "cs7": resp_cuest[28], "cn7": resp_cuest[29], "cobs7": resp_cuest[30],
            "cs8": resp_cuest[31], "cn8": resp_cuest[32], "cobs8": resp_cuest[33],
            "cs9": resp_cuest[34], "cn9": resp_cuest[35], "cobs9": resp_cuest[36],
            "cs10": resp_cuest[37], "cn10": resp_cuest[38], "cobs10": resp_cuest[39],
            "cs11": resp_cuest[40], "cn11": resp_cuest[41], "cobs11": resp_cuest[42],
            "cs12": resp_cuest[43], "cn12": resp_cuest[44], "cobs12": resp_cuest[45],
            "cs13": resp_cuest[46], "cn13": resp_cuest[47], "cobs13": resp_cuest[48],
            "cs14": resp_cuest[49], "cn14": resp_cuest[50], "cobs14": resp_cuest[51],
            "cs15": resp_cuest[52], "cn15": resp_cuest[53], "cobs15": resp_cuest[54],
            "cs16": resp_cuest[55], "cn16": resp_cuest[56], "cobs16": resp_cuest[57],
            "cs17": resp_cuest[58], "cn17": resp_cuest[59], "cobs17": resp_cuest[60],
            "cs18": resp_cuest[61], "cn18": resp_cuest[62], "cobs18": resp_cuest[63],
            "cs19": resp_cuest[64], "cn19": resp_cuest[65], "cobs19": resp_cuest[66],
            "cs20": resp_cuest[67], "cn20": resp_cuest[68], "cobs20": resp_cuest[69],
            "fecha": resp_cuest[70],
            "firma": resp_cuest[71]
        };
        client.connect(error => {
            if (error) {
                return res.status(500).send({ status: "failed", message: "Error connecting to DB" });
            }
            const collection = client.db("sh").collection("sh_clients_cuest");
            collection.findOne({ dni: resp_cuest[1] }, function (err, dbRes) {
                if (err) {
                    return res.status(500).send({ status: "failed", message: "Error retrieving data from DB" });
                }
                if (dbRes) {
                    if (replace) {
                        // Reemplazar los datos existentes
                        collection.updateOne({ dni: resp_cuest[1] }, { $set: data }, function (err, dbRes) {
                            if (err) {
                                return res.status(500).send({ status: "failed", message: "Error updating data in DB" });
                            } else {
                                client.close();
                                res.status(200).send({ status: "recieved", message: "Data recieved and updated" });
                                console.log("Updated CUEST OK. " + resp_cuest[0])
                            }
                        });
                    } else {
                        client.close();
                        return res.status(200).send({ status: "existing", message: "Datos ya existen" });
                    }
                } else {
                    collection.insertOne(data, function (err, dbRes) {
                        if (err) {
                            return res.status(500).send({ status: "failed", message: "Error inserting data to DB" });
                        }
                        else {
                            client.close();
                            res.status(200).send({ status: "recieved", message: "Data recieved and inserted" });
                            console.log("Post CUEST OK. " + resp_cuest[0])
                        }
                    });
                }
            });
        });
    }
});
//<---- GET para cuestionario --->
router.get("/cuest_get", (req, res) => {
    if (!resp_c) {
        return res.status(500).send("No hay datos para cargar");
    } else {
        console.log("Get Cuest OK. " + resp_c.nombre);
        res.status(200).json({ info: resp_c });
    }
});

//<---- POST para consentimiento --->
let resp_con = [];
router.post("/cons_post", (req, res) => {
    const { resp_cons, replace } = req.body;
    resp_con = resp_cons;
    if (!resp_cons) {
        return res.status(400).send({ status: "failed" });
    }
    // console.log("Post Cons OK. " + resp_cons[0])
    // res.status(200).send({ status: "recieved" });
    const data = {
        "nombre": resp_cons[0],
        "nombre_representante": resp_cons[1],
        "nombre_doctor": resp_cons[2],
        "observaciones": resp_cons[3],
        "fecha": resp_cons[4],
        "dni": resp_cons[5],
        "firma": resp_cons[6],
        "firma_doctor": resp_cons[7]
    };

    client.connect(error => {
        if (error) {
            return res.status(500).send({ status: "failed", message: "Error connecting to DB" });
        }
        const collection = client.db("sh").collection("sh_clients_cons");
        collection.findOne({ dni: resp_cons[5] }, function (err, dbRes) {
            if (err) {
                return res.status(500).send({ status: "failed", message: "Error retrieving data from DB" });
            }
            if (dbRes) {
                if (replace) {
                    // Reemplazar los datos existentes
                    collection.updateOne({ dni: resp_cons[5] }, { $set: data }, function (err, dbRes) {
                        if (err) {
                            return res.status(500).send({ status: "failed", message: "Error updating data in DB" });
                        } else {
                            client.close();
                            res.status(200).send({ status: "recieved", message: "Data recieved and updated" });
                            console.log("Updated Cons OK. " + resp_cons[0])
                        }
                    });
                } else {
                    client.close();
                    return res.status(200).send({ status: "existing", message: "Datos ya existen" });
                }
            } else {
                collection.insertOne(data, function (err, dbRes) {
                    if (err) {
                        return res.status(500).send({ status: "failed", message: "Error inserting data to DB" });
                    }
                    else {
                        client.close();
                        res.status(200).send({ status: "recieved", message: "Data recieved and inserted" });
                        console.log("Post Cons OK. " + resp_cons[0])
                    }
                });
            }
        });
    });
});
//<---- GET para consentimiento --->
router.get("/cons_get", (req, res) => {
    if (!resp_con.nombre) {
        return res.status(500).send("No hay datos para cargar");
    } else {
        console.log("Get Cons OK. " + resp_con.nombre);
        res.status(200).json({ info: resp_con });
    }
});

//<---- POST para LOPD --->
let resp_lo = [];
router.post("/lopd_post", (req, res) => {
    const { resp_lopd, replace } = req.body;
    resp_lo = resp_lopd;
    if (!resp_lopd) {
        return res.status(400).send({ status: "failed", message: "Data is missing" });
    }
    else {
        console.log("Post LOPD OK. " + resp_lopd[0])
        res.status(200).send({ status: "recieved" });
        const data = {
            "nombre": resp_lopd[0],
            "dni": resp_lopd[1],
            "firma": resp_lopd[2],
            "fecha": resp_lopd[3]
        };
        console.log(data.nombre)
        client.connect(error => {
            if (error) {
                return res.status(500).send({ status: "failed", message: "Error connecting to DB" });
            }
            const collection = client.db(db_name).collection("sh_clients_lopd");
            collection.findOne({ dni: resp_lopd[1] }, function (err, dbRes) {
                if (err) {
                    return res.status(500).send({ status: "failed", message: "Error retrieving data from DB" });
                }
                if (dbRes) {
                    if (replace) {
                        // Reemplazar los datos existentes
                        collection.updateOne({ dni: resp_lopd[1] }, { $set: data }, function (err, dbRes) {
                            if (err) {
                                return res.status(500).send({ status: "failed", message: "Error updating data in DB" });
                            } else {
                                client.close();
                                res.status(200).send({ status: "recieved", message: "Data recieved and updated" });
                                console.log("Updated LOPD OK. " + resp_lopd[0])
                            }
                        });
                    } else {
                        client.close();
                        return res.status(200).send({ status: "existing", message: "Datos ya existen" });
                    }
                } else {
                    collection.insertOne(data, function (err, dbRes) {
                        if (err) {
                            return res.status(500).send({ status: "failed", message: "Error inserting data to DB" });
                        }
                        else {
                            client.close();
                            res.status(200).send({ status: "recieved", message: "Data recieved and inserted" });
                            console.log("Post LOPD OK. " + resp_lopd[0])
                        }
                    });
                }
            });
            // # Para guardar los datos en fichero txt
            //        //fs.writeFile(`C:/Users/alexvol/Desktop/Test_progs_py/front_back/bd_text/${nombre}.txt`, JSON.stringify(global.resp_lo), function(err) {
            //        //  if(err) {
            //        //      return console.log(err);
            //        //  }
            //        //  console.log(`The ${nombre} file was saved!`);
            //        //});
            //
        });
    }
});
//<---- GET para LOPD --->
router.get("/lopd_get", (req, res) => {
    if (!resp_lo.nombre) {
        return res.status(500).send("No hay datos para cargar");
    } else {
        console.log("Get LOPD OK. " + resp_lo.nombre);
        res.status(200).json({ info: resp_lo });
    }
});
//<---- POST para APUNTES --->
let apuntes = [];
router.post("/apuntes", (req, res) => {
    const { r_apuntes, replace } = req.body;
    apuntes = r_apuntes;
    if (!r_apuntes) {
        return res.status(400).send({ status: "failed", message: "Data is missing" });
    }
    else {
        //console.log("Post APUNTES OK. " + r_apuntes[0])
        //res.status(200).send({ status: "recieved" });

        const data = {
            "nombre": r_apuntes[0],
            "dni": r_apuntes[1],
            "apunte": r_apuntes[2]
        };

        client.connect(error => {
            if (error) {
                return res.status(500).send({ status: "failed", message: "Error connecting to DB" });
            }
            const collection = client.db("sh").collection("sh_apuntes");
            collection.findOne({ dni: r_apuntes[1] }, function (err, dbRes) {
                if (err) {
                    return res.status(500).send({ status: "failed", message: "Error retrieving data from DB" });
                }
                if (dbRes) {
                    if (replace) {
                        // Reemplazar los datos existentes
                        collection.updateOne({ dni: r_apuntes[1] }, { $set: data }, function (err, dbRes) {
                            if (err) {
                                return res.status(500).send({ status: "failed", message: "Error updating data in DB" });
                            } else {
                                client.close();
                                res.status(200).send({ status: "recieved", message: "Data recieved and updated" });
                                console.log("Updated APUNTES OK. " + r_apuntes[0])
                            }
                        });
                    } else {
                        client.close();
                        return res.status(200).send({ status: "existing", message: "Datos ya existen" });
                    }
                } else {
                    collection.insertOne(data, function (err, dbRes) {
                        if (err) {
                            return res.status(500).send({ status: "failed", message: "Error inserting data to DB" });
                        }
                        else {
                            client.close();
                            res.status(200).send({ status: "recieved", message: "Data recieved and inserted" });
                            console.log("Post APUNTES OK. " + r_apuntes[0])
                        }
                    });
                }
            });
        })
    }
});
//<---- GET para APUNTES --->
router.get("/apuntes_get", (req, res) => {
    if (!apuntes.nombre) {
        return res.status(500).send("No hay datos para cargar");
    } else {
        console.log("Get APUNTES OK. " + apuntes.nombre);
        res.status(200).json({ info: apuntes });
    }
});

//<---- GET search datos --->
router.get("/search/:name", function (req, res) {
    const name = req.params.name;
    client.connect(error => {
        if (error) {
            return res.status(500).send({ status: "failed", message: "Error connecting to DB" });
        }
        const collection = client.db(db_name).collection("sh_clients_lopd");

        // Buscar los nombres similares en la base de datos
        collection.find({
            $or: [
                { nombre: { $regex: name, $options: 'i' } },
                { dni: { $regex: name, $options: 'i' } }
            ]
        }).toArray(function (err, docs) {
            if (err) {
                // Manejar el error
                return res.status(500).send("Error al buscar en la base de datos");
            }

            // Enviar los resultados
            //console.log("Get OK. " + JSON.stringify(docs));
            res.send(JSON.stringify(docs));
        });
    });
});

router.get("/data/:nombre/:dni", function (req, res) {
    const nombre = req.params.nombre;
    const dni = req.params.dni;

    client.connect(error => {
        if (error) {
            return res.status(500).send({ status: "failed", message: "Error connecting to DB" });
        }
        const collection_lopd = client.db(db_name).collection("sh_clients_lopd");
        const collection_cuest = client.db(db_name).collection("sh_clients_cuest");
        const collection_cons = client.db(db_name).collection("sh_clients_cons");
        const collection_apuntes = client.db(db_name).collection("sh_apuntes");
        // Buscar los datos relacionados con el nombre en la base de datos
        collection_cuest.findOne({ nombre: nombre, dni: dni }, function (err, data) {
            if (err) {
                // Manejar el error
                return res.status(500).send("Error al buscar en la base de datos");
            }
            resp_c = data;
        })
        collection_cons.findOne({ nombre: nombre, dni: dni }, function (err, data) {
            if (err) {
                // Manejar el error
                return res.status(500).send("Error al buscar en la base de datos");
            }
            resp_con = data;
        })
        collection_lopd.findOne({ nombre: nombre, dni: dni }, function (err, data) {
            if (err) {
                // Manejar el error
                return res.status(500).send("Error al buscar en la base de datos");
            }
            // Enviar los datos
            // console.log("Get OK. " + JSON.stringify(data.nombre));
            res.send(JSON.stringify(data));
            resp_lo = data;
        })
        collection_apuntes.findOne({ nombre: nombre, dni: dni }, function (err, data) {
            if (err) {
                // Manejar el error
                return res.status(500).send("Error al buscar en la base de datos");
            }
            if (!data) {
                // No se encuentran los resultados
                apuntes = { nombre: nombre, dni: dni }
            } else {
                apuntes = data;
            }
        })
    });
});


module.exports = router;