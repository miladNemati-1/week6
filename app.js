const express = require("express");
const morgan = require("morgan");
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
const ejs = require("ejs");
const Patient = require('./models/Patient');
const Doctor = require("./models/Doctor");

const path = require("path");
const { schema } = require("./models/Patient");
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

mongoose.connect('mongodb://localhost:27017/patientDB', function (err) {
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
        firstname: req.body.dfname,
        lastname: req.body.dlname


    },

    dob: new Date(req.body.dob),

    address: {

        state: req.body.dstate,
        suburb: req.body.dsuburb,
        street: req.body.dstreet,
        unit: req.body.dunit,


    },

    

    nop: req.body.dnop

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
    Doctor.find({}, function (err, data) {
      res.render("listdoctors", { patientDb: data });
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

