const dotenv = require('dotenv');
dotenv.config({path:'../../.env'});

const mongoose = require('mongoose');

const express = require('express');
const app = express();
app.use(express.json());

const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

const cors = require('cors');
const uuid4 = require('uuid').v4;


var corsOptions = {
    origin: 'http://localhost:8081',
    optionsSuccessStatus: 200 
  }
// connection to mongoDB
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.quq8c.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {   
    useNewUrlParser: true,
    useUnifiedTopology: true })

  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  

    
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//app.use(cors(corsOptions));

app.use('/images', express.static('images'));
app.use(express.static('images'));


app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes) ;

module.exports = app;