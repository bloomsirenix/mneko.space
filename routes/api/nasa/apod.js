/*
* Copyright © manikineko.nl and mneko.space Dev Team all rights reserved
*  
*/
var express = require('express'); //Express API
var router = express.Router(); //Router API
var config = require("../../../config.json") //Config File
var nasa = require('nasa-sdk'); //Nasa API
/* GET users listing. */
router.get('/', function(req, res, next) {
  //Variables used for data processing
  var data = ``;
  var urls = [""];
  var htmldata = "";  
  //Set Nasa Key
  nasa.setNasaApiKey(config.apikey);

  //Were Using the APOD API
  nasa.APOD.fetch()
  .then(_data => {
    //Actual Data Processing
    data = _data;

    //Debug: Logging data to console(Disabled)
    //console.log(_data);

    //Set Title
    htmldata += `<b><pre><h>${_data.title}</h></pre></b>`;
    //Set Explaination
    htmldata += `<pre><p>${_data.explanation}</p></pre>`
    //Set Image Coprights
    htmldata += `<pre><p><small>Image: Coptyright ${_data.copyright}  ${_data.date}\n </small></p></pre>`
    //Set the Actual APOD Image
    htmldata += `<pre><img src="${_data.url}" alt="APOD.Image">\n</pre>`;
    //Site Copyrights no touchy
    htmldata += `<pre><p><small>site Copyright: manikineko.nl and mneko.space Dev Team Dev team\n </small></p></pre>`
    //Send it all
    res.send(htmldata);
  
  })
  .catch(err => {
    //ERROR lets set status
    res.sendStatus(500);
    //Now we print error to console!
    console.error(err);
    //Old code dont use!
   // res.send(err.stack);
  });
  
  
  
 

});
module.exports = router;
