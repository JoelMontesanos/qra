const {Router} = require('express');
const router = Router();
const {
    renderQrForm, 
    createNewQr, 
    renderQr, 
    renderEditQr, 
    updateQr, 
    deleteQr} = require('../controllers/qr.controller');

//New Qr
router.get('/qr/add',renderQrForm);
router.post('/qr/new_qr',createNewQr);
// Get all qr
router.get('/qr',renderQr);
//Edit qr
router.get('/qr/edit/:id', renderEditQr);
router.put('/qr/edit/:id', updateQr);
//delete qr
router.delete('/qr/delete/:id',deleteQr);
module.exports = router;