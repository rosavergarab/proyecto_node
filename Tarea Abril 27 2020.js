const express = require(`express`);
const nocache = require(`nocache`);
const bodyParser = require('body-parser');

const config = require(`./config`);

//Inicializer
const app = express();
let users =[];


//config
app.use(nocache());
app.use(bodyParser.json());


//routes
app.get(`/`,(req, res)=>{
    res
    .sendStatus(500);
    
});

app.get(`/users`, (req, res)=>{
    let cadena =``;

    for (u in users)
    {
        cadena += `\nid ${users[u].id} - name ${users[u].name}`;
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
    let user = {
        id: req.body.id,
        name: req.body.name
    };
    users.push(user);
    res
    .status(200)
    .send(`El usuario ${user.id} con nombre ${user.name} fue creado`);
});


app.put(`/users`,(req, res) =>{
    let user = {
        id: req.body.id,
        name: req.body.name
    };
    if (user.id ===``)
    {
        res
        .status(501)
        .send(`El usuario no ha sido creado`);
    } else
    {   
        for (u in users)
        {
            if(users[u].id === user.id)
            {
                users[u].name = user.name;
            }
        }
        res
        .status(200)
        .send(`El usuario ${user.id} fue actualizado`);
    }
});

app.delete(`/users`,(req, res) =>{
    let user = {
        id: req.body.id,
    };
    const user2 = req.body.id;

    if (user.id ===``)
    {
        res
        .status(501)
        .send(`El usuario no ha sido creado`);
    } else
    {   
        for (u in users)
        {
            if(users[u].id === user.id)
            {
                users[u].name = ``;
                users[u].id = ``;
            }
        }
        res
        .status(200)
        .send(`El usuario ${user2} fue eliminado`);
    }
});


//server
app.listen(config.port, ()=>{console.log(`Servidor iniciado`);});