const { io } = require('../server');

io.on('connection', client =>{
    console.log('Conectado');
    
    client.on('userConnected', client.join);

    client.on('disconnect', () => {
        client.leave;
        console.log('desconectado');
    })
})
