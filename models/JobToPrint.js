const { Schema, model } = require('mongoose');


const jobToPrintSchema = new Schema({
    content: { 
        type: String, 
        required: [true, 'El contenido es obligatorio'] 
    },
    printerName: { 
        type: String,
        required: [true, 'El nombre de la impresora es obligatorio'] 
    },
    identifier: { 
        type: Schema.Types.ObjectId, 
        ref: 'Identifier',
        required: [true, 'El identifier es obligatorio']  
    },
    documentName:{ 
        type: String,
        required: [true, 'El nombre del documento es obligatorio'] 
    },
});


module.exports = model('JobToPrint', jobToPrintSchema);