const express = require("express");
const morgan = require("morgan");
const app = express();
const mongoose = require('mongoose');

const ejs = require("ejs");
const Patient = require('./models/Patient');
const Doctor = require("./models/Doctor");

const path = require("path");
const { schema } = require("./models/Patient");



app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
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
        if (err) {
            res.render("invaliddata.html")
        }
        else{
            res.redirect("/listdoctors"); // redirect the client to list users page


        }



    
  });

  });



  app.post("/addnewpatient", function (req, res) {
    let patient1 = new Patient({
    fullName: req.body.fullname,
    doctor: req.body.doctorid,
    age: req.body.age,

    dateOfVisit: req.body.dov,

    caseDescription: req.body.casedescription

    });

    var query = {_id: req.body.doctorid};
    var set = {$inc: {nop: 1}};
    Doctor.findOneAndUpdate(query,set,{upsert: true}, function (err, data) {
        });  

    patient1.save(function (err) {
        if (err) {
            res.render("invaliddata.html")
        }
        else{
            res.redirect("/listpatients"); // redirect the client to list users page


        }
        console.log('Patient successfully Added to DB');});



    
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
    //comment
        Patient.find({} , function (err, data) {
            Doctor.find({}, function (err, doctordata) {
                res.render("listpatients", { patientDb: data, doctorDb:doctordata  });
            });
          
        });
    });

app.get("/deletepatients", function (req, res) {
    res.sendFile(__dirname + "/views/deletepatients.html");
    });

app.get("/updatedoctor", function (req, res) {
    res.sendFile(__dirname + "/views/updatedoctor.html");
    });


app.post("/updatedoctorpost", function (req, res) {
    var query = {_id: req.body.doctorid};
    var set = {nop: req.body.nop};
    Doctor.findOneAndUpdate(query,set,{upsert: true}, function (err, data) {

        if (err) {
            res.render("invaliddata.html")
        }
        else{
            res.redirect("/listdoctors"); // redirect the client to list users page


        }
        });  
        
    });

app.post("/deletepatientpost", function (req, res) {
    var query = {fullName: req.body.patientfullname};
    Patient.findOneAndDelete(query, function (err, data) {
        if (err) {
            res.render("invaliddata.html")
        }
        else{
            res.redirect("/listpatients"); // redirect the client to list users page


        }




    });  
        

    });


