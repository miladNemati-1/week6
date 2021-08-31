const express = require("express");
const morgan = require("morgan");
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
const ejs = require("ejs");
const Patient = require('./models/Patient');
const Doctor = require("./models/Doctor");

const path = require("path")
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("common"));
app.listen(8082);

mongoose.connect('mongodb+srv://mnem0001:Ma4tahastim@cluster0.gtgh3.mongodb.net/test?authSource=admin&replicaSet=atlas-m03zoi-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', function (err) {
    if (err) {
        console.log('Error in Mongoose connection');
        throw err;
    }
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
  });


app.get("/adddoctor", function (req, res) {
res.sendFile(__dirname + "/views/adddoctor.html");
});

app.post("/addnewdoctor", function (req, res) {
    let doctorDetails = req.body;
    let doctor1 = new Doctor({
    name: {
        first: "doctorDetails.dfname",
        lastName: doctorDetails.dlname


    },

    dob: doctorDetails.ddateOfBirth,

    address: {

        state: doctorDetails.dstate,
        suburb: doctorDetails.dsuburb,
        street: doctorDetails.dstreet,
        unit: doctorDetails.dunit,


    },

    

    nop: doctorDetails.dnop

    });

    doctor1.save(function (err) {
        if (err) throw err;
        console.log('Doctor successfully Added to DB');});



    res.redirect("/listdoctors"); // redirect the client to list users page
  });

app.get("/addpatient", function (req, res) {
    res.sendFile(__dirname + "/views/addpatient.html");
  });



app.get("/listdoctors", function (req, res) {
    mongoose.Model.find({}).toArray(function (err, data) {
      res.render("listbooks", { patientDB: data });
    });
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

