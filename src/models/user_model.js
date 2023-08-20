const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name:{type:String,required:true},
    home:{type:String,required: true},
    phone: {type:Number, required: true},
    mail:{type:String,requred:true},
    password:{type:String, required:true},
},{timestamps:true});


userSchema.methods.encryptPassword = async password =>{
    const salt = await bcrypt.genSalt(10);
    return  await bcrypt.hash(password,salt);
};

userSchema.methods.matchPasswords = async function (password){
    return await bcrypt.compare(password,this.password);
}

module.exports = model('User',userSchema);