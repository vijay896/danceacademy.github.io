const express = require('express');
const path = require('path')
const fs = require('fs');
const exp = require("constants");
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/contactDance').then( () =>{
    console.log("Success");
}).catch( (err) => {
    console.log("Error : "+ err);
} )

const app = express();
const port = 80;


/*  */
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: Number,
    msg: String
});

const Contact = mongoose.model('Contact', contactSchema);

/*  */


//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'))  //for serving static files
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine','pug');   //Set the template engine as pug
app.set('views',path.join(__dirname,'views'));      //set the views directory

//END POINTS
app.get('/',(req, res)=>{
    const params = { };
    res.status(200).render('home.pug',params);

});

app.get('/contact',(req, res)=>{
    const params = { };
    res.status(200).render('contact.pug',params);

});

/* Post Request */
app.post('/contact',(req, res)=>{
    var myData = new Contact(req.body);

    myData.save().then(() => {
        res.send("This item has been saved to the Database")
    }).catch(() => {
        res.status(400).send("Item was not saved to the database")
    });

    //res.status(200).render('contact.pug',params);

});


//START THE SERVER
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
});
