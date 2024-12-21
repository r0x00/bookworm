const { DataTypes } = require('sequelize');
const sequelize = require('../../db/sequelize');
const Book = require('./Book');

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
    foreignKey: 'read',
    as: 'read'
});

User.hasMany(Book, {
    foreignKey: 'liked',
    as: 'liked'
});

// Book.hasMany(User, {
//     foreignKey: 'readBy',
// });

module.exports = User;