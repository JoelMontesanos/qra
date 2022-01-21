const qrCtl = {};
const Qr = require('../models/qr_model');

qrCtl.renderQrForm = (req, res)=>{
    res.render('qrs/new_qr');
};

qrCtl.createNewQr = async (req,res)=> {
    const {nombre,ine,auto,placas,casaVisita,motivo,validez} = req.body;
    const newQr = new Qr({nombre,ine,auto,placas,casaVisita,motivo,validez});
    await newQr.save();
    // Message
    req.flash('success_message', 'Código Qr agregado satisfactoriamente');
    console.log(newQr);
    //console.log(req.body);// recepción de los datos, se encuentran en req.body
    res.redirect('/qr');
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

module.exports = qrCtl;