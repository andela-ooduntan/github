var express = require('express');
var request = require('request');
var router = express.Router();

// var createHandler = require('github-webhook-handler');
// var handler = createHandler({ path: 'https://api.github.com/repos/andela-ooduntan/Riten/hooks', secret: 'oluwatobiloba' })
var access_token = 'a1775fe6a0224ace9152be6df100c912d89eea98';
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
      console.log( JSON.parse(body)[0])
      res.render('index', { issues: JSON.parse(body) });


    })

  // handler(req, res, function (err) {
  //   console.log(err, 'this is error')
  //   // res.statusCode = 404
  //   // res.end('no such location')
  // })

});

router.post('/', function(req, res) {
  res.io.emit("new-issue", res.req.body);
  res.send('respond with a resource.');
  // res.render('index', { issues: reactiveIssue });
})

// handler.on('issues', function (event) {
//   console.log('Received an issue event for %s action=%s: #%d %s',
//     event.payload.repository.name,
//     event.payload.action,
//     event.payload.issue.number,
//     event.payload.issue.title)
// })

// handler.on('error', function (err) {
//   console.error('Error:', err.message)
// })


module.exports = router;
