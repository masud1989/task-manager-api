const TasksModel = require('../models/TasksModel');

// Create Task
exports.createTask = (req, res) => {

    const reqBody = req.body;
    reqBody.email = req.headers['email'];

    TasksModel.create(reqBody, (err, data) => {
        if(err){
            res.status(400).json({status:"Fail", data:err})
        }
        else{
            res.status(200).json({status:"Success", data:data})
        }
    })
}


// Delete Task
exports.deleteTask = (req, res) => {
    const id = req.params.id;
    const query = {_id:id};
    TasksModel.remove(query, (err, data) => {
        if(err){
            res.status(400).json({status:"Fail", data:err})
        }
        else{
            res.status(200).json({status:"Success", data:data})
        }
    })
}

// Task Status Update
exports.updateTaskStatus = (req, res) =>{
    const id = req.params.id;
    const status = req.params.status;
    const query = {_id:id};
    const reqBody = {status: status};
    TasksModel.updateOne(query, reqBody, (err, data) => {
        if(err){
            res.status(400).json({status:"Fail", data:err})
        }
        else{
            res.status(200).json({status:"Success", data:data})
        }
    })
}

// Task List By Status
exports.taskListByStatus = (req, res) =>{
    const status = req.params.status;
    const email = req.headers['email'];

    TasksModel.aggregate([
        {$match:{status:status, email:email}},
        {$project:{
            _id:1, title:1, description:1, status:1,
                createdDate:{
                    $dateToString:{
                        date:'$createdDate',
                        format:'%d-%m-%Y'
                    }
                }
        }}
    ], (err, data) => {
        if(err){
            res.status(400).json({status: 'Failed', data:err})
        }
       
        else{
                res.status(200).json({status: 'Success', data:data})
            }
        
    }
    
    )

}

// Task Count By Status
exports.taskCountByStatus = (req, res) => {
    const email = req.headers['email'];
    TasksModel.aggregate([
        {$match: {email: email}},
        {$group:{_id:"$status", sum:{$count: {}}}}
    ], (err, data) => {
        if(err){
            res.status(400).json({status:"Fail", data:err})
        }
        else{
            res.status(200).json({status:"Success", data:data})
        }
    })

}
