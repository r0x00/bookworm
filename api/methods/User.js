const { DataTypes } = require('sequelize');
const sequelize = require('../../db/sequelize');
const Book = require('./Book');
const Chapter = require('./Chapter');

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    
    username: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
    }, 

    email: {
        type: DataTypes.STRING,
        required: true,
        unique: true
    },

    permission: {
        type: DataTypes.ENUM,
        values: [ 'admin', 'common' ],
        required: true,
        defaultValue: 'common'
    }
});

User.hasMany(Book, {
    foreignKey: 'readBook',
    as: 'readBook'
});

User.hasMany(Book, {
    foreignKey: 'likes',
    as: 'likes'
});

User.hasMany(Chapter, {
    foreignKey: 'readChapter',
    as: 'readChapter'
});

User.hasMany(Book, {
    foreignKey: 'createdBy',
    as: 'booksCreated'
});

Book.belongsTo(User, {
    foreignKey: 'createdBy',
});


module.exports = User;