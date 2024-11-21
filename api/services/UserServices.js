const User = require('../methods/User');
const Passport = require('../methods/Passport');

class UserServices {
    static async load (req, res, next) {
        try {
            const result = await User.findAll();

            res.send(result);

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };

    static async show(req, res, next) {
        try {
            const { id } = req.params;

            if(!id) return res.status(400).send("Please add user ID");

            const result = await User.findOne({ where: { id: id} });

            if(!result) return res.status(400).send("User not found");

            res.send(result);

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };

    static async create(req, res, next) {
        try {
            const { username, email, permission, password } = req.body;

            if(!username) return res.status(400).send("Please add username");

            const result = await User.create({
                username,
                email,
                permission
            });

            console.log(result)

            await Passport.create({
                user: result,
                password: password,
            });


            res.send(result);

        } catch(_error) {
            res.status(500).send(_error.message);
        };

    };

    static async update(req, res, next) {
        try {
            const { id, username, email, permission, password } = req.body;

            if(!id) return res.status(400).send("Please add user ID");

            if(!username) return res.status(400).send("Please add username");


            const result = await User.update( {
                username,
                email,
                permission
            }, { where: { id: id } });

            res.send(result);
  

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };

    static async delete(req, res, next) {
        try {
            const { id } = req.body;

            if(!id) return res.status(400).send("Please add user ID");

            await User.destroy({ where: { id: id } });

            res.send();

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };
};

module.exports = UserServices;