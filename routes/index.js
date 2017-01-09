var express = require('express');
var request = require('request');
var router = express.Router();

var access_token = 'f7a9d79ba65b11248c0604ba1260b406fafcf4a6';
/* GET home page. */
router.get('/', function(req, res, next) {
  var url = "https://api.github.com/repos/andela-ooduntan/Riten/issues?per_page=100&page=1&sort=created&state=open&access_token=" + access_token;
  request(
    {
      url: url,
      headers: {
        'User-Agent': 'request'
      }
    }, function (error, response, body) {
      console.log( JSON.parse(body))
      res.render('index', { issues: JSON.parse(body) });


    })


});

router.post('/', function(req, res) {
  res.io.emit("new-issue", res.req.body);
  res.send('respond with a resource.');
})



module.exports = router;
