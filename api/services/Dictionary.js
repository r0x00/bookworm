const db = require('../../db/mysql');

class Dictionary {
    static translation (req, res, next) {
        console.log(db.query({ sql: '', query: ''}));
        res.send('hihi')
        
    }
}; 

module.exports = Dictionary;