const { DataTypes } = require('sequelize');
const sequelize = require('../../db/sequelize');
const User = require('./User');

const Passport = sequelize.define('Passport', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    password: {
        type: DataTypes.STRING
    }
});


Passport.belongsTo(User, { 
    foreignKey: 'book',
});

module.exports = Passport;