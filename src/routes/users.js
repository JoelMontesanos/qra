const { Router } = require('express');
const router = Router();
const User = require('../models/user_model');

router.get('/users/signin', (req, res) => {
    res.render('users/signin'); // Ruta correcta: 'users/signin'
});

router.get('/users/signup', (req, res) => {
    res.render('users/signup'); // Ruta correcta: 'users/signup'
});

router.post('/users/signup',async (req,res)=>{
    const {name,home,phone,mail,password,confirm_password} = req.body;
    const errors = [];
    if(phone.length<=0){
        errors.push({text:'Inserte su número telefónico'});
    }
    if(home.length<=0){
        errors.push({text:'Inserte el número de su casa'});
    }
    if(name.length<=0){
        errors.push({text:'Inserte su nombre'});
    }
    if(mail.length<=0){
        errors.push({text:'Inserte su correo'});
    }
    if(password != confirm_password){
        errors.push({text:'Las contraseñas no coinciden'});
    }
    if(password.length<4){
        errors.push({text:'Password debe ser mayor a 4 caracteres'});
    }
    if(errors.length>0){
        res.render('users/signup', {errors,name,home,phone,mail,password,confirm_password});
    }else{
        try{
       const newUser = new User({name,home,phone,mail,password});
       newUser.password = await newUser.encryptPassword(password);
       console.log(newUser.mail);
       await newUser.save();
       req.flash('succed_msg','Registro Exitoso');
       res.redirect('/users/signin');
    }
    catch(error){
        console.log(error);
    }
    }
});

module.exports = router;