const Showcase = require("../methods/Showcase");

class ShowcaseService {
    static async load (req, res, next) {
        try {
            const result = await Showcase.findAll();

            res.send(result);

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };

    static async show (req, res, next) {
        try {
            const { id } = req.params;

            if(!id) return res.status(400).send("Please add showcase ID");

            const result = await Showcase.findOne({ where: { id: id} });

            if(!result) return res.status(400).send("SHowcase not found");

            res.send(result);

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };


    static async create (req, res, next) {
        try {
            const { wallpaper, book, redirect } = req.body;

            if(!wallpaper) return res.status(400).send("Please add showcase wallpaper");

            const result = await Showcase.create({
                wallpaper,
                book, 
                redirect
            });

            res.send(result);

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };

    static async update (req, res, next) {
        try {
            const { id, wallpaper, redirect, book } = req.body;

            if(!id) return res.status(400).send("Please add showcase ID");

            if(!wallpaper) return res.status(400).send("Please add showcase wallpaper");

            const result = await Showcase.update( {
                wallpaper,
                redirect,
                book
            }, { where: { id: id } });

            res.send(result);

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };

    static async delete (req, res, next) {
        try {
            const { id } = req.body;

            if(!id) return res.status(400).send("Please add showcase ID");

            await Showcase.destroy({ where: { id: id } });

            res.send();

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };

}

module.exports = ShowcaseService;