const { request } = require("express");
const express = require("express");
// var cors = require('cors');
const validator = require("validator");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/Authenticate");
require("../db/conn");
const User = require("../model/userSchema");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// var app = express();
// app.use(cors({origin:"http://localhost:3000"}));

// router.post("/register", (req, res) => {
//   console.log(req.body);
// res.json({message:req.body});

// });
//using promises
//  router.post('/signup',(req,res)=>{

//    const {firstname,lastname,phone, email,password,cpassword}=req.body;//object destructuring

//    if (!firstname ||!lastname || !phone || !email || !password || !cpassword) {
//       return res.status(422).json({error:"plz fill all field properly"})
//    }

//    User.findOne({email:email})//this connects email from userschema.js to this email from auth.js
//    .then((userExist)=>{
//       if (userExist) {
//          return res.status(422).json({error:"this email already exists"})
//       }
//     const user = new User ({firstname,lastname,phone,email,password,cpassword})//if both key and value and are same no need to write twice
//     user.save().then(()=>{
//        res.status(201).json({message:"user registetred sucessfully"})
//     //    console.log(req.body);
//     }).catch((err)=>res.status(500).json({error:"failed to register"}))

//    }).catch(err=>{console.log(err);
//    })

//  })

//registration code
router.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, phone, email, password, cpassword } = req.body; //object destructuring

    if (
      !firstname ||
      !lastname ||
      !phone ||
      !email ||
      !password ||
      !cpassword
    ) {
      return res.status(400).json("plz fill all field properly");
    }
    if (phone < 0) {
      return res.status(401).json("Phone number cannot be negative!");
    } else if (phone.length < 11) {
      return res.status(401).json("Must be integers 11 or 12 in phone number!");
    }

    if (!validator.isEmail(email)) {
      return res.status(420).json(" This email is Invalid!");
      // throw new Error("Email is Invalid");
    }

    const userExist = await User.findOne({ email: email }); //this connects email from userschema.js to this email from auth.js

    if (userExist) {
      return res.status(421).json("Email already exists!");
    } else if (!validator.isStrongPassword(password)) {
      return res
        .status(422)
        .json(
          "Hint: To make password stronger,use Upper & Lower case letters, numbers & symbols!"
        );
    } else if (password != cpassword) {
      return res.status(423).json("Password didnt match!");
    } else {
      const user = new User({
        firstname,
        lastname,
        phone,
        email,
        password,
        cpassword,
      }); // adding data to database || if both key and value and are same no need to write twice
      //hashing done before save
      await user.save(); //saving data in user constant
      res.status(201).json("Registration Successfully");
      //  console.log(req.body);
    }
  } catch (error) {
    console.log(error);
  }
});

//  router.get('/contact',(req,res)=>{
//     res.send(`hello contact`)
//  })
//  router.get('/signin',(req,res)=>{
//     res.send(`hello sign in`)
//  })
//  router.get('/signup',(req,res)=>{
//     res.send(`hello sign up`)
//  })

//signin code

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body; //getting email password by object destructring

    if (!email || !password) {
      return res.status(400).json("Empty Login Fields");
    }
    const userLogin = await User.findOne({ email: email });
    //  console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password); //comparing hashed password with login passwords
      // console.log(userLogin);

      if (!isMatch) {
        res.status(402).json("Invalid Credentials!"); //dono me invalid credential he dena hai taaki hacker ko pata na chale
      } else {
        const token = await userLogin.generateAuthToken(); //calling function from userschema

        //   console.log(`the token is :- ${token}`);

        res.cookie("jwtoken", token, {
          //takes name:string and value:string(this value comes from userschema )
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true, //for secure connection
        });
        res.status(201).json("user signin sucessfully!");
      }
    } else {
      res.status(401).json("Invalid Credentials!"); //dono me invalid credential he dena hai
    }
  } catch (error) {
    console.log(error);
  }
});

//for payment stripe
router.post("/payments/create", authenticate, async (req, res) => {
  const total = req.query.total;
  // console.log(
  //   "Payment Request Recieved BOOM!!! for this amount >>> ",
  //   total
  // );
  // const finalTotal = await parseFloat(total).toFixed(2);
  const finalTotal = Math.round(total);
  console.log(
    "Payment Request Recieved BOOM!!! for this amount >>> ",
    finalTotal
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalTotal * 100, // subunits of the currency is compulsory for stripe smaller subunits cents...
    currency: "usd",
    receipt_email: req.rootUser.email, //req.rootUser.email I am getting from the authenticate(middleware) function.
  });

  // OK - Created
  res.status(200).json({
    clientSecret: paymentIntent.client_secret,
  });
});
//for payment page

router.get("/payments", authenticate, (req, res) => {
  // console.log(`hello payments page`);
  res.status(200).send(req.rootUser); //as req.rootuser contains all data of user logged in
});

//for prime video free trial page
router.get("/primevideos_freetrials", authenticate, (req, res) => {
  // console.log(`hello primevideos_freetrials page`);
  res.status(200).send(req.rootUser); //as req.rootuser contains all data of user logged in
});
//for orders page
router.get("/orderss", authenticate, (req, res) => {
  // console.log(`hello Orderss page`);
  res.status(200).send(req.rootUser); //as req.rootuser contains all data of user logged in
});

//for basket
router.post("/basket", authenticate, async (req, res) => {
  try {
    const { basket, totalAmount } = req.body; //getting basket and totalAmount by object destructring
    const userLogin = await User.findOne({ _id: req.userID });
    //  console.log(userLogin);

    if (userLogin) {
      const resbasket = await userLogin.addBasket(basket, totalAmount); //calling function from userschema

      // console.log(resbasket);
      res.status(200).json(resbasket);
    } else {
      res
        .status(400)
        .json(
          "User have no token/document thats why , where will we add the basket"
        );
    }
  } catch (error) {
    console.log(error);
  }
});

//get user data for contact ,home page, welcome prime page and orders page
router.get("/getdata", authenticate, (req, res) => {
  // console.log(`hello contact and home`);

  res.status(200).send(req.rootUser); //as req.rootuser contains all data of user logged in
});

//contact us ka page
router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      // console.log(`please fill the complete form `);
      // alert('please fill the complete form')
      return res.status(400).json("please fill the complete form ");
    }

    const userContact = await User.findOne({ _id: req.userID });

    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );

      await userContact.save();

      res.status(200).json("Message Sent Successfully");
      // console.log("user message saved sucessfully");
    }
  } catch (error) {
    console.log(error);
  }
});

//Logout out page
router.get("/logout", (req, res) => {
  //  console.log(`hello logout`);
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).json("User logout Successfully");
});

module.exports = router;
