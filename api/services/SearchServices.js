const Book = require('../methods/Book');
const { Op } = require('sequelize');

class SearchServices {
    static async search (req, res, next) {
        try {
            const query = req.query.query;
            
            if(!query) return res.status(400).send('Please add query');

            if(query.replace(/\s/g, "") == '') return res.status(400).send('Please add query');

            const result = await Book.findAll({ where: { name: { [ Op.like ]: `%${query}%` } }, attributes: [ 'id', 'name' ] });

            res.status(200).send(result);

        } catch(_error) {
            console.log(_error);
            res.status(500).send(_error.message);
        }
    }
};

module.exports = SearchServices;