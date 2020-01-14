module.exports.signupValidator = (req, res, next) => {
    let name = req.body.name;
    if (name === null)
        res.json({ message: 'Error, no name!' });
    if (name.length < 2)
        res.json({ message: 'Name too short!' });

    let email = req.body.email;
    if (email === null) {
        res.json({ message: 'Error: no email!' });
    }
    else {
        next();
    }
};

module.exports.searchValidator = (req, res, next) => {
    let name = req.body.name;
    let email = req.body.email;
    if (name === null && email === null) {
        res.json({ message: 'Email or name required to search!' });
    }
    else {
        next();
    }
};
