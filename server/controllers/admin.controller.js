const { Client } = require("../models/client.scheme");
const { videoContent: videoContent } = require("../models/video.scheme");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

// const router = express.Router();

const newAdmin = {
    getCreators: async (req, res) => {
        const payload = jwt.verify(req.headers['authorization'], process.env.JWTPRIVATEKEY)
        try{
            if(payload.role !== "admin"){
                return res.status(401).json({
                    message: "unauthuthorized",
                })
            }else{
                await Client.find().then ( creators => {
                    res.json({
                        "creators": creators
                    })
                })
            }
        }catch(e) {
            console.log(e);
        }

    },

    reviewCreators: async (req, res) => {
        const { businessName, setToActive } = req.body;
        try {
            // const client = await Client.findOne({businessName}).then ( creator => {
            //     creator.active = setToActive
            // })
            await Client.findOneAndUpdate({businessName: businessName }, {active: setToActive}).then( client => {
                res.json({
                    'message': "creator status updated",
                    'status': client
                })
            }
                
            );

        }catch(e) {
            console.log(e);
        }

    },

    reviewVideos: async (req, res) => {
        const payload = jwt.verify(req.headers['authorization'], process.env.JWTPRIVATEKEY)
        const { videoID, setToActive, notes } = req.body
        try {
            await videoContent.findByIdAndUpdate(videoID, {

                'status': {
                    'approved': setToActive,
                    'reviewedBy': {
                        'id': payload.id,
                        'email': payload.email
                    },
                    'notes': notes,
                    'reviewDate': new Date().toLocaleDateString('en-GB')
                }
            },
            function(error, status){
                if(error) {
                    console.log('ERROR', error)
                }else{
                    // console.log('STATUS', status)
                    res.json({
                        'message': 'this video has reviewed',
                        status: status
                    })
                }
            })

        }catch(e) {
            console.log(e);
        }

    },

    getVideos: async (req, res) =>{
        try{
            const payload = jwt.verify(req.headers['authorization'], process.env.JWTPRIVATEKEY)
            if (payload.role !== 'admin'){
                return res.status(401).json({
                    message: 'Unauthorized'
                })
            }else{
                let videos = await videoContent.find()
                res.json({'videos': videos})
            }
          }catch(e){
            console.log(e)
            res.send("could not get videos")
          }
      },

    // SU CONTROLLERS
    getReviewers: async (req, res) => {

    },

    addReviewer: async (req, res) => {

    },
}

module.exports = newAdmin;

