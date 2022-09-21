const { Client } = require("../models/client.scheme");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

// const router = express.Router();

const newClient = {

  // client sign up
  signUp: async (req, res) =>{
    const { email, password, businessName, businessAddress, phone } = req.body;
    console.log(req.body)
      const hashedPassword = bcrypt.hashSync(password, 10);
      const client = new Client({
        password: hashedPassword,
        email,
        businessName: businessName,
        businessAddress: businessAddress,
        phone: phone,
      });
      await client.save().then((clientInfo) => {
        jwt.sign(
          { id: clientInfo._id, email: clientInfo.email },
          process.env.JWTPRIVATEKEY,
          (err, token) => {
            if (err) {
              console.log(err);
              res.sendStatus(500);
            } else {
              console.log( clientInfo)
                // .cookie("token", token)
                res.json({ id: clientInfo._id, email: clientInfo.email, myToken: token });
            }
          }
        );
      });
  },

  // client login
  login: async(req, res) => {
    const { email, password } = req.body;
    try{
      await Client.findOne({email})
        .then(clientInfo => {
          if (!clientInfo) {   
            console.log('user not found')
            return res.sendStatus(401);
          }
          // changed compareSync to compare because i encounterd a strange bug
          const passOk = bcrypt.compare(password, clientInfo.password)
          console.log(passOk)
          if (!passOk) {
            console.log('wrong email/password')
            res.sendStatus(401);
          } else {
            console.log('login success')
            console.log(clientInfo.email)
            const token = jwt.sign({id:clientInfo._id, email, role: clientInfo.role}, process.env.JWTPRIVATEKEY)
            res.set({
              // "x-access-token": token,
              "authorization": token
          })
            res.json({auth :true, role:clientInfo.role, data:clientInfo })
          }
        })
    }catch (err){
      res.send(err.message)
    }
  },

  dashboard: async (req, res) =>{
    res.json('dashboard')

  },   
}

module.exports = newClient;

