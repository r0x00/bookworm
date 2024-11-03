const { DataTypes } = require('sequelize');

const sequelize = require('../../db/sequelize');

const Chapter = sequelize.define('chapter', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    title: {
        type: DataTypes.STRING,
        required: true
    },

    content: {
        type: DataTypes.TEXT,
        required: true
    },
});

module.exports = Chapter;