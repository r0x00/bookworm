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

            const result = await Chapter.findAll({ where: { book: book }, attributes: { exclude: [ 'content' ] }}, {
                skip: (pagination.page - 1) * pagination.limit,
                limit: pagination.limit
            });


            const userId = req.session?.passport?.user?.id;

            let user;
            if(userId) user = await User.findOne( { where: { id: userId }});

            const chapters = [];

            for await (let chapter of result) {
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

            const result = await Chapter.findOne({  where: { id: id }, include: [ { model: Book, as: 'Book', attributes: [ 'id', 'name', 'createdBy' ]} ] });

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
            const { book, title, content, summary } = req.body;

            if(!book) return res.status(400).send("Please add book ID");

            const checkBook = await Book.findOne({ where: { id: book } });

            if(!checkBook) return res.status(400).send("Book not found");

            const userId = req.session?.passport?.user?.id;

            if(checkBook.createdBy != userId) return res.status(400).send("You can't add chapter to this book");

            if(!title) return res.status(400).send("Please add chapter title");

            if(!content) return res.status(400).send("Please add content");

            if(!summary) return res.status(400).send("Please add summary");

            let summaryShortned = summary.slice(0, 200);

            const result = await Chapter.create({
                book,
                title,
                content,
                summary: summaryShortned
            });

            res.send(result);

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };

    static async update (req, res, next) {
        try {
            const { id, title, content, summary } = req.body;

            if(!id) return res.status(400).send("Please add chapter ID");
            if(!title) return res.status(400).send("Please add chapter title");
            if(!content) return res.status(400).send("Please add content");
            if(!summary) return res.status(400).send("Please add summary");

            const checkChapter = await Chapter.findOne({ where: { id: id } });

            if(!checkChapter) return res.status(400).send("Chapter not found");

            const checkBook = await Book.findOne({ where: { id: checkChapter.book } });

            if(!checkBook) return res.status(400).send("Book not found");

            const userId = req.session?.passport?.user?.id;

            if(checkBook.createdBy != userId) return res.status(400).send("You can't update this chapter");

            const result = await Chapter.update({
                title,
                content,
                summary
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

            const checkChapter = await Chapter.findOne({ where: { id: id } });

            if(!checkChapter) return res.status(400).send("Chapter not found");

            const checkBook = await Book.findOne({ where: { id: checkChapter.book } });

            if(!checkBook) return res.status(400).send("Book not found");

            const userId = req.session?.passport?.user?.id;

            if(checkBook.createdBy != userId) return res.status(400).send("You can't update this chapter");

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

