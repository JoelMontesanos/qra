const qrCtl = {};
const Qr = require('../models/qr_model');

qrCtl.renderQrForm = (req, res)=>{
    res.render('qrs/new_qr');
};
qrCtl.createNewQr = async (req,res)=> {
    const {nombre,ine,auto,placas,casaVisita,motivo,validez} = req.body;
    const newQr = new Qr({nombre,ine,auto,placas,casaVisita,motivo,validez});
    await newQr.save();
    console.log(newQr);
    //console.log(req.body);// recepción de los datos, se encuentran en req.body
    res.send('new qr');
};
qrCtl.renderQr = async (req,res)=>{ // To get all qr 
    const qrs = await Qr.find().lean();
    res.render('qrs/all_qr',{qrs});
    //res.send('all qrs');
};
qrCtl.renderEditQr = (req,res)=>{
    res.send('render edit form');
};
qrCtl.upDateQr = (req,res) => {
    res.send('updated qr');
};
qrCtl.deleteQr = (req,res)=>{
    res.send('deleted qr');
}
module.exports = qrCtl;