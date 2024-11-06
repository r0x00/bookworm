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
        required: true,
        validate: {
            max: 300
        }
    },

    content: {
        type: DataTypes.TEXT,
        required: true,
        validate: {
            max: 3000
        }
    },

    views: {
        type: DataTypes.INTEGER
    }
});

module.exports = Chapter;