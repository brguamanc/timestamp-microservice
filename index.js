var express = require('express');
var app = express();


var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));


app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api', (req, res) => {
  let date = new Date()
  let json = { unix: date.getTime(), utc: date.toUTCString() }
  res.send(json)
})

app.get('/api/:date_string', (req, res) => {
  let date_string = req.params.date_string;
  let json;
  let date;

  if (/-/g.test(date_string)) {
    date = new Date(date_string)
  } else if (/ /g.test(date_string)) {
    date = new Date(date_string)
  } else {
    date = new Date(Number(date_string))
  }

  if (date.getTime() === null || date.toUTCString() === "Invalid Date") {
    json = { error: "Invalid Date" }
  } else {
    json = { unix: Number(date.getTime()), utc: date.toUTCString() }
  }

  res.json(json)
})

var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
