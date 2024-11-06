const Chapter = require('../methods/Chapter');
const Book = require('../methods/Book');

class ChapterServices {
    static async load (req, res, next) {
        try {
            const { book } = req.params;

            if(!book) return res.status(400).send("Please add book ID");

            const foundBook = await Book.findOne({ where: { id: book } });

            if(!foundBook) return res.status(404).send("Book not found");

            const result = await Chapter.findAll({ where: { book: book } });

            res.send(result)

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };

    static async show (req, res, next) {
        try {
            const { id } = req.params;

            if(!id) return res.status(400).send("Please add chapter ID");

            const result = await Chapter.findOne({  where: { id: id } });

            if(!result) return res.status(400).send("Chapter not found")

            res.send(result);

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };

    static async create (req, res, next) {
        try {
            const { book, title, content } = req.body;

            if(!book) return res.status(400).send("Please add book ID");

            if(!title) return res.status(400).send("Please add chapter title");

            if(!content) return res.status(400).send("Please add content");

            const result = await Chapter.create({
                book,
                title,
                content
            });

            res.send(result);

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };

    static async update (req, res, next) {
        try {
            const { id, title, content } = req.body;

            if(!id) return res.send(400).send("Please add chapter ID");

            if(!title) return res.status(400).send("Please add chapter title");

            if(!content) return res.status(400).send("Please add content");

            const result = await Chapter.update({
                title,
                content
            }, { where: { id: id }});

            res.send(result);

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };

    static async delete (req, res, next) {
        try {
            const { id } = req.body;

            if(!id) return res.status(400).send("Please add chapter ID");

            await Chapter.destroy({ where: { id: id } });

            res.send();

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };
};

module.exports = ChapterServices;

