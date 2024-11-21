const { DataTypes } = require('sequelize');
const sequelize = require('../../db/sequelize');
const User = require('./User');
const bcrypt = require('bcrypt');

const Passport = sequelize.define('Passport', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    password: {
        type: DataTypes.STRING
    },   
    
    token: {
        type: DataTypes.STRING
    },
}, 
{
    hooks: {
        beforeCreate: function (value) {
            const hash = bcrypt.hashSync(value.password, 10);

            value.password = hash;

            return value;
        },
    },
});

Passport.prototype.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

Passport.hasOne(User, { 
    foreignKey: 'user',
});

User.hasMany(Passport, {
    foreignKey: 'passport',
});

module.exports = Passport;