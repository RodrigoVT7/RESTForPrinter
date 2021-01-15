const { Router } = require('express');

const Identifier = require('../../models/Identifier');

const router = Router();

// Obtener información de cliente
router.post('/clientinformation', async (req, res) => {
    
    const { mac } = req.body;

    await Identifier.findOne({ mac }, (err, clientDB) => {

        if ( err ) {
            return res.status(500).json({
               ok: false,
               err,
               message: 'Error al buscar la mac en la base de datos'
           });
       }

       if (!clientDB) {
        return res.status(404).json({
            ok: false,
            err,
            message: 'Usuario no registrado'
            
        });
       }

       console.log(mac)
       res.status(200).json({
        ok: true,
        client: clientDB
        });

    });  
});

// Registrar cliente
router.post('/newclient', async (req, res) => {

    let { mac, warehouse, terminal} = req.body;

    const newClient = new Identifier({
        mac, 
        warehouse, 
        terminal      
    });

    await newClient.save( async(err, clientDB) => {
        
        if( err ){
            return res.status(500).json({
                ok: false,
                err,
                message: 'Error al registrar cliente en la base de datos'
            })
        }        
        
        res.status(201).json({
            ok: true,
            client: clientDB
        });

    });
    
});

// Actualizar info de cliente
router.put('/client/:id', async (req, res) => {
    let id = req.params.id
    let { mac, warehouse, terminal} = req.body;


    if(mac.length > 0 && warehouse.length > 0 && terminal.length > 0){
        
        await Identifier.findByIdAndUpdate(id, {mac, warehouse, terminal}, { new: true, runValidators: true, context: 'query' }, (err, clientDB) => {
        
            if ( err ) {
                return res.status(500).json({
                ok: false,
                message: 'Error al buscar en la base de datos la mac',
                err
            });
            }

            if (!clientDB) {
                return res.status(404).json({
                    ok: false,
                    message: 'Este cliente no esta registrado',
                    err
                });
            }
            
            res.status(200).json({
                ok: true,
                client: clientDB
            });
        });
    }       
    
});

//Eliminar cliente
router.delete('/deleteclient/:id', async (req, res) => {
    let id = req.params.id;

    await Identifier.findByIdAndDelete(id, (err, clientDelete) =>{

        if( err ){
            return res.status(500).json({
                ok: false,
                err,
                message: 'Error al eliminar cliente'
            })
        }        
        
        res.status(200).json({
            ok: true,
            message: 'Cliente eliminado'
        });
    })
})

// Obtener todos los clientes
router.get('/clients', async (req, res) => {

    await Identifier.find({}, 'warehouse terminal')
        .exec(
            (err, clientsDB) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error cargando clientes desde la base de datos',
                        err
                    });
                }

                res.status(200).json({
                    ok: true,
                    clients: clientsDB,
                });

            });
});

module.exports = router;