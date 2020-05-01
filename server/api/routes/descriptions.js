const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Description = require('../models/description');

// handling GET request to /descriptions
router.get('/',(req,res,next)=>{
   Description.find()
   .exec()
   .then((docs)=>{
       console.log(docs)
       res.status(200).json(docs);
   })
   .catch(err =>{
       console.log(err);
       res.status(500).json({
           message : 'no descriptions found'
       })
   })
});
// handling POST request to /descriptions
router.post('/',(req,res,next)=>{
    const description = new Description({
        _id : mongoose.Types.ObjectId(),
        name : req.body.name,
        description : req.body.description
    });

    description
    .save()
    .then((result)=>{
        console.log(result);
        res.status(200).json({
            message : 'handling POST request /description',
            newDescription : description
        })
    })
    .catch((err)=>{
        res.status(err.status).json({
            message : err.message
        });
    });
    
});

router.get('/:descriptionId',(req,res,next)=>{
    const id = req.params.descriptionId;
    Description.findById(id)
    .exec() // executes query on db
    .then((doc)=>{
        if(doc){
            res.status(200).json(doc)
        }
    })
    .catch((err)=>{
        res.status(400).json({
            message : 'no description found with the provided id'
        })
    })
    
});

router.patch('/:descriptionId',(req,res,next)=>{
    const id = req.params.descriptionId;
    if (id === "123"){
        res.status(200).json({
            message : `description ${id} has been updated`,
        })
    }
})

router.delete('/:descriptionId',(req,res,next)=>{
    Description.remove({_id : req.params.descriptionId})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message : `description ${req.params.descriptionId} has been deleted`
        })
    })
    .catch(err=>{
        res.status(400).json({
            message : 'no description found with this id'
        })
    })
})
module.exports = router;