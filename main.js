const express = require('express');
const fileUpload = require('express-fileupload');
const asyncHandler = require('express-async-handler');
const app = express();
app.use(fileUpload());


  async function quickstart(e) {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
    const fs= require('fs');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
    const filename = e;
    const request ={
        image: {content: fs.readFileSync(filename)},
    };
    // Performs label detection on the image file
    try{
        const [result] = await client.objectLocalization(request);
    const objects = result.localizedObjectAnnotations;
    const a=[];
    objects.forEach(object => {
        
        a.push(object.name + " ");
      });
      return a;
    } catch(err){
        console.log(err);
    }
    }
     

  app.post('/upload', (req, res)=>{
    
    try{
      if(req.files === null){
          return res.status(400).json({msg: 'no file uploaded'});
      }
      const file=req.files.file;
      file.mv(`${__dirname}/${file.name}`, err=>{
        if(err){
            console.error(err);
            return res.status(500).send(err);
        }
        console.log('success');
      });  
    } catch(err) {
      console.log(err);
    }
      
  });

  app.post('/generate', async(req, res)=>{
    
    try{
      if(req.files === null){
        return res.status(400).json({msg: 'no file uploaded'});
    }
      const file=req.files.file;
      const object = await quickstart(file.name);
      res.json({fileObject: object});     
      
    } catch(err) {
      console.log(err);
    }
      
  });

app.listen(5000, ()=>console.log('server running'))