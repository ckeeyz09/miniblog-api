// require express framework and additional modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    _ = require('underscore');

var statusArray = [
  {
    id: 1,
    game: "Shovel Knights",
    status: "This is a weird little game."
  },
  {
    id: 2,
    game: "League of Legends",
    status: "I love this game with all my heart!"
  },
  {
    id: 3,
    game: "Payday 2",
    status: "A shooter that doesn't pit you against teenagers with no time on their hands!"
  }
];

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));


//STATIC ROUTES

// serve js and css pages on main page
app.use(express.static(__dirname + '/public'))


// set up root route to respond with index.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

//API ROUTES

//status index
app.get('/api/status', function (res, req) {
  //send all status as JSON response
  console.log(statusArray);
  res.json(statusArray);
});

//create new status
app.post('/api/status', function (req, res) {
  // grab params from form data (image, game, status)
  var newStatus = req.body;

  //set sequential id (last id in statusArray +1)
  if (statusArray.length > 0) {
    newStatus.id = statusArray[statusArray.length - 1].id + 1;
  }
  else {
    newStatus.id = 0;
  }

  //add newStatus to statusArray
  statusArray.push(newStatus);

  //send newStatus as JSON response
  res.json(newStatus);
});

// update status
app.put('/api/phrases/:id', function (req, res) {

  //set the value of the id
  var targetId = parseInt(req.params.id);

  // find item in statusArray matching the id
  var foundStatus = _.findWhere(statusArray, {id: targetId});

  // update the status image
  foundStatus.image = req.body.image;

  // update the status game
  foundStatus.game =req.body.game;

  //update status body text
  foundStatus.status = req.body.status;

  // send back edited phrase
  res.json(foundStatus);
})

// delete status
app.delete('/api/status/:id', function (req, res) {

    //set the value of the id
  var targetId = parseInt(req.params.id);

  // find item in statusArray matching the id
  var foundStatus = _.findWhere(statusArray, {id: targetId});

  // get the index of the found item
  var index = statusArray.indexOf(foundStatus);

  // remove the item at that index, only remove 1 item
  statusArray.splice(index, 1);

  // send back the deleted item
  res.json(foundStatus);
});


// listen on port 5000
app.listen(5000, function () {
  console.log('server started on localhost:5000');
});