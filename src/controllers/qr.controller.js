const qrCtl = {};
const Qr = require('../models/qr_model');
const qrcode = require('qrcode');
const crypto = require('crypto');


qrCtl.renderQrForm = (req, res)=>{
    res.render('qrs/new_qr');
};

qrCtl.createNewQr = async (req, res) => {
    const { nombre, ine, auto, placas, casaVisita, motivo, validez } = req.body;
    // Convertir los valores a cadena de texto de JSON
    const qrData = JSON.stringify({ nombre, ine, auto, placas, casaVisita, motivo, validez });

    // Generar una clave segura de 32 bytes (256 bits) para AES-256
    const key = crypto.randomBytes(32);
    // Generar un IV (Initialization Vector) seguro de 16 bytes
    const iv = crypto.randomBytes(16);

    // Crear un objeto de cifrado usando el algoritmo AES-256-CBC
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    // Cifrar los datos
    let encryptedData = cipher.update(qrData, 'utf8', 'base64');
    encryptedData += cipher.final('base64');
    // Convertir la cadena cifrada en base64 a una cadena legible
    const base64EncodedEncryptedData = encryptedData.toString('base64');

    // Comprobación del encriptado
    console.log('datos encriptados: ' + base64EncodedEncryptedData);

    // Crear el QR
    try {
        const qrCodeDataURL = await qrcode.toDataURL(base64EncodedEncryptedData); // Generar el QR con el valor cifrado

        // Crear el objeto newQr con qrCodeURL resuelto
        const newQr = new Qr({
            nombre,
            ine,
            auto,
            placas,
            casaVisita,
            motivo,
            validez,
            qrCodeURL: qrCodeDataURL // Asignar qrCodeDataURL resuelto
        });

        // Agregar usuario al registro en el objeto
        newQr.user = req.user.id;

        // Guardar el objeto en la bd
        await newQr.save();

        // Obtener el ID del QR que se acaba de guardar
        const savedQrId = newQr._id;

        // Message
        req.flash('success_message', 'Código Qr agregado satisfactoriamente');
        console.log(newQr);
        res.redirect('/qr');
    } catch (error) {
        console.error('Error:', error);
        req.flash('error_message', 'Error al agregar el Código QR');
        res.redirect('/qr');
    }
};


qrCtl.renderQr = async (req,res)=>{ // To get all qr 
    const qrs = await Qr.find({user: req.user.id}).sort({date:'desc'}).lean();
    res.render('qrs/all_qr',{qrs});
    //res.send('all qrs');
};

qrCtl.renderEditQr = async (req,res)=>{
    const qr = await Qr.findById(req.params.id).lean();
    console.log(qr);
    res.render('qrs/edit_qr', {qr});
};

qrCtl.updateQr = async (req,res) => {
    //destructuring
    const {nombre,ine,auto,placas,casaVisita,motivo,validez} = req.body
    await Qr.findByIdAndUpdate(req.params.id, {nombre,ine,auto,placas,casaVisita,motivo,validez});
    req.flash('success_message','Qr actializado Satisfactoriamente');
    res.redirect('/qr');
};

qrCtl.deleteQr = async (req,res)=>{
    await Qr.findByIdAndDelete(req.params.id);
    req.flash('success_message','Qr eliminado satisfactoriamente');
    res.redirect('/qr');
}

async function codigo(data){
    let qrcodes;
    const stJson = JSON.stringify(data);
    await qrimag.toDataURL(stJson)
    .then((url)=>{
        qrcodes = url;
    }).catch((err)=>{
        console.error(err);
    });
    console.log('Este es el QR: ' + qrcodes);
    return qrcodes;
}

module.exports = qrCtl;