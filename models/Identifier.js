const { Schema, model } = require('mongoose');


const identifierSchema = new Schema({
    mac: { 
        type: String, 
        required: [true, 'La MAC es obligatoria'] 
    },
    warehouse: { 
        type: String,
        required: [true, 'El nombre del almacen es obligatorio'] 
    },
    terminal: { 
        type: String,
        required: [true, 'El nombre de la terminal en la cual esta conectada la impresora es obligatorio']  
    },
},
{
    timestamps: true
}
);


module.exports = model('Identifier', identifierSchema);