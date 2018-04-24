const express = require('express')
const app = express()
var firebase = require('firebase');


var config = require('./config')

firebase.initializeApp(config);
var database = firebase.database();

function saveQuestionToDatabase(questionObject){
  let ref = database.ref("/questions");
  ref.push(questionObject);
}

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true }); // for parsing form data
app.use(urlencodedParser);

// set the view engine to ejs
app.set('view engine', 'ejs');

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
function getQuestionFromDatabase(cb){
  let ref = database.ref("/questions");
  ref.once("value", function(snapshot) {
    if(snapshot.val() != null){
      let data = snapshot.val();
      let keys = Object.keys(data);
      shuffle(keys);
      cb(data[keys[0]]);
    }else{
      cb({
        id: "000",
        question: "There has, in fact, never (ever) been a question asked before."
      });
    }
  });
}


// index page
app.get('/', function(req, res) {
  getQuestionFromDatabase(function(questionObject){
    res.render('index.ejs', {question: questionObject.question, parent: String(questionObject.id)});

  });
});


function makeRandomId() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

// route waiting for replies:
app.post('/question/', function(req, res) {
  var infoFromClient = req.body;
  // console.log(infoFromClient);
  let newQuestionObject = {
    date: Date.now(),
    id: String(makeRandomId()),
    question: req.body.question,
    parent: String(req.body.parent)
  }
  saveQuestionToDatabase(newQuestionObject);
  res.status(200);
  res.send();
});

function serverIsListening(){
  console.log('Example app listening on port 8000!')
}

app.use(express.static('public'))
app.listen(8000, serverIsListening)
