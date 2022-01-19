const qrCtl = {};

qrCtl.renderQrForm = (req, res)=>{
    res.render('qrs/new_qr');
};
qrCtl.createNewQr = (req,res)=>{
    console.log(req.body);// recepción de los datos
    res.send('new qr');
};
qrCtl.renderQr = (req,res)=>{
    res.send('all qrs');
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