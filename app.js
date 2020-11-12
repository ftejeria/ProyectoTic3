// Imports
const express = require('express')
const app = express()
const port = 5000
const dbService =require('./config/dbConnection');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/images'))
app.use(cors());

// Set View's
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

// Navigation




/*app.get('/',(req,res) =>{
    connection.query('SELECT * FROM EXAMENES',(err,result) =>{
        res.render('index',{news:result}
        );
        
    });
    
);*/
app.post('/insert', (request, response) => {
    
    const { nombre,periodo,semestre ,fecha,salon,horario,carrera} = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewName(nombre,periodo,semestre ,fecha,salon,horario,carrera);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
    
})

app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    

    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

app.patch('/update', (request, response) => {
    const { id, name } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameById(id, name);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

app.get('/search/:name', (request, response) => {
    const { name } = request.params;
    console.log(name)
    const db = dbService.getDbServiceInstance();

    const result = db.searchByName(name);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})




// Listen on Port 5000
app.listen(port, () => console.info(`App listening on port ${port}`))