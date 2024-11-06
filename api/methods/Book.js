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
        validate: {
            max: 300
        }
    },

    description: {
        type: DataTypes.STRING,
        validate: {
            max: 300
        }
    },

    author: {
        type: DataTypes.STRING,
        validate: {
            max: 300
        }
    },

    type: {
        type: DataTypes.JSON
    },

    views: {
        type: DataTypes.INTEGER
    },

    finished: {
        type: DataTypes.BOOLEAN,

    },

    wallpaper: {
        type: DataTypes.BLOB
    },
});


Book.hasMany(Chapter, {
    foreignKey: 'chapter',
});

Chapter.belongsTo(Book, { 
    foreignKey: 'book',
});

module.exports = Book;