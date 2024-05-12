const express = require('express');
const router = express.Router();
const userModel = require('../src/user/userModel');


router.post('/user/create', async (req, res) => {
    const user = new userModel(req.body);
    try {
        await user.save();
        res.status(201).send({
            status: 201,
            success: true,
            message: 'User created successfully'
        })
    }
    catch{
        res.status(500).send({
            message: 'Something went wrong'
        })
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).send({
            status: 200,
            success: true,
            data: users,
            message: 'Users fetched successfully'
        })
    }
    catch{
        res.status(500).send({
            message: 'Something went wrong'
        })
    }
})


router.get('/user/:id', async (req, res) => {
    try {
        const uid = req.params.id;
        const users = await userModel.findById({_id: uid});
        res.status(200).send({
            status: 200,
            success: true,
            data: users,
            message: 'User loaded successfully'
        })
    }
    catch{
        res.status(500).send({
            message: 'Something went wrong'
        })
    }
})


router.patch('/user/:id', async (req, res) => {
    try {
        const uid = req.params.id;
        const body = req.body;
        const updateUser = await userModel.findByIdAndUpdate({_id: uid}, body, {new: true});
        res.status(200).send({
            status: 200,
            success: true,
            data: updateUser,
            message: 'User updated successfully'
        })
    }
    catch{
        res.status(500).send({
            message: 'Something went wrong'
        })
    }
})


router.delete('/user/:id', async (req, res) => {
    try{
        const uid = req.params.id;
        await userModel.findByIdAndDelete({_id: uid});
        res.status(200).send({
            status: 200,
            success: true,
            message: 'User deleted successfully'
        })
    }
    catch{
        res.status(500).send({
            message: 'Something went wrong'
        })
    }
})

module.exports = router;

