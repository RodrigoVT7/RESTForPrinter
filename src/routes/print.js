const { Router } = require('express');
const router = Router();
const { io } = require('../server');

const JobToPrint = require('../../models/JobToPrint');

//Enviar trabajo de impresion a cliente seleccionado
router.post('/printraw', async (req, res) => {

    let {content, printerName, identifier} = req.body;

    if (content === null || content === "" || 
        printerName === null || printerName === "" || 
        identifier === null || identifier === "") {
      
      return res.status(400).json({
        ok: false,
        message: 'content, printerName o identifier sin datos'
      });

    } else {

      const newJobToPrint = new JobToPrint({
        content, 
        printerName, 
        identifier   
      });

      await newJobToPrint.save( async(err, jobToPrintDB) => {
        
        if( err ){
            return res.status(400).json({
                ok: false,
                err,
                message: 'Error al enviar nuevo trabajo de impresion, verifica que el identificador de la terminal registrada sea correcto'
            })
        }        
        
        res.status(200).json({
            ok: true,
            message: 'content listo para ser solicitado por el cliente seleccionado'
        });

        io.sockets.to(identifier).emit("update");

      });
         
    }

});

//Recibir trabajos de impresion desde el cliente
router.get('/printraw/:identifier', async (req, res) => {

  let identifier = req.params.identifier;

  console.log("Consulta");

  JobToPrint.find({identifier}, '_id content printerName')
    .exec(
        (err, jobsToPrint) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error cargando trabajos de impresion',
                    err
                });
            }

            if ( jobsToPrint.length > 0 ) {

              res.status(200).json({
                ok: true,
                message: 'Trabajo(s) recibidos por el cliente',
                jobsToPrint
              });

              jobsToPrint.forEach(async element => {
                 await JobToPrint.findByIdAndDelete({_id: element._id})
              });
        
          } else {
        
              res.status(404).json({
              ok: false,
              message: 'Nada en cola de impresion',
              err: null
              });
            
          }

        });
  
});

module.exports = router;