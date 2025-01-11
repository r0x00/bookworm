const User = require("../methods/User");
const Book = require('../methods/Book');
const Passport = require('../methods/Passport');


class MeService {
    static async show(req,res, next) {
        try {
            const user = await User.findOne({ where: { id: req.user.id }});

            res.send(user);

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };

    static async update(req, res, next) {
        try {
            const { username, email, password } = req.body;

            if(!username) return res.status(400).send("Please add username");
            if(!email) return res.status(400).send("Please add email");
            if(!password) return res.status(400).send("Please add password");

            const user = await User.findOne({ where: { id: req.user.id }});

            if(!user) return res.status(400).send("User not found");

            if(user.username != username) {
                const checkName = await User.findOne({ where: { username: username }});

                if(checkName) return res.status(400).send("Username already exists");

                await user.update({ username: username });
            };

            if(user.email != email) {
                const checkEmail = await User.findOne({ where: { email: email }});

                if(checkEmail) return res.status(400).send("Email already exists");

                await user.update({ email: email });
            }

            await Passport.update({ 
                password: password 
            }, 
            { 
                where: { id: user.id },
                individualHooks: true,
            });

            res.send();

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };

    static async loadBookRead (req, res, next) {
        try {
            const user = await User.findOne({ where: { id: req.user.id }});

            if(!user) return res.status(400).send("User not found");
            
            const result = await user.getReadBook();

            res.send(result);

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };

    static async loadBookSaved (req, res, next) {
        try {
            const user = await User.findOne({ where: { id: req.user.id }});

            if(!user) return res.status(400).send("User not found");
            
            const result = await user.getLikes();

            res.send(result);

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };

    static async loadBookCreated (req, res, next) {
        try {
            const user = await User.findOne({ where: { id: req.user.id }});
        
            if(!user) return res.status(400).send("User not found");
            
            const result = await Book.findAll({ where: { createdBy: user.id } });

            res.send(result);

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };
};


module.exports = MeService;