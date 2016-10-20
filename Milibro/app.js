var express = require('express');
var app = express();
var path = require('path');
var expressLayouts = require('express-ejs-layouts');



app.set('port', process.env.PORT || 8080);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
app.use(expressLayouts);

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'gh-pages')));


app.get('/', function(request, response) {
  response.send('index');  
});

app.listen(app.get('port'), function() {
  console.log('Puerto utilizado:'+app.get('port'));
});

module.exports = app;