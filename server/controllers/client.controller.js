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

  addUser: async (req, res) =>{
    try {
    // create and add user to the database
    const payload = jwt.verify(req.body.token, process.env.JWTPRIVATEKEY);

    const hashedPassword = bcrypt.hashSync('1234', 10);
    const user = await new User({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: req.body.role,
      phone: req.body.phone,
      password: hashedPassword,
      companyId: new mongoose.Types.ObjectId(payload.id)
    });
    user.save().then((user) => {
      
      res.sendStatus(201)
    });
    } catch (err) {
      res.send(err.message)
    }
    
  },

  viewUsers: async (req, res) =>{
    res.send('no current users')

  },

  viewAnalytics: async (req, res) =>{

  },

  payments: async (req, res) =>{

  },

  notifications: async (req, res) =>{

},

  settings: async (req, res) =>{

  },
};

// module.exports = router;
module.exports = newClient;

