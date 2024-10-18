const Chapter = require('../methods/Chapter');

class ChapterService {
    static async show (req, res, next) {
        try {
            const { id } = req.query;

            if(!id) return res.status(400).send("Please add chapter ID");

            const result = await Chapter.findOne(id);

            res.send(result);

        } catch(_error) {
            res.status(500).send(_error);
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
            res.status(500).send(_error);
        };
    };

    static async update (req, res, next) {
        try {
            const { id, book, title, content } = req.body;

            if(!id) return res.send(400).send("Please add chapter ID");

            if(!book) return res.status(400).send("Please add book ID");

            if(!title) return res.status(400).send("Please add chapter title");

            if(!content) return res.status(400).send("Please add content");

            const result = await Chapter.update(id, {
                book,
                title,
                content
            });

            res.send(result);

        } catch(_error) {
            res.status(500).send(_error);
        };
    };

    static async delete (req, res, next) {
        try {
            const { id } = req.body;

            if(!id) return res.status(400).send("Please add chapter ID");

            const result = await Chapter.delete(id);

            res.send(result);

        } catch(_error) {
            res.status(500).send(_error);
        };
    };
};

module.exports = ChapterService;

