const { videoContent: videoContent } = require("../models/video.scheme");
const mongodb = require('mongodb');
const Mongo  = require('../config/mongo.config')
const jwt = require("jsonwebtoken");
const {DB_URL} = process.env

const newVideoController = {

  // add video
  addVideo: async (req, res) =>{
    const { contentTitle, genre, language, releaseDate, type} = req.body;
    const payload = jwt.verify(req.header('authorization'), process.env.JWTPRIVATEKEY)
      const newVideoContent = new videoContent({
        contentTitle: contentTitle,
        genre: genre,
        type: type,
        releaseDate: releaseDate,
        language: language,
        creatorID: payload.id,
      });
  
      newVideoContent.save().then((videoContentInfo) => {
        // newVideoController.uploadVideo()
        res.json(newVideoContent)
        console.log('upload video with the statement above')
      });
  }, 
  
  getVideos: async (req, res) =>{
    try{
      const payload = jwt.verify(req.header('authorization'), process.env.JWTPRIVATEKEY)
      let creatorID = payload.id
      let videos = await videoContent.find({creatorID})
      // console.log(videos)
      res.json({'videos': videos, 'token': req.body.token})
    }catch(err){
      res.send(err)
    }
  },

  uploadVideo: async(req, res) =>{

          const db =  await Mongo(`${DB_URL}`)
          // Create GridFS bucket to upload a large file
          const bucket = new mongodb.GridFSBucket(db);

          // create upload stream using GridFS bucket
          const videoUploadStream = bucket.openUploadStream(res.videoFile);

          // You can put your file instead of bigbuck.mp4
          const videoReadStream = fs.createReadStream(res.videoFile);

          // Finally Upload!
          videoReadStream.pipe(videoUploadStream);
  }
}

module.exports = newVideoController;

