const { Aggregate } = require("mongoose")
const { db } = require("../models/UsersModel")


//Insert One
db.getCollection('students').insertMany(
    {
        name:'masud',
        class:1,
        roll:5',
        address:'dhaka'
    }
    )

//Insert Many
db.getCollection('students').insert(
    [
        {
            name:'masud',
            class:1,
            roll:9,
            address:'dhaka'
        },
        {
            name:'rana',
            class:10,
            roll:8,
            address:'Bogura'
        },
        {
            name:'Saad',
            class:1,
            roll:7,
            address:'Sirajganj'
        },
        {
            name:'Muhin',
            class:1,
            roll:6,
            address:'Sirajganj'
        }
    ]
    )


 //find all students data
 db.students.find({}) 
 db.students.aggregate([]) 



// Row Count 
db.students.find({}).count('total')

db.students.aggregate(
    [
        {$count:'total'}
    ]
)


// Aggregate Example 
db.students.aggregate(
    [
        {Teabag},
        {Hot_Water},
        {Tearing},
        {Mix_Suger},
        {Tea_Maked}
    ]
)

// Data Sorting Example 
db.students.aggregate(
    [
        {$sort:{roll:1}}
    ]
)
//Ascending order


db.users.aggregate(
    [
        {$sort:{roll:-1}}
    ]
)
//Descending order


db.users.find({}).sort({roll:1})
db.users.find({}).sort({roll:-1})


// Limiting
db.users.aggregate(
    [
        {$limit:3}
    ]
)

db.users.find({}).limit(2)


// Limiting first and last
db.users.aggregate(
    [
        {$sort:{roll:-1}}, //stage-1
        {$limit:3} //stage-2
    ]
)

db.users.find({}).sort({roll:1}).$limit(2)


// Search by Match
db.users.find({class:{$gt:9}})
db.users.find({class:{$gte:9}})

db.users.aggregate(
    [
        { $match:{class:{$gt:9}} }
    ]
)



db.users.aggregate(
    [
        {$match:{class:{$gte:9}}}
    ]
)



// Select By Match Condition AND OR
db.users.aggregate(
    [
        {$match:{class:{$gt:9}}},
        {$match:{address:"dhaka"}}
    ]
)