const qrCtl = {};

qrCtl.renderQrForm = (req, res)=>{
    res.send('qr add')
};
qrCtl.createNewQr = (req,res)=>{
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