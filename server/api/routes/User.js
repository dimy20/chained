const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const bycript = require('bcrypt');

router.post('/signup',(req,res,next)=>{
    // first checks if user already exists
    User.find({email : req.body.email})
    .exec()
    .then((user)=>{
        // find returns and array
        if(user.length >=1){
            res.status(409).json({
                message : 'email already exists, did you forget your account?'
            })
        }else{

            bycript.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        message : err
                    });
                }else{
                    // here we create the new user
                    const user = new User({
                        _id : new mongoose.Types.ObjectId(),
                        name : req.body.name,
                        lastname : req.body.lastname,
                        email : req.body.email,
                        password : hash
                    })
                    user
                    .save()
                    .then(result =>{
                        res.status(201).json({
                            message : 'new user added'
                        })
                        console.log('new user adde to db ', result)
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).json({
                            error : err
                        })
                    })
                }
            })

        }
    })
    .catch(err=>{
        console.log(err);
        res.json({
            error : err
        })
    })
    
});

router.get('/all',(req,res,nex)=>{
    User.find()
    .exec()
    .then(users=>{
        res.status(200).json(users)
    })
    .catch(err=>{
        res.json({
            error : err,
        })
    });
})

//get a single user
router.get('/:userId',(req,res,nex)=>{
    if (req.params.userId === "123"){
        res.status(200).json({
            message : `user ${req.params.userId} found`
        })
    }else{
        res.status(404).json({
            message : `user ${req.params.userId} not found`
        })
    }
})

module.exports = router;
