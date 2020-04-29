const express = require(`express`);
const nocache = require(`nocache`);
const bodyParser = require('body-parser');

const config = require(`./config`);

//Inicializer
const app = express();
let users =[];

//middleware

const logger =(req, res, next) =>
{
    console.log(`Hubo una petición`);
    next();
};

//config
app.use(nocache());
app.use(bodyParser.json());
app.use(logger);

//routes
app.get(`/`,(req, res)=>{
    res
    .sendStatus(500);
    //.send(`No esta disponible esta pagina`); //req es required y res es response y lo que hace es que envia una respuesta
});

app.get(`/users`, (req, res)=>{
    let cadena =``;

    for (u in users)
    {
        cadena += `\nid ${users[u].id} - nombre ${users[u].name}`;
    }
    res
    .status(200)
    .send(`Usuarios: ${cadena}`); 
    
});
app.get(`/users/:id`,(req, res)=>{
    const id = req.params.id;
    if (id==1){
    res
    .status(200)
    .send(`Este es el usuario ${req.params.id}`); 
    }
    else{
        res
        .status(500)
        .send(`ocurrio un error`);
    }
});

app.post(`/users`,(req, res) =>{
    let person = {
        id: req.body.id,
        name: req.body.name
    };
    users.push(person);
    res
    .status(200)
    .send(`El usuario ${person.name} con id ${person.id} fue creado`);
});

app.put(`/users`,(req, res) =>{
    let person = {
        id: req.body.id,
        name: req.body.name
    };
    if (person.id ===``||person.name ===``)
    {
        res
        .status(501)
        .send(`El usuario no ha sido creado`);
    } else
    {   res
        .status(200)
        .send(`El usuario ${person.name} con id ${person.id} fue actualizado`);
    }
});

/*app.delete(`/users`,(req, res)=>{
    let cadena =``;

    for (u in users)
    {
        cadena += `\nid ${users[u].id} - nombre ${users[u].name}`;
    }
    res
    .status(200)
    .send(`Usuarios: ${cadena}`); 
    
});*/
//server
app.listen(config.port, ()=>{console.log(`Servidor iniciado`);});