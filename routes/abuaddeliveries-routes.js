const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user-schema");
const keys = require("../config/keys")
const Order = require("../models/order-schema");
const nodemailer = require('nodemailer');
const axios = require("axios");


const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const JWT_SECRET = 'secret';


let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", 
    port: 587,
    secure: false,
  auth: {
    user: "abuaddeliveries@gmail.com",
    pass: "cmofxaolvxpkbvzg"
  }
});

// verifying the connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take your messages!");
  }
});

router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          role: req.body.role,
          accountBalance: 0,
         
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      } 
    });
  });


  router.route("/signupnotification").post((req,res) => {
    var name = req.body.name;
    var email =req.body.email;
    
    
    var content = `TITLE: SIGNUP NOTIFICATION\n \nWelcome to abuaddeliveries! \n\n Your signup was successful. Please find a copy of your signup details below\n \nName: ${name}\n \nEmail: ${email}\n \n`;
    
    var mail = {
      from: "abuaddeliveries@gmail.com", 
      to: `abuaddeliveries@gmail.com, ${email}`, 
      subject: "abuaddeliveries SignUp Email",
      text: content,
    }
    
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          status: 'fail'
        })
      } else {
        res.json({
         status: 'success'
        })
      }
    })
    
    
    });


router.route("/login").post((req, res) => {

    const {errors, isValid} = validateLoginInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
    .then(user => {
        if(!user){
            return res.status(404).json({email: "email Not Found"})
        }

        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if(isMatch){
                const payload = {
                    id : user.id,
                    name : user.name,
                    role : user.role,
//ROLE PART NO 3. MAKE THE ROLE PART OF THE UNIVERSAL STATE SO YOU CAN ACCESS IT THROUGH auth.user.role
                    email: user.email,
                    accountBalance: user.accountBalance,
                  };

                jwt.sign(payload, keys.secretOrKey, {expiresIn: 31556926}, (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer" + token
                    });
                }) 
            }else {
                res.status(400).json({passwordIncorrect: "Password Incorrect"});
            }
        })
    })
});


router.route("/fakesignupadmin").post((req,res) => {
var name = req.body.name
var email = req.body.email 
var password = req.body.password

var content = `TITLE: REQUEST FOR ADMIN SIGN UP TO BE APPROVED OR DENIED\n \nDetails: \n \nName: ${name}\n \nEmail: ${email}\n \nPassword: ${password}`

var mail = {
  from: "abuaddeliveries@gmail.com", 
  to: `abuaddeliveries@gmail.com`, 
  subject: "Request For Admin Signup To Be Reviewed",
  text: content
}

transporter.sendMail(mail, (err, data) => {
  if (err) {
    res.json({
      status: 'fail'
    })
  } else {
    res.json({
     status: 'success'
    })
  }
})
});

router.route("/fakesignuprider").post((req,res) => {
var name = req.body.name
var email =req.body.email
var phonenumber = req.body.phonenumber
var age = req.body.age  
var address = req.body.address
var password = req.body.password 

var content = `TITLE: ONLINE RIDER RECRUITMENT APPLICATION\n \nDetails: \n \nName: ${name}\n \nEmail: ${email}\n \nPhone number: ${phonenumber}\n \nAge: ${age}\n \nAddress: ${address}\n \nPassword: ${password}`

var mail = {
  from: "abuaddeliveries@gmail.com", 
  to: `abuaddeliveries@gmail.com`, 
  subject: "Online Rider Recruitment Application",
  text: content
}

transporter.sendMail(mail, (err, data) => {
  if (err) {
    res.json({
      status: 'fail'
    })
  } else {
    res.json({
     status: 'success'
    })
  }
})


});

router.route("/becomeapartner").post((req,res) => {
  var companyname = req.body.companyname
  var companyemail =req.body.companyemail
  var companyphonenumber = req.body.companyphonenumber
  var companyaddress = req.body.companyaddress  
  var purposeofpartnership = req.body.purposeofpartnership
  var password = req.body.password 
  
  var content = `TITLE: REQUEST FOR COMPANY PARTNERSHIP TO BE REVIEWED\n \nDetails: \n \nCompany Name: ${companyname}\n \nCompany Email: ${companyemail}\n \nCompany Phonenumber: ${companyphonenumber}\n \nCompany Address: ${companyaddress}\n \nPurpose Of Partnership: ${purposeofpartnership}\n \nPassword: ${password}`
  
  var mail = {
    from: "abuaddeliveries@gmail.com", 
    to: `abuaddeliveries@gmail.com`, 
    subject: "Request For Company Partnership To Be Reviewed",
    text: content
  }
  
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
       status: 'success'
      })
    }
  })
  
  
  });


router.route("/order").post((req, res, next) => {
  var Category = "abuaddeliveries LTD ORDER DETAILS"
  var Pick_Up_Item = req.body.pickupitem 
  var Pick_Up_Address = req.body.pickupaddress
  var Name = req.body.name
  var Phone = req.body.phone
  var Email = req.body.email
  var Pick_Up_Date = req.body.pickupdate 
  var Amount = req.body.amountInNaira
  var Item_Weight = req.body.weightinkg
  var Item_Quantity = req.body.pickupquantity
  var Delivery_Address = req.body.deliveryaddress
  var Delivery_Name = req.body.deliveryname
  var Delivery_Phone_Number = req.body.deliveryphonenumber
  var Delivery_Email = req.body.deliveryemail
  var Status = "Received"

  var content = `${Category}\n \nPick Up Item: ${Pick_Up_Item}\n \nPick Up Address: ${Pick_Up_Address}\n \nName: ${Name}\n \nPhone: ${Phone}\n \nEmail: ${Email}\n \nPick Up Date: ${Pick_Up_Date} \n \nAmount: ${Amount}\n \nItem Weight: ${Item_Weight}kg\n \nItem Quantity: ${Item_Quantity}\n \nDelivery Address: ${Delivery_Address}\n \nDelivery Name: ${Delivery_Name} \n \n Delivery Phone Number: ${Delivery_Phone_Number} \n \nDelivery Email: ${Delivery_Email}\n \nOrder Status: ${Status}\n \n` 

  var mail = {
    from: "abuaddeliveries@gmail.com", 
    to: `${Email}, abuaddeliveries@gmail.com`, 
    subject: "Order Details",
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
       status: 'success'
      })
    }
  }) 

  Order.create(req.body, (error, data) => {
    if(error){
        return next(error);
    } else {
        console.log(data);
        res.json(data);
    }


});







});


/**order Received email notification */
router.route("/orderreceived").post((req,res) => {
  var item = req.body.pickupitem
  var email = req.body.email
  
  var content = `TITLE: ORDER RECEIVED\n \n Hey, your ${item} order has been received. We will attend to it shortly\n \n Please log in to your dashboard on the mobile app or on our website to keep track of your order.`
  
  var mail = {
    from: "abuaddeliveries@gmail.com", 
    to: `${email}, abuaddeliveries@gmail.com`, 
    subject: "ORDER RECEIVED",
    text: content
  }
  
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
       status: 'success'
      })
    }
  })
  
  
  });



/**order pending email notification */
router.route("/orderpending").post((req,res) => {
  var item = req.body.pickupitem
  var email = req.body.email
  
  var content = `TITLE: ORDER PENDING\n \n Hey, your rider is on his way.\n \n Please log in to your dashboard on the mobile app or on our website to keep track of your order.`
  
  var mail = {
    from: "abuaddeliveries@gmail.com", 
    to: `${email}, abuaddeliveries@gmail.com`, 
    subject: "ORDER PENDING",
    text: content
  }
  
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
       status: 'success'
      })
    }
  }) 
  
  
  });

  /**order delivered notification */
  router.route("/orderdelivered").post((req,res) => {
    var item = req.body.pickupitem
    var email = req.body.email
    
    var content = `TITLE: ORDER DELIVERED\n \n Hey, your ${item} order has been successfully delivered.\n \n Please log in to your dashboard on the mobile app or on our website to keep track of your order.`
    
    var mail = {
      from: "abuaddeliveries@gmail.com", 
      to: `${email}, abuaddeliveries@gmail.com`, 
      subject: "ORDER DELIVERED",
      text: content
    }
    
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          status: 'fail'
        })
      } else {
        res.json({
         status: 'success'
        })
      }
    })
    
    
    });

      /**order partial delivered notification */
  router.route("/orderpartialdelivered").post((req,res) => {
    var item = req.body.pickupitem
    var email = req.body.email
    
    var content = `TITLE: ORDER PARTITALLY DELIVERED\n \n Hey, your ${item} order has been partially delivered.\n \n Please log in to your dashboard on the mobile app or on our website to keep track of your order.`
    
    var mail = {
      from: "abuaddeliveries@gmail.com", 
      to: `${email}, abuaddeliveries@gmail.com`, 
      subject: "ORDER PARTIALLY DELIVERED",
      text: content
    }
    
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          status: 'fail'
        })
      } else {
        res.json({
         status: 'success'
        })
      }
    })
    
    
    });

      /**order rescheduled notification */
  router.route("/orderrescheduled").post((req,res) => {
    var item = req.body.pickupitem
    var email = req.body.email
    
    var content = `TITLE: ORDER RESCHEDULED\n \n Hey, your ${item} order has been rescheduled.\n \n Please log in to your dashboard on the mobile app or on our website to keep track of your order.`
    
    var mail = {
      from: "abuaddeliveries@gmail.com", 
      to: `${email}, abuaddeliveries@gmail.com`, 
      subject: "ORDER RESCHEDULED",
      text: content
    }
    
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          status: 'fail'
        })
      } else {
        res.json({
         status: 'success'
        })
      }
    })
    
    
    });

      /**order cancelled notification */
  router.route("/ordercancelled").post((req,res) => {
    var item = req.body.pickupitem
    var email = req.body.email
    
    var content = `TITLE: ORDER CANCELLED\n \n Hey, your ${item} order has been cancelled.\n \n Please log in to your dashboard on the mobile app or on our website to keep track of your order.`
    
    var mail = {
      from: "abuaddeliveries@gmail.com", 
      to: `${email}, abuaddeliveries@gmail.com`, 
      subject: "ORDER cancelled",
      text: content
    }
    
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          status: 'fail'
        })
      } else {
        res.json({
         status: 'success'
        })
      }
    })
    
    
    });

      /**order rejected notification */
  router.route("/orderrejected").post((req,res) => {
    var item = req.body.pickupitem
    var email = req.body.email
    
    var content = `TITLE: ORDER REJECTED\n \n Hey, your ${item} order has been rejected.\n \n Please log in to your dashboard on the mobile app or on our website to keep track of your order.`
    
    var mail = {
      from: "abuaddeliveries@gmail.com", 
      to: `${email}, abuaddeliveries@gmail.com`, 
      subject: "ORDER REJECTED",
      text: content
    }
    
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          status: 'fail'
        })
      } else {
        res.json({
         status: 'success'
        })
      }
    })
    
    
    });



/*Add the all the orders to the user in db */
router.route("/userupdate/:id").post((req, res, next) => {

  var data = req.body;

  User.findOneAndUpdate(
    {_id: req.params.id},
    {$push: {orders: data}},
    function (error, success) {
      if (error) {
          console.log(error);
      } else {
          console.log("success, user updated!!!");
          res.json(success);
      }
  });    
  
  
});



/* please the :id or req.params.id that is passed from from end should be user id ooo*/
router.route("/userreceived/:id").get((req, res, next) => {

  Order.find({user: req.params.id, status: "Received"}, function(err, data){
     if (err){
         console.log(err);
     }else{
       console.log(data);
      res.json(data);
      
     }
    
 
  }); 
  
});

router.route("/userpending/:id").get((req, res, next) => {

  Order.find({user: req.params.id, status: "Pending"}, function(err, data){
     if (err){
         console.log(err);
     }else{
      console.log(data);
      res.json(data);
     }
    
 
  });
  
});



/*GET ALL THE deliveries with status: final and WITH ANY  delivery details ONE FOR USER*/


router.route("/userallstatusdelivered/:id").get((req, res, next) => {
  
  Order.find({user: req.params.id, status: "Final"}, function(err, data){
    if (err){
      console.log(err);
    }else{
     console.log(data);
     res.json(data);
    }
   

 });
});


/*GET ALL THE deliveries with status: final and  delivery details: delivered (for mobile app ohhh)*/
router.route("/usersuccessfuldelivery/:id").get((req, res, next) => {
  
  Order.find({user: req.params.id, status: "Final", deliverydetails: "Delivered"}, function(err, data){
    if (err){
      console.log(err);
    }else{
     console.log(data);
     res.json(data);
    }
   

 });
});



/*GET ALL THE completed deliveries that were not delivered bracuase of cancelled (for mobile) */
router.route("/usercancelleddelivery/:id").get((req, res, next) => {
  
  Order.find({user: req.params.id, status: "Final", deliverydetails:  "Cancelled"}, function(err, data){
    if (err){
      console.log(err);
    }else{
     console.log(data);
     res.json(data);
    }
   

 });
});


router.route("/riderreceived").get((req, res, next) => {
  
  Order.find({status: "Received"}, function(err, data){
    if (err){
      console.log(err);
    }else{
     console.log(data);
     res.json(data);
    }
   

 });

});


router.route("/riderupdatestatustopending").put((req, res, next) => {

  var data = req.body;

  Order.findOneAndUpdate(
    { _id: data._id},
    { $set: { status: 'Pending' }},
    function (error, success) {
      if (error) {
          console.log(error);
      } else {
          console.log("success, status updated to Pending!!!");
          console.log(success); 
          res.json(success);

      }
  });  

});

router.route("/riderupdatestatustodelivered").put((req, res, next) => {

  var data = req.body;

  Order.findOneAndUpdate(
    {_id: data._id},
    {$set: {status: "Final"}},
    function (error, success) {
      if (error) {
          console.log(error);
      } else {
          console.log("success, status updated to Delivered!!!");
          console.log(success);
          res.json(success);
      }
  });  

});



/*admin update status to delivered for rider1*/



/*Pass over the rider iddddd from front end when they change status of an order*/
router.route("/riderupdaterider/:id").put((req, res, next) => {

  var data = req.body;

  Order.findOneAndUpdate(
    {_id: data._id},
    {$set: {rider: req.params.id}},
    function (error, success) {
      if (error) {
          console.log(error);
      } else {
          console.log("success, rider updated!!!");
          console.log(success);
          res.json(success);
      }
  });  

});


/*for admin to update riders; robert update*/

router.route("/adminassignrider1").put((req, res, next) => {

  var data = req.body;

  Order.findOneAndUpdate(
    {_id: data._id},
    {$set: {rider: "60057537abc9250004136dec"}},
    function (error, success) {
      if (error) {
          console.log(error);
      } else {
          console.log("success, rider assigned!!!");
          console.log(success);
          res.json(success);
      }
  });  

});


router.route("/adminassignrider2").put((req, res, next) => {

  var data = req.body;

  Order.findOneAndUpdate(
    {_id: data._id},
    {$set: {rider: "60057619abc9250004136ded"}},
    function (error, success) {
      if (error) {
          console.log(error);
      } else {
          console.log("success, rider assigned!!!");
          console.log(success);
          res.json(success);
      }
  });  

});


router.route("/adminassignrider3").put((req, res, next) => {

  var data = req.body;

  Order.findOneAndUpdate(
    {_id: data._id},
    {$set: {rider: "600577b6abc9250004136dee"}},
    function (error, success) {
      if (error) {
          console.log(error);
      } else {
          console.log("success, rider assigned!!!");
          console.log(success);
          res.json(success);
      }
  });  

});


router.route("/adminassignrider4").put((req, res, next) => {

  var data = req.body;

  Order.findOneAndUpdate(
    {_id: data._id},
    {$set: {rider: ""}},
    function (error, success) {
      if (error) {
          console.log(error);
      } else {
          console.log("success, rider assigned!!!");
          console.log(success);
          res.json(success);
      }
  });  

});


router.route("/adminassignrider5").put((req, res, next) => {

  var data = req.body;

  Order.findOneAndUpdate(
    {_id: data._id},
    {$set: {rider: ""}},
    function (error, success) {
      if (error) {
          console.log(error);
      } else {
          console.log("success, rider assigned!!!");
          console.log(success);
          res.json(success);
      }
  });  

});


router.route("/adminassignrider6").put((req, res, next) => {

  var data = req.body;

  Order.findOneAndUpdate(
    {_id: data._id},
    {$set: {rider: ""}},
    function (error, success) {
      if (error) {
          console.log(error);
      } else {
          console.log("success, rider assigned!!!");
          console.log(success);
          res.json(success);
      }
  });  

});


router.route("/adminassignrider7").put((req, res, next) => {

  var data = req.body;

  Order.findOneAndUpdate(
    {_id: data._id},
    {$set: {rider: ""}},
    function (error, success) {
      if (error) {
          console.log(error);
      } else {
          console.log("success, rider assigned!!!");
          console.log(success);
          res.json(success);
      }
  });  

});


router.route("/adminassignrider8").put((req, res, next) => {

  var data = req.body;

  Order.findOneAndUpdate(
    {_id: data._id},
    {$set: {rider: ""}},
    function (error, success) {
      if (error) {
          console.log(error);
      } else {
          console.log("success, rider assigned!!!");
          console.log(success);
          res.json(success);
      }
  });  

});


router.route("/adminassignrider9").put((req, res, next) => {

  var data = req.body;

  Order.findOneAndUpdate(
    {_id: data._id},
    {$set: {rider: "600577b6abc9250004136dee"}},
    function (error, success) {
      if (error) {
          console.log(error);
      } else {
          console.log("success, rider assigned!!!");
          console.log(success);
          res.json(success);
      }
  });  

});


router.route("/adminassignrider10").put((req, res, next) => {

  var data = req.body;

  Order.findOneAndUpdate(
    {_id: data._id},
    {$set: {rider: ""}},
    function (error, success) {
      if (error) {
          console.log(error);
      } else {
          console.log("success, rider assigned!!!");
          console.log(success);
          res.json(success);
      }
  });  

});








/*Pass over the rider iddddd from front end when they change status of an order*/
router.route("/riderpending/:id").get((req, res, next) => {

  Order.find({rider: req.params.id, status: "Pending"}, function(err, data){
    if (err){
      console.log(err);
    }else{
     console.log(data);
     res.json(data);
    }
   

 });  
  
});


/*Rider delivered for web*/
router.route("/riderdelivered/:id").get((req, res, next) => {

  Order.find({rider: req.params.id, status: "Final"}, function(err, data){
    if (err){
      console.log(err);
    }else{
     console.log(data);
     res.json(data);
    }
   

 });  
  
});

/*GET ALL THE completed deliveries that were  DELIVERED FOR RIDER (for mobile) */

router.route("/ridersuccessfuldelivery/:id").get((req, res, next) => {
  
  Order.find({rider: req.params.id, status: "Final", deliverydetails: "Delivered"}, function(err, data){
    if (err){
      console.log(err);
    }else{
     console.log(data);
     res.json(data);
    }
   

 });
});



/*GET ALL THE completed deliveries that were not delivered bracuase of cancelled  FOR RIDER(for mobile) */
router.route("/riderancelleddelivery/:id").get((req, res, next) => {
  
  Order.find({rider: req.params.id, status: "Final", deliverydetails:  "Cancelled"}, function(err, data){
    if (err){
      console.log(err);
    }else{
     console.log(data);
     res.json(data);
    }
   

 });
});

router.route("/adminreceived").get((req, res, next) => {
  
  Order.find({status: "Received"}, function(err, data){
    if (err){
      console.log(err);
    }else{
     console.log(data);
     res.json(data);
    }
   

 });

});

router.route("/adminpending").get((req, res, next) => {
  
  Order.find({status: "Pending"}, function(err, data){
    if (err){
      console.log(err);
    }else{
     console.log(data);
     res.json(data);
    }
   

 });
});


router.route("/admindelivered").get((req, res, next) => {

  Order.find({status: "Final"}, function(err, data){
    if (err){
      console.log(err);
    }else{
     console.log(data);
     res.json(data);
    }
   

 });

});


/*Final Delivery Details */
router.route("/deliverydetailsdelivered").put((req, res, next) => {

  var data = req.body;

  Order.findOneAndUpdate(
    {_id: data._id},
    {$set: {deliverydetails: "Delivered"}},
    function (error, success) {
      if (error) {
          console.log(error);
      } else {
          console.log("success delivery!!!");
          console.log(success);
          res.json(success);
      }
  });  

});


router.route("/deliverydetailspartial").put((req, res, next) => {

  var data = req.body;

  Order.findOneAndUpdate(
    {_id: data._id},
    {$set: {deliverydetails: "Partial Delivery"}},
    function (error, success) {
      if (error) {
          console.log(error);
      } else {
          console.log("partial delivery!!!");
          console.log(success);
          res.json(success);
      }
  });  

});


router.route("/deliverydetailsrescheduled").put((req, res, next) => {

  var data = req.body;

  Order.findOneAndUpdate(
    {_id: data._id},
    {$set: {deliverydetails: "Rescheduled"}},
    function (error, success) {
      if (error) {
          console.log(error);
      } else {
          console.log("Rescheduled!!!");
          console.log(success);
          res.json(success);
      }
  });  

});


router.route("/deliverydetailscancelled").put((req, res, next) => {

  var data = req.body;

  Order.findOneAndUpdate(
    {_id: data._id},
    {$set: {deliverydetails: "Cancelled"}},
    function (error, success) {
      if (error) {
          console.log(error);
      } else {
          console.log("Cancelled!!!");
          console.log(success);
          res.json(success);
      }
  });  

});


router.route("/deliverydetailsrejected").put((req, res, next) => {

  var data = req.body;

  Order.findOneAndUpdate(
    {_id: data._id},
    {$set: {deliverydetails: "Rejected"}},
    function (error, success) {
      if (error) {
          console.log(error);
      } else {
          console.log("Rejected!!!");
          console.log(success);
          res.json(success);
      }
  });  

});




/** New FORGOT password IMPLEMENTATION*/


router.route("/realforgotpasswordemail").post((req, res, next) => {


  const email = req.body.email;
  //const password = req.body.password;

  User.findOne({email})
  .then(user => {
      if(!user){
          return res.status(404).json({email: "email Not Found"})
      }

   //   const secret = JWT_SECRET + user.password;
      const payload = {
        id : user.id,
        name : user.name,
        role : user.role,
        email: user.email,
      };

      const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: 7200 });
      const link = `https://abuad-deliveries-production.up.railway.app/reset-password/${user.id}/${token}`;

      console.log("link formed");
      console.log(token);


      /*send email*/

      var emailemail = req.body.email
      var content = `Please click on the link below to reset your abuaddeliveries password.\n \n \n \nThis link will expire in 2 hours: ${link} \n\n\n\n Please contact us via abuaddeliveries@gmail.com. If you did not request for a password reset.` 
      var mail = {
        from: "abuaddeliveries@gmail.com", 
        to: `${emailemail}, abuaddeliveries@gmail.com`, 
        subject: "Password Reset Link",
        text: content
      }
    
      transporter.sendMail(mail, (err, data) => {
        if (err) {
          res.write({
            status: 'fail'
          })
        } else {
          res.write({
           status: 'success'
          })
        }
      }) 

      console.log("everything soft");




  })
});




router.route('/reset-password/:id/:token').post((req, res, next) => {

  console.log("last api call");
  const { id, token } = req.params;
  const { password, password2 } = req.body;

  const payload = jwt.verify(token, keys.secretOrKey);


  User.findOne({email: payload.email})
  .then(user => {
    if(!user){
      return res.status(404).json({email: "User Not Found"})
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      console.log("this is the hash", hash);
      user
        .save()
        .then(user => {
          console.log(user);
          console.log("reset forgotten password");
        }).catch(err => console.log(err));
    });
  });


  var emailemail = payload.email
  var content = `Your abuaddeliveries Ltd password has been successfully updated\n\n\n\n Please contact us via abuaddeliveries@gmail.com. If you did not reset your password.` 
  var mail = {
    from: "abuaddeliveries@gmail.com", 
    to: `${emailemail}, abuaddeliveries@gmail.com`, 
    subject: "Password Reset Successful",
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.write({
        status: 'fail'
      })
    } else {
      res.write({
       status: 'success'
      })
    }
  }) 
console.log("everything soft x2");

});

});


router.route("/googledistancematrixapi/:pickupplaceid/:deliveryplaceid").get((req, res, next) => {

  axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:${req.params.pickupplaceid}&destinations=place_id:${req.params.deliveryplaceid}&key=AIzaSyC7QKCyGJNmwyUxskdQrFxBFAPeTauZiQg`)
  .then((data) => {
    res.json(data);
  }).catch((error) => {
      res.json(error);
  })


});


/*              E-wallet System                 */


//        View Amount in Ewallet

router.route("/viewbalance/:id").get((req, res, next) => {

  User.find({user: req.params.id}, function(err, data){
     if (err){
         console.log(err);
     }else{
       console.log(data);
      res.json(data);
      console.log("succcess");
      
     }
    
 
  }); 
  
});

/*         Add or Remove Money from Wallet                          */

router.route("/updateaccountbalance/:id").put((req, res, next) => {

  var data = req.body;

  User.findOneAndUpdate(
    { _id: req.params.id},
    { $set: {accountBalance: data.newAccountBalance}},
    function (error, success) {
      if (error) {
          console.log(error);
      } else {
          console.log("success, money added to wallet or removed from  wallet!!!");
          console.log(success); 
          res.json(success);

      }
  });  

});

module.exports = router;

