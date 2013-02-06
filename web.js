
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

mongoose.connect('mongodb://tododb:tododb@ds033097.mongolab.com:33097/tododb');

mongoose.connection.on('open', function() {
    console.log('Connected to Mongoose');
});

var Schema = mongoose.Schema

var Todo = new Schema({
    name : {type: String, required: true, trim: true},
    status : {type: String, trim: true}
});
var TodoModel = mongoose.model('Todo', Todo);

 /*var tm = new TodoModel({name:'farhan',status:true});
 tm.save(function(err,data){
    if(err){
        console.log("Its error")
    }
    else
    {
        console.log("data saved");
        console.log(data);
    }
})*/

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

app.get('/', routes.index);

// REST api
app.get('/api', function (req, res) {
    res.send('Todo API is running');
});

// POST to CREATE
app.post('/api/todos', function (req, res) {
    var todo;
    console.log("POST: ");
    console.log(req.body);
    todo = new TodoModel({
        name: req.body.name,
        status: req.body.status
    });
    todo.save('save',function (err,next) {
        if (!err) {
            return console.log("created");
        } else {
            return console.log(err);
        }
        next();
    });
    return res.send(todo);
});

// Single update
app.put('/api/todos/:id', function (req, res) {
    return TodoModel.findById(req.params.id, function (err, todo) {
        todo.name = req.body.name;
        todo.status = req.body.status;

        return todo.save(function (err) {
            if (!err) {
                console.log("updated");
            } else {
                console.log(err);
            }
            return res.send(todo);
        });
    });
});

// List products
app.get('/api/todos', function (req, res) {
    return TodoModel.find(function (err, todos) {
        if (!err) {
            return res.send(todos);
        } else {
            return console.log(err);
        }
    });
});

// Single product
app.get('/api/todos/:id', function (req, res) {
    return TodoModel.findById(req.params.id, function (err, todo) {
        if (!err) {
            return res.send(todo);
        } else {
            return console.log(err);
        }
    });
});

// remove a single product
app.delete('/api/todos/:id', function (req, res) {
    return TodoModel.findById(req.params.id, function (err, todo) {
        return todo.remove(function (err) {
            if (!err) {
                console.log("removed");
                return res.send('');
            } else {
                console.log(err);
            }
        });
    });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
