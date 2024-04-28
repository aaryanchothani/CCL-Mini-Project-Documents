const mysql = require("mysql");
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express()
const port = 8080
app.use(bodyParser.json());

app.use(cors())

const db = mysql.createConnection({
    host: "dashboarddatabase.crg02wo4ekz7.us-east-1.rds.amazonaws.com",
    port: "3306",
    user: "admin",
    password: "Password123",
    database: "dashboardDatabase",
    connectTimeout: 200000
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/api/connect', (req, res) => {
    db.connect(err => {
        if (err) {
            console.log(err.message);
            return res.status(500).send(err.message);
        }
        console.log("DB Connected");
        return res.status(200).send("DB Connected");
    });
})

app.post('/api/select', (req, res) => {
    db.query('select * from dbtable', (err, results, fields) => {
        if (err) {
            console.error('Error executing MySQL query: ', err);
            return res.status(500).send(err.message);
        }
        return res.status(200).json(results);
    });
})

app.post('/api/delete', (req, res) => {
    queryDelete = 'DELETE FROM dbtable where `Rank`='+req.body.id
    console.log(queryDelete)
    db.query(queryDelete, (err, results, fields) => {
        if (err) {
            console.error('Error executing MySQL query: ', err);
            return res.status(500).send(err.message);
        }
        return res.status(200).json(results);
    });
})


app.post('/api/update', (req, res) => {
    queryDelete = 'UPDATE dbtable set Name="'+req.body.Name+'", Platform="'+req.body.Platform+'", Year='+req.body.Year+', Genre="'+req.body.Genre+'", Publisher="'+req.body.Publisher+'", NA_Sales='+req.body.NA_Sales+', EU_Sales='+req.body.EU_Sales+', JP_Sales='+req.body.JP_Sales+', Other_Sales='+req.body.Other_Sales+', Global_Sales='+req.body.Global_Sales+' where `Rank`='+req.body.Rank
    console.log(queryDelete)
    db.query(queryDelete, (err, results, fields) => {
        if (err) {
            console.error('Error executing MySQL query: ', err);
            return res.status(500).send(err.message);
        }
        return res.status(200).json(results);
    });
})

app.post('/api/insert', (req, res) => {
   
    let query1 = 'select count(*) from dbtable order by `Rank` asc';
    console.log(query1)
    let lastRank=0;
    db.query(query1, (err, results, fields) => {
        if (err) {
            console.error('Error executing MySQL query: ', err);
            return res.status(500).send(err.message);
        }
        lastRank = results[0]["count(*)"]
        console.log(lastRank)

        let query2 = 'insert into dbtable(`Rank`, Name, Platform, Year, Genre, Publisher, NA_Sales, EU_Sales, JP_Sales, Other_Sales, Global_Sales) values ('+lastRank+', "'+req.body.Name+'", "'+req.body.Platform+'",'+req.body.Year+',"'+req.body.Genre+'","'+req.body.Publisher+'",'+req.body.NA_Sales+','+req.body.EU_Sales+','+req.body.JP_Sales+','+req.body.Other_Sales+','+req.body.Global_Sales +')'
        db.query(query2, (err, results, fields) => {
            if (err) {
                console.error('Error executing MySQL query: ', err);
                return res.status(500).send(err.message);
            }
            return res.status(200).json({"result":"Inserted Successfully"});

            return res.status(200).json(results);
        });
        
    });
    // db.query('insert into newtable3(`Rank`, Name, Platform, Year, Genre, Publisher, NA_Sales, EU_Sales, JP_Sales, Other_Sales, Global_Sales) values ()', (err, results, fields) => {
    //     if (err) {
    //         console.error('Error executing MySQL query: ', err);
    //         return res.status(500).send(err.message);
    //     }
    //     return res.status(200).json(results);
    // });
})





