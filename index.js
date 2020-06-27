const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/moongose');
const Contact = require('./models/contact');
const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded()); //Parser or middleware before the controller accesses the data

//accessing static files
app.use(express.static('assets'));

//middleware1
// app.use(function(req,res,next)
// {
//     //console.log("middleware 1 is called");
//     req.myName = "Arpan"; //manipulating the data
//     next();
// });
//middleware 2
// app.use(function(req,res,next)
// {
//     console.log("my name from middleware2",req.myName);
//     next();
// });
// var contactList = [
//     {
//         name:"Rishab",
//         phone:"7903277609"
//     },
//     {
//         name:"Tony Stark",
//         phone:"8791223647"
//     },
//     {
//         name:"Captain America",
//         phone:"9955145582"
//     }
// ];

app.get('/',function(req,res)
{
    //console.log("from the get route controller",req.myName);
    
    //to fetch the contacts from db we have a function find()

    Contact.find({},function(err,contacts)
    {
        if(err){
            console.log("Error in fetching contacts from db");
            return;
        }
    return res.render('home',
                            {
                                title:"Contact List",
                                contact : contacts
                            });
    });
});

app.get('/practice',function(req,res)
{
    return res.render('practice',{title:"Battle Royal"})
});

app.post('/create-contact',function(req,res)
{
    //console.log(req.body);
    //console.log(req.body.phone);
    //return res.redirect('/practice');
    // contactList.push(
    //     {
    //         name:req.body.name,
    //         phone:req.body.phone
    //     });

    Contact.create(
        {

            name:req.body.name,  //we could have also used simply Contact.create(req.body,.....)
            phone:req.body.phone
        },function(err,newContact){
                if(err){
                    console.log("Error in creating a contact!");
                    return;
                }
                console.log("*****",newContact);
                return res.redirect('back'); //('/') since I am going back to the same page
            });
        });


// app.get('/delete-contact/:phone',function(req,res){ //using string param
//     console.log(req.params);
//     let phone = req.params.phone;
// });

//using query param for deleting a contact
app.get('/delete-contact/',function(req,res){
   //get the id from query in the ul
   let id = req.query.id;

   //find the contact in the db using this id and delete it
   Contact.findByIdAndDelete(id,function(err)
   {
       if(err){
           console.log("Error in Deleting the Contact from the database");
           return;
       }
       return res.redirect('back');
   })
    
});



// app.get('/profile',function(req,res)
// {
//     res.send("<h1>Hello fraands chai pi lo!!");
// });


app.listen(port,function(err)
{
    if(err)
    {
        console.log("error in running the server",err);
    }
    console.log("Yup!My Express Server is running on Port",port);
});