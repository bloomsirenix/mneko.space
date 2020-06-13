/*
* Copyright © manikineko.nl and mneko.space Dev Team all rights reserved
*  
*/
var express = require('express'); //Express API
var router = express.Router(); //Router API
var config = require("../../../config.json") //Config File
var nasa = require('nasa-sdk'); //Nasa API
/* GET users listing. */
router.get('/:rover/:sol', function(req, res, next) {
  //Variables used for data processing
  var data = ``;
  var urls = [""];

  //Set NASA Key
  nasa.setNasaApiKey(config.apikey);
  //Were using NASA Mars Photos API
  nasa.MarsPhotos
  .fetch(req.params.rover, {
    //camera to use and year
    camera: 'navcam',
    sol: req.params.sol
  })
  .then(_data =>  {
    //Set the data to the output of this
    data = _data
    //Debug: Send Data to console(Disabled)
   // console.log(JSON.stringify(_data));
   //Data to object
    const obj = _data;
    //HTML data variable
    var htmldata = "";
    //For loop for photos
    obj.photos.forEach(photo => {
     //Add the image url to the url list
     urls[urls.length] = photo.img_src;
     //Convert Image URL to HTML Image
     htmldata += `<img src="${photo.img_src}" alt="Mars Photo">\n`;
    });
    //Credits
    htmldata += `<pre><p><small>Images Copyright: NASA\n </small></p></pre>`
    //Site Copyright no touchy!
    htmldata += `<pre><p><small>site Copyright: manikineko.nl and mneko.space Dev Team Dev team\n </small></p></pre>`
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
  
  
  
  

});
  router.get('/',function(req,res,next){
    res.render('mars', { year:new Date().getFullYear() ,title: "Mars Pictures  of the Year!"});
  });
module.exports = router;
