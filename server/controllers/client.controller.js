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
      const client = await new Client({
        password: hashedPassword,
        email,
        businessName: businessName,
        businessAddress: businessAddress,
        phone: phone,
      });
      client.save().then((clientInfo) => {
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
            return res.sendStatus(401);
          }
          const passOk = bcrypt.compareSync(password, clientInfo.password);
          if (passOk) {
            console.log(clientInfo)
            const token = jwt.sign({id:clientInfo._id, email}, process.env.JWTPRIVATEKEY)
            res.set("x-access-token", token)
            res.json({auth :true, token:token, data:clientInfo })
          } else {
            res.sendStatus(401);
          }
        })

    }catch (err){
      res.send(err.message)
    }
  },

  dashboard: async (req, res) =>{
    res.json('dashboard')

  }, 

  uploadVideo: async (req, res) =>{  
    console.log('uploadVideo')
  }
  
}

module.exports = newClient;

