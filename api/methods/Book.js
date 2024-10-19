const { DataTypes } = require('sequelize');

const sequelize = require('../../db/sequelize');
const Chapter = require('./Chapter');


const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    
    name: {
        type: DataTypes.STRING,
        required: true,
    },

    description: {
        type: DataTypes.STRING
    },

    author: {
        type: DataTypes.STRING
    },
});


Book.hasMany(Chapter, {
    foreignKey: 'chapter',
});

Chapter.belongsTo(Book, { 
    foreignKey: 'book',
});

module.exports = Book;