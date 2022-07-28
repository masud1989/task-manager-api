const jwt = require('jsonwebtoken');
const UsersModel = require('../models/UsersModel');
//User Registration
exports.registration = (req,res)=>{
    const reqBody = req.body
    UsersModel.create(reqBody,(err,data)=> {
        if(err){
            res.status(400).json({status:"Fail", data:err})
        }
        else{
            res.status(200).json({status:"Success", data:data})
        }
    })
}

// User Login
exports.login = (req,res) =>{
    const reqBody = req.body;
    UsersModel.aggregate([
        {$match:reqBody},
        {$project:{_id:0, email:1, firstName:1, lastName:1, mobile:1, photo:1 }}
    ], (err,data)=>{
            if(err){
                res.status(400).json({status:"Fail", data:err})
            }
            else{
                if(data.length>0){
                    const payload = {exp:Math.floor(Date.now() / 1000) + (24*60*60), data:data[0]}
                    const token = jwt.sign(payload, 'SecretKey123456789');
                    res.status(200).json({status:'success', token:token, data:data[0]})
                }
                else{
                    res.status(401).json({status:'unauthorized'})
                }
            }
            
        }
    
    )
}

// Update User Profile
exports.profileUpdate = (req, res)=> {
    const email = req.headers['email'];
    const reqBody = req.body;

    UsersModel.updateOne({email: email}, reqBody, (err, data)=> {
        if(err){
            res.status(400).json({status:"Fail", data:err})
        }
        else{
            res.status(200).json({status:"Update Success", data:data})
        }
    } )
}





