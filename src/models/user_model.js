const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    nombre:{type:String,required:true},
    password:{type:String, required:true},
    casa:{type:String,required: true},
    telefono: {type:Number, required: true},
    mail:{type:String,requred:true},
},{timestamps:true});


userSchema.methods.encryptPassword = async password =>{
    const salt = await bcrypt.genSalt(10);
    return  await bcrypt.hash(password,salt);
};

userSchema.methods.matchPasswords = async function (password){
    return await bcrypt.compare(password,this.password);
}

module.exports = model('userModel',userSchema);