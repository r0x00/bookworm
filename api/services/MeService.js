const User = require("../methods/User");
const Book = require('../methods/Book');

class MeService {
    static async show(req,res, next) {
        try {
            const user = await User.findOne({ where: { id: req.user.id }});

            res.send(user);

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