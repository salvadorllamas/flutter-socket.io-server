const {io}=require('../index');
const Band = require('../models/band');

const Bands=require("../models/bands");
const bands =new Bands();

bands.addBand(new Band("Queeen"));
bands.addBand(new Band('Bon Jovi '));
bands.addBand(new Band("Heroes del Silencio"));
bands.addBand(new Band("Metalica"));
bands.addBand(new Band("otra banda"));

// console.log(bands);


// Manejo de conexiones de sockets
io.on("connection", (client) => {
    console.log("Cliente conectado");
  
   client.emit('active-bands',bands.getBands());

    client.on("disconnect", () => {
      console.log("Cliente desconectado");
    });
  
    client.on("mensaje", (payload) => {
      console.log("mensaje!!!!",payload);
  
        io.emit('mensaje',{admin:'Nuevo mensaje'});
    });

    // io.emit('ejemplo',{admin:'este es el ejemplo de la informacion desde el back'});

    // client.on("emitir-mensaje", (payload) => {
    //   // console.log("mensaje!!!!  fdlutter",payload);
    //    client.broadcast.emit('nuevo-mensaje',payload);
    // });

    client.on('vote-band',(payload)=>{
        console.log(payload);
        bands.voteBand(payload.id)
        io.emit('active-bands',bands.getBands());
    })

    client.on('add-band',(payload)=>{
     const newBand=new Band(payload.name)
      bands.addBand(newBand)
      io.emit('active-bands',bands.getBands());
  })

  client.on('delete-band',(payload)=>{

     bands.deleteBand(payload.id)
     io.emit('active-bands',bands.getBands());
 })


  });