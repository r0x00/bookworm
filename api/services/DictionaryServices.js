const axios = require('axios');

class DictionaryServices {
    static async translation (req, res, next) {
        try {
            const { query, languageFrom, languageTo } = req.query;

            if(!query) return res.status(400).send('Please add query');
        
            if(!languageFrom) return res.status(400).send('Please add languageFrom');

            if(!languageTo) return res.status(400).send('Please add languageTo');

            const translation = await axios({
                method: 'get',
                url: `https://api.mymemory.translated.net/get?q=${query}&langpair=${languageFrom}|${languageTo}`
            });

            const result = {
                found: false,
            };

            if(translation.data?.responseData?.match) {
                result.found = true;
                result.translation = translation.data?.responseData?.translatedText
            };

            res.status(200).send(result);

        } catch(_error) {
            res.status(500).send(_error.message);
        };
    };
}; 

module.exports = DictionaryServices;