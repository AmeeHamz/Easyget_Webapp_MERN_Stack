const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const validator = require("validator");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "The minimum length should contain 3 characters"],
    maxlength: [20, "The maximum length should contain 20 characters"],
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "The minimum length should contain 3 characters"],
    maxlength: [20, "The maximum length should contain 20 characters"],
  },
  phone: {
    type: Number,
    required: true,
    trim: true,
    validate(value) {
      if (value < 0) {
        throw new Error("phone number cannot be negative");
      }
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  orders: [
    {
      basket: {
        type: Array,
        required: true,
      },
      totalAmount: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  messages: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: Number,
        required: true,
        trim: true,
      },
      message: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//hashing password
userSchema.pre("save", async function (next) {
  if (this.isModified("firstname")) {
    this.firstname =
      this.firstname.charAt(0).toUpperCase() +
      this.firstname.slice(1).toLowerCase();
  }
  if (this.isModified("lastname")) {
    this.lastname =
      this.lastname.charAt(0).toUpperCase() +
      this.lastname.slice(1).toLowerCase();
  }

  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

//we are generating token

userSchema.methods.generateAuthToken = async function () {
  //we use a method of userschema
  try {
    let tokenNew = jwt.sign({ _id: this._id }, process.env.SECRET_KEY); //it takes payload(must be unique ex->_id) and secret/private key [options,callback]
    this.tokens = this.tokens.concat({ token: tokenNew }); //it concats(joins string) one token to the other token in the Tokens section of mongoose schema
    await this.save();
    return tokenNew; //returning token so that we can use it in auth.js
  } catch (error) {
    //we are getting _id from mongodb || this refers to a particular user details
    console.log(error);
  }
};

// storing the message
userSchema.methods.addMessage = async function (name, email, phone, message) {
  try {
    this.messages = this.messages.concat({ name, email, phone, message }); //key value pair is same
    await this.save();
    return this.messages;
  } catch (error) {
    console.log(error);
  }
};

//storing the orders field in the document
userSchema.methods.addBasket = async function (basket, totalAmount) {
  try {
    this.orders = this.orders.concat({ basket, totalAmount }); //key value pair is same
    await this.save();
    return this.orders;
  } catch (error) {
    console.log(error);
  }
};

//collection creation

const User = mongoose.model("USER", userSchema);

module.exports = User;
