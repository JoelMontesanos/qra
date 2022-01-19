const {Router} = require('express');
const router = Router();
const {
    renderQrForm, 
    createNewQr, 
    renderQr, 
    renderEditQr, 
    upDateQr, 
    deleteQr} = require('../controllers/qr.controller');

//New Qr
router.get('/qr/add',renderQrForm);
router.post('/qr/add',createNewQr);
// Get all qr
router.get('/qr',renderQr);
//Edit qr
router.get('/qr/edit/:id', renderEditQr);
router.put('/qr/edit/:id', upDateQr);
//delete qr
router.delete('/qr/delete/:id',deleteQr);
module.exports = router;