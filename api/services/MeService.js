const User = require("../methods/User");

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
            
            const result = await user.getRead();

            res.send(result);

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };
};


module.exports = MeService;