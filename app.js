const express= require('express');
const path= require('path');
const bodyParser= require('body-parser');
const cors= require('cors');
const passport= require('passport');
const mongoose= require('mongoose');
const config= require('./config/database');

//connect to Database
mongoose.connect(config.database);

//on  connection
mongoose.connection.on('connected', ()=> {
	console.log('Connected to database: '+ config.database);
});

//on  Error
mongoose.connection.on('error', (err)=> {
	console.log('Database error: '+ err);
});

const app= express();

const users= require('./routes/users');

//port number
const port= process.env.port || 8080;

//cors middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Paerser middlerware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use('/users', users);

//index route
app.get('/', (req, res)=> {
	res.send('Invalid Endpoint');
});

app.get('*', (req, res)=> {
	res.sendFile(path.join(__dirname, 'public/index.html'));
})

//start server
app.listen(port, () =>{
	console.log("Server start on port " + port);
});