const {Router} = require('express');
const router = Router();
const {
    renderQrForm, 
    createNewQr, 
    renderQr, 
    renderEditQr, 
    updateQr, 
    deleteQr} = require('../controllers/qr.controller');

const {isAuthenticated} = require('../helpers/auth');

//New Qr
router.get('/qr/add',isAuthenticated,renderQrForm);
router.post('/qr/new_qr',isAuthenticated,createNewQr);
// Get all qr
router.get('/qr',isAuthenticated,renderQr);
//Edit qr
router.get('/qr/edit/:id',isAuthenticated, renderEditQr);
router.put('/qr/edit/:id',isAuthenticated, updateQr);
//delete qr
router.delete('/qr/delete/:id',isAuthenticated,deleteQr);
module.exports = router;