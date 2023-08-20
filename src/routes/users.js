const { Router } = require('express');
const router = Router();

router.get('/users/signin', (req, res) => {
    res.render('users/signin'); // Ruta correcta: 'users/signin'
});

router.get('/users/signup', (req, res) => {
    res.render('users/signup'); // Ruta correcta: 'users/signup'
});

router.post('/users/signup',(req,res)=>{
    const {name,email,password,confirm_password} = req.body;
    const errors = [];
    if(name.length<=0){
        errors.push({text:'Inserte su nombre'});
    }
    if(password != confirm_password){
        errors.push({text:'Las contraseñas no coinciden'});
    }
    if(password.length<4){
        errors.push({text:'Password debe ser mayor a 4 caracteres'});
    }
    if(errors.length>0){
        res.render('users/signup', {errors,name,email,password,confirm_password});
    }else{
        res.send('ok');
    }
})

module.exports = router;