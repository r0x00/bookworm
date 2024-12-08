const { DataTypes } = require('sequelize');

const sequelize = require('../../db/sequelize');
const Book = require('./Book');


const Showcase = sequelize.define('Showcase', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    wallpaper: {
        type: DataTypes.STRING
    },

    redirect: {
        type: DataTypes.STRING
    },
});

Showcase.hasOne(Book, {
    foreignKey: 'book',
});

module.exports = Showcase;