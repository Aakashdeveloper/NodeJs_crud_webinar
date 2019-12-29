const express = require('express');
const mongo = require('mongodb');
const bodyParser = require('body-parser');
const app = express();
const port = 8900;
const MongoClient = mongo.MongoClient;
let db;
const mongourl = 'mongodb://127.0.0.1/27017';
const colname="myproduct";

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

app.get('/products',(req,res) => {
    db.collection(colname).find().toArray((err,result) => {
        if(err) throw err;
        res.status(200).send(result)
    })
});

app.post('/addProduct',(req,res)=>{
    db.collection(colname)
    .insertOne(req.body,(err,result) => {
        if(err) throw err;
        res.status(200).send('Data Inserted')
    })
});

app.put('/updateProduct',(req,res) => {
    db.collection(colname)
        .findOneAndUpdate({"id":req.body.id},{
            $set:{
                id:req.body.id,
                class:req.body.class,
                place:req.body.place
            }
        },(err,result) => {
            if(err) throw err;
            res.status(200).send('Data updated')
        })
});

app.delete('/deleteUser',(req,res) => {
    db.collection(colname).findOneAndDelete({
        "id":req.body.id
    },(err,result) => {
        if(err) throw err;
        res.status(200).send('Data Deleted')
    })
})


app.get('/',(req,res) => {
    res.send("Hii To Edureka NodeJs crud webinar")
});

MongoClient.connect(mongourl,(err,client) => {
    if(err) throw err;
    db = client.db('classpractice');
    app.listen(port,(err) => {
        console.log(" server is running on port 8900")
    })
});