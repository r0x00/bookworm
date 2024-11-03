const Book = require('../methods/Book');

class BookServices {
    static async load (req, res, next) {
        try {
            const result = await Book.findAll();

            res.send(result);

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };

    static async show (req, res, next) {
        try {
            const { id } = req.params;

            if(!id) return res.status(400).send("Please add book ID");

            const result = await Book.findOne({ where: { id: id} });

            res.send(result);

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };

    static async create (req, res, next) {
        try {
            const { name, description, author } = req.body;

            if(!name) return res.status(400).send("Please add book name");

            const result = await Book.create({
                name,
                description,
                author,
            });

            res.send(result);

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };

    static async update (req, res, next) {
        try {
            const { id, name, description, author } = req.body;

            if(!id) return res.status(400).send("Please add book ID");

            if(!name) return res.status(400).send("Please add book name");

            const result = await Book.update( {
                name,
                description,
                author,
            }, { where: { id: id } });

            res.send(result);

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };

    static async delete (req, res, next) {
        try {
            const { id } = req.body;

            if(!id) return res.status(400).send("Please add book ID");

            await Book.destroy({ where: { id: id } });

            res.send();

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };
};

module.exports = BookServices;

