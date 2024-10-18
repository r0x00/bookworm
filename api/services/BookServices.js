const Book = require('../methods/Book');

class BookServices {
    static async load (req, res, next) {
        try {
            const result = await Book.findAll();

            res.send(result);

        } catch(_error) {
            res.status(500).send(_error);
        };
    };

    static async show (req, res, next) {
        try {
            const { id } = req.query;

            if(!id) return res.status(400).send("Please add book ID");

            const result = await Book.findOne(id);

            res.send(result);

        } catch(_error) {
            res.status(500).send(_error);
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
            res.status(500).send(_error);
        };
    };

    static async update (req, res, next) {
        try {
            const { id, name, description, author } = req.body;

            if(!id) return res.status(400).send("Please add book ID");

            if(!name) return res.status(400).send("Please add book name");

            const result = await Book.update(id, {
                name,
                description,
                author,
            });

            res.send(result);

        } catch(_error) {
            res.status(500).send(_error);
        };
    };

    static async delete (req, res, next) {
        try {
            const { id } = req.body;

            if(!id) return res.status(400).send("Please add book ID");

            const result = await Book.delete(id);

            res.send(result);

        } catch(_error) {
            res.status(500).send(_error);
        };
    };
};

module.exports = BookServices;

