const { Router } = require('express');
const router = Router();
const User = require('../models/user_model');
const passport = require ('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin'); // Ruta correcta: '/users/signin'
});

router.post('/users/signin', passport.authenticate('local',{
    successRedirect: '/qr',
    failureRedirect: '/users/signin',
    successFlash: 'Inicio de sesión exitoso',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup'); // Ruta correcta: '/users/signup'
});

router.post('/users/signup',async (req,res)=>{
    const {name,home,phone,mail,password,confirm_password} = req.body;
    const errors = [];
    if(name.length<=0){
        errors.push({text:'Inserte su nombre'});
    }
    if(phone.length<=0){
        errors.push({text:'Inserte su número telefónico'});
    }
    if(home.length<=0){
        errors.push({text:'Inserte el número de su casa'});
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
       req.flash('success_msg', 'Registro exitoso. ¡Inicia sesión ahora!');
       res.redirect('/users/signin');
    }
    catch(error){
        errors.push('Hubo un error al registrarse, inténtalo de nuevo');
        res.redirect('/users/signup');
        console.log(error);
    }
    }
});
router.get('/users/logout',(req, res)=>{
    req.logOut();
    res.redirect('/');
});

module.exports = router;