/*
* Copyright © manikineko.nl and mneko.space Dev Team all rights reserved
*  
*/
var express = require('express'); //Express API
var router = express.Router(); //Router API
var config = require("../../../config.json") //Config File
var nasa = require('nasa-sdk'); //Nasa API
/* GET users listing. */
router.get('/search/:type/:q', function(req, res, next) {
  //Variables used for data processing
  var data = ``;
  var urls = [""];
  var htmldata = "";

  //Set Nasa Key
  nasa.setNasaApiKey(config.apikey);
  //Were Using the image API
  nasa.Images
  .search({
    //What do we search for?
    q: req.params.q,
    media_type: req.params.type,
  })
  .then(_data =>  {
    //Data = the data we provided
    data = _data
    //Debug: Print Data(Disabled)
    //console.log(JSON.stringify(_data));
    //Define the JSON Object
    const obj = _data; 
    //Debug: Print Data(Disabled)
   // console.log(JSON.stringify(_data));
   //For Loop For Images
    obj.collection.items.forEach(item => {
      //For Loop For Links in image
      item.links.forEach(item => {
        //Add Link to url list
     urls[urls.length] = item.href;
     //Set HTML Data and inject the url
      htmldata += `<img src="${item.href}" alt="Mars Photo">\n`;
     
    });
   
    
  } )
  //Set Credits for NASA
  htmldata += `<pre><p><small>Data Copyright: NASA\n </small></p></pre>`
  //Site Copyrights No touchy
  htmldata += `<pre><p><small>Site Copyright: manikineko.nl and mneko.space Dev Team Dev team\n </small></p></pre>`

  //Send Data to client
  res.send(htmldata);
} )
  .catch(err => {
    //ERROR lets set status
    res.sendStatus(500);
    //Now we print error to console!
    console.error(err);
    //Old code dont use!
   // res.send(err.stack);
  });
  
  
 
 // res.send(data); 

});
  router.get('/',function(req,res,next){
    res.render('mars', { year:new Date().getFullYear() ,title: "Mars Pictures  of the Year!"});
  });
module.exports = router;
