// Task1: initiate app and run server at 3000
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const path = require('path');
app.use(express.static(path.join(__dirname + '/dist/FrontEnd')));
// Task2: create mongoDB connection
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://admin:admin123@employeecluster.wmdlh9r.mongodb.net/?retryWrites=true&w=majority',
    {
        // useCreateIndex: true,
        useNewUrlParser: true
    }, () => {
        app.listen(3000, () => {
            console.log(`db connected and Server Started at ${3000}`)
        })
    })
const Employees = require('./models/Employees')
//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist',async(req,res)=>{
    try{
        const employees = await Employees.find()
        res.json(employees)
    }
    catch(err){
        res.json({
            message:err
        })
    }
})


//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('/api/employeelist/:id',async(req,res)=>{
    try{
        const employeeData = await Employees.findById(req.params.id)
        res.json(employeeData)
    }
    catch(err){
        res.json({
            message:err
        })
    }
})




//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist',async(req,res)=>{
    try{
        const employee = Employees({
            name:req.body.name,
            location:req.body.location,
            position:req.body.position,
            salary:req.body.salary
        })
        await employee.save()
        res.json({message:'Created Employee Successfully'})
    }
    catch(err){
        res.json({
            message:err
        })
    }
})




//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id',async(req,res)=>{
    try{
        await Employees.remove({_id:req.params.id})
        res.json({message:"Deleted Employee Successfully"})
    }
    catch(err){
        res.json({
            message:err
        })
    }
})




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist',async(req,res)=>{
    try{
        const id = req.body['_id']
        if(id){
          await Employees.findByIdAndUpdate(id,req.body)
          res.json({message:'Updated Employee Successfully'})
        }
        else{
            res.status(400).json({message:'Id is Mandatory'})
        }
    }
    catch(err){
        res.json({
            message:err
        })
    }
})

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



