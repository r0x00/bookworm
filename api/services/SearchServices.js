class SearchServices {
    static async search (req, res, next) {
        try {
            const { query } = req.body; 

            if(!query) return res.status(400).send('Please add query');

            if(query.replace(/\s/g, "") == '') return res.status(400).send('Please add query');

            const result = await Book.findAll({ where: { name: { [Op.iLike]: `%${query}%` } } });

            res.status(200).send(result);

        } catch(_error) {
            res.status(500).send(_error.message);
        }
    }
};

module.exports = SearchServices;