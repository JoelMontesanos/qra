const qrCtl = {};
const Qr = require('../models/qr_model');
const qrcode = require('qrcode');

qrCtl.renderQrForm = (req, res)=>{
    res.render('qrs/new_qr');
};

qrCtl.createNewQr = async (req,res)=> {
    const {nombre,ine,auto,placas,casaVisita,motivo,validez} = req.body;
    const qrData = JSON.stringify({ nombre, ine, auto, placas, casaVisita, motivo, validez });
    const qrCodeDataURL = await qrcode.toDataURL(qrData);
    try{
        const newQr = new Qr({nombre,ine,auto,placas,casaVisita,motivo,validez,qrCodeURL: qrCodeDataURL});
        console.log('this is: '+ qrCodeDataURL);
        await newQr.save();
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
    const qrs = await Qr.find().lean();
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