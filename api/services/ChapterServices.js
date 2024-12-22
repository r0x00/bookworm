const Chapter = require('../methods/Chapter');
const Book = require('../methods/Book');
const User = require('../methods/User');

class ChapterServices {
    static async load (req, res, next) {
        try {
            const { book, page, limit } = req.params;

            if(!book) return res.status(400).send("Please add book ID");

            const foundBook = await Book.findOne({ where: { id: book } });

            if(!foundBook) return res.status(404).send("Book not found");

            const total = await Chapter.count({ where: { book: book }});

            const pagination = {
                limit: limit ?? 10,
                total: total,
                page: page ?? 1,
            };

            pagination.maxPages = Math.ceil(total / pagination.limit);

            if(pagination.maxPages != 0 && pagination.page > pagination.maxPages) return res.status(404).send("You reached the last page");
            if(pagination.page < 1) return res.status(404).send("You reached the first page");

            const result = await Chapter.findAll({ where: { book: book } }, {
                skip: (pagination.page - 1) * pagination.limit,
                limit: pagination.limit
            });


            const userId = req.session?.passport?.user?.id;

            let user;
            if(userId) user = await User.findOne( { where: { id: userId }});

            const chapters = [];

            for await (let chapter of result) {
                chapter.content = chapter.content.slice(0, 200) + '...';

                if(userId) {
                    const alreadyRead = await user.hasReadChapter(chapter.id);

                    chapter.dataValues.read = alreadyRead;
                };
                
                chapters.push(chapter)
            };
            

            res.send({ chapters, pagination });

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };

    static async show (req, res, next) {
        try {
            const { id } = req.params;

            if(!id) return res.status(400).send("Please add chapter ID");

            const result = await Chapter.findOne({  where: { id: id }, include: [ { model: Book, as: 'Book', attributes: [ 'id', 'name' ]} ] });

            if(!result) return res.status(400).send("Chapter not found");

            const chapters = await Chapter.findAll({ where: { book: result.Book.id }, attributes: [ 'id', 'title' ]});

            const userId = req.session?.passport?.user?.id;

            if(userId) {
                const user = await User.findOne( { where: { id: userId }});

                const alreadyRead = await user.hasReadChapter(id);

                if(!alreadyRead) {
                    await user.addReadChapter(id);

                    await Chapter.update({ views: result.views + 1 }, { where: { id: id }});
                };
            };

            let currentChapterNumber;

            for (let i = 0; i < chapters.length; i++) { 
                if(chapters[i].id == id) currentChapterNumber = i;
            };

            let prevChapter = chapters[currentChapterNumber - 1];
            if(prevChapter) prevChapter = { ...prevChapter.dataValues, chapterNumber: currentChapterNumber - 1 };
            
            let nextChapter = chapters[currentChapterNumber + 1];
            if(nextChapter) nextChapter = { ...nextChapter.dataValues, chapterNumber: currentChapterNumber + 1 };
        

            const nearChapterInfo = {
                prev: prevChapter,
                next: nextChapter,
            };

            result.dataValues.chapterNumber = currentChapterNumber;

            res.send({
                chapter: result,
                nearChapterInfo
            });

        } catch(_error) {
            console.log(_error)
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

    static async countBookChapters (req, res, next) {
        try {
            const { id } = req.params;

            if(!id) return res.status(400).send("Please add book ID");
            
            const result = await Chapter.count({ where: { book: id }});

            res.send({ total: result });

        } catch(_error) {
            res.status(500).send(_error.message);
        }

    };
};

module.exports = ChapterServices;

