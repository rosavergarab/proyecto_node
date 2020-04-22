const express = require(`express`);
const app = express();
const nocache = require(`nocache`);
const config = require(`./config`);

//config
app.use(nocache());

//routes
app.get(`/`,(req, res)=>{
    res
    .status(500)
    .send(`No esta disponible esta pagina`); //req es required y res es response y lo que hace es que envia una respuesta
});

app.get(`/users`,(req, res)=>{
    res
    .status(200)
    .send(`Esta es la ruta de usuarios`); 
    
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
//server
app.listen(config, ()=>{console.log(`Servidor iniciado`);});