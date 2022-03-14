const express = require('express');
const app = express();
const cors = require('cors');

//settings
app.set('appName', 'Labo');
app.set('port', process.env.PORT || '3000');

//middlewares
app.use(express.json());//cuando el cliente mande un archivo json el node lo pueda entender y transformarlo en un js.
app.use(express.urlencoded({extended: false}));//para cuando el cliente mande un formulario pero que se procese como un objeto.

//
//const whiteList = ['http://localhost:4200/login'];
app.use(cors());

//routes
app.use(require('./routes/index.js'));

app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.listen(app.get('port'));
console.log('Server', app.get('appName'), 'on port', app.get('port'));
