const moongose = require('mongoose')
const EmployeeSchema = moongose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },

})
module.exports = moongose.model('Employees',EmployeeSchema);