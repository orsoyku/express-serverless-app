const express = require('express');
const router = express.Router();

const signupValidator = require('../utils/validators').signupValidator;
const searchValidator = require('../utils/validators').searchValidator;

const User = require('../models/user');

router.post('/signup', signupValidator, (req, res) => {
    console.log('User signup request!');

    console.log(req.body.name);
    console.log(req.body.email);

    var newUser = new User({ name: req.body.name, email: req.body.email });
    newUser.save((err) => {
        if (err) console.log(err);
    });

    res.json({ message: 'User added succesfully!' });
});

router.post('/search', searchValidator, async (req, res) => {
    console.log('User search request!');

    if (req.body.name !== null) {
        await User.findOne({ name: req.body.name }, (err, obj) => {
            if (err) {
                console.log(err);
            }
            if (obj === null) {
                res.status(404).json({ message: 'Couldn\'t find user!' });
            }
            else {
                console.log(obj);
                res.json({ message: 'Found user!', data: obj });
            }
        });
    }
    else {
        await User.findOne({ email: req.body.email }, (err, obj) => {
            if (err) {
                console.log(err);
            }
            if (obj === null) {
                res.status(404).json({ message: 'Couldn\'t find user!' });
            }
            else {
                console.log(obj);
                res.json({ message: 'Found user!', data: obj });
            }
        });
    }
});

router.post('/updateName', async (req, res) => {
    let newName = req.body.newName;
    let email = req.body.email;
    if (newName === null || email === null) {
        res.json({ message: 'Name or email cannot be empty!' });
    }
    else {
        await User.findOne({ email: req.body.email }, (err, foundDocument) => {
            if (err) {
                console.log(err);
            }
            if (foundDocument === null) {
                res.status(404).json({ message: 'Couldn\'t find user!' });
            }
            else {
                foundDocument.name = newName;
                foundDocument.save();

                res.json({ message: `Updated name to ${newName}` });
            }
        });
    }
});

module.exports = router;
