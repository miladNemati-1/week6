const express = require("express");
let url='mongodb+srv://mnem0001:Ma4tahastim@cluster0.gtgh3.mongodb.net/test?authSource=admin&replicaSet=atlas-m03zoi-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true/patientDB';
const morgan = require("morgan");
const app = express();
const mongoose = require('mongoose');
const ejs = require("ejs");
const Author = require('./models/Doctor');
const Book = require('./models/Patient');

app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("common"));
app.listen(8082);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
  });


app.get("/adddoctor", function (req, res) {
res.sendFile(__dirname + "/views/adddoctor.html");
});

app.get("/addpatient", function (req, res) {
    res.sendFile(__dirname + "/views/addpatient.html");
  });



app.get("/listdoctors", function (req, res) {
res.sendFile(__dirname + "/views/listdoctors.html");
});

app.get("/listpatients", function (req, res) {
    res.sendFile(__dirname + "/views/listpatients.html");
    });

app.get("/deletepatients", function (req, res) {
    res.sendFile(__dirname + "/views/deletepatients.html");
    });

app.get("/updatedoctor", function (req, res) {
    res.sendFile(__dirname + "/views/updatedoctor.html");
    });

mongoose.connect('mongodb://localhost:27017/libDB', function (err) {
    if (err) {
        console.log('Error in Mongoose connection');
        throw err;
    }
    console.log('Successfully connected');
    let author1 = new Author({
        _id: new mongoose.Types.ObjectId(),
        name: {
            firstName: 'Tim',
            lastName: 'John'
        },
        age: 80
    });
    author1.save(function (err) {
        if (err) throw err;
        console.log('Author successfully Added to DB');
        var book1 = new Book({
            _id: new mongoose.Types.ObjectId(),
            title: 'FIT2095 Book ',
            author: author1._id,
            isbn: '123456',
        });
        book1.save(function (err) {
            if (err) throw err;
            console.log('Book1 successfully Added to DB');
        });
        var book2 = new Book({
            _id: new mongoose.Types.ObjectId(),
            title: 'MEAN Stack with FIT2095',
            author: author1._id
        });
        book2.save(function (err) {
            if (err) throw err;
            console.log('Book2 successfully add to DB');
        });
    });
});