const {Schema, model} = require('mongoose');


const qrSchema = new Schema ({
    nombre:{type: String, required: true},
    ine:{type:Number, required:true},
    auto:{type: String, required:true},
    placas:{type:String, required: true},
    casaVisita:{type: Number, required:true},
    motivo:{type:String, required:true},
    validez:{type:Date, required:true},
},{timestamps:true});

module.exports = model('qrModel',qrModel);