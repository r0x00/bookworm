const Book = require('../methods/Book');
const Chapter = require('../methods/Chapter');
const User = require('../methods/User');
const { Op } = require('sequelize');

class BookServices {
    static async load (req, res, next) {
        try {
            const query = req.query.query;


            const where = query ? { where: {name: { [ Op.like ]: `%${query}%` } } }: {};

            console.log(where)

            const result = await Book.findAll(where);

            res.send(result);

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };

    static async show (req, res, next) {
        try {
            const { id } = req.params;

            if(!id) return res.status(400).send("Please add book ID");

            const result = await Book.findOne({ where: { id: id } });

            if(!result) return res.status(400).send("Book not found");
            
            const userId = req.session?.passport?.user?.id;

            if(userId) {
                const user = await User.findOne( { where: { id: userId }});

                const alreadyRead = await user.hasReadBook(id);

                if(!alreadyRead) {
                    await user.addReadBook(id);

                    await Book.update({ views: result.views + 1 }, { where: { id: id }});
                };

                result.dataValues.userLiked = await user.hasLikes(id);
            };

            const likes = await User.count({
                include: [ { model: Book, as: 'likes', attributes: [ 'id' ], where: { id: id } } ] 
            });

            result.dataValues.likes = likes;

            res.send(result);

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };

    static async create (req, res, next) {
        try {
            const { name, description, author, tags, wallpaper } = req.body;

            if(!name) return res.status(400).send("Please add book name");

            const userId = req.session?.passport?.user?.id;

            if(!userId) return res.status(400).send("Please login");

            const result = await Book.create({
                name,
                description,
                author,
                tags,
                wallpaper,
                createdBy: userId
            });

            res.send(result);

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };

    static async update (req, res, next) {
        try {
            const { id, name, description, author, tags, wallpaper, finished } = req.body;

            if(!id) return res.status(400).send("Please add book ID");
            if(!name) return res.status(400).send("Please add book name");

            const checkBook = await Book.findOne({ where: { id: id } });

            if(!checkBook) return res.status(400).send("Book not found");

            const userId = req.session?.passport?.user?.id;

            if(checkBook.createdBy != userId) return res.status(400).send("You can't update this chapter");

            const result = await Book.update( {
                name,
                description,
                author,
                tags,
                wallpaper,
                finished
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

            const checkBook = await Book.findOne({ where: { id: id } });

            if(!checkBook) return res.status(400).send("Book not found");

            const userId = req.session?.passport?.user?.id;

            if(checkBook.createdBy != userId) return res.status(400).send("You can't update this chapter");

            await Chapter.destroy({ where: { book: id }});
            await Book.destroy({ where: { id: id } });

            res.send();

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };

    static async like (req, res, next) {
        try {
            const { id } = req.body;

            if(!id) return res.status(400).send("Please add book ID")
            if(!req.session?.passport?.user?.id) return res.status(400).send("Please login");
            
            const user = await User.findOne({ where: { id: req.session?.passport?.user?.id }});

            const bookLike = await user.hasLikes(id);

            if(!bookLike) await user.addLikes(id);
            else await user.removeLikes(id);

            res.status(200).send();

        } catch(_error) {    
            res.status(500).send(_error.message);
        };
    }
};

module.exports = BookServices;

