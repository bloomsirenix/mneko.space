/*
* Copyright © manikineko.nl and mneko.space Dev Team all rights reserved
* Usage and/or Modification are Prohibited, Without permission of the site domain owner!
*/
var express = require('express'); //Express API
var router = express.Router(); //Router API
var config = require("../../../config.json"); //Config File
var nasa = require('nasa-sdk'); //Nasa API
/* GET users listing. */
router.get('/', function(req, res, next) {
 //Variables used for data processing
  var data = ``;
  var urls = [""];
  
   //Set Nasa Key
  nasa.setNasaApiKey(config.apikey); 
  //Use the NEO API
  nasa.NEO
  .feedToday()
  .then(_data => {
    //Debug the JSON to console(Disabled)
    //onsole.log(JSON.stringify(_data));
 
    //Redefine data to contain the actual data
    data = _data
    //Debug the JSON to console(Disabled)
    //console.log(_data);

    //Make an variable with data(for ease of access)
    const obj = _data;

    //HTML Variable
    var htmldata = "";
    //Header
    htmldata += `<pre><h>Astroids Near Earth</h>\n`;
    //Debug the date(Disabled)
    //console.log(new Date().getFullYear() + "-0" + (new Date().getMonth()+1) + "-" + new Date().getDate())
   
    //Begin Loop for all N.E.O objects
    obj.near_earth_objects[new Date().getFullYear() + "-0" + (new Date().getMonth()+1) + "-" + new Date().getDate()].forEach(astroid => {
      //Add NASA URL to list
        urls[urls.length] = astroid.nasa_jpl_url;

         //Check if astroid is dangerous
        if(astroid.is_potentially_hazardous_asteroid){
          //If Astroid is potentialy dangerous!
          htmldata += `<pre><b>Astroid: <a href="${astroid.nasa_jpl_url}">${astroid.name}</a> is an potentialy dangerous Astroid!</b>\n</pre>`;
        }
       else
       {
         //if its just a run of the mill astroid!
        htmldata += `<pre><b>Astroid: <a href="${astroid.nasa_jpl_url}">${astroid.name}</a> an harmless Astroid</b>\n</pre>`;

       }
       
    });
    //Copyrights No touching here!
    htmldata += `<pre><p><small>site Copyright: manikineko.nl and mneko.space Dev Team Dev team\n </small></p></pre>`
    //Send Data
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
  
 //Old code dont use
  // res.render('neo', { date:new Date().toDateString() ,title: "Astroid Data"});
  } );
module.exports = router;
