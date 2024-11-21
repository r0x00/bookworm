const { DataTypes } = require('sequelize');
const sequelize = require('../../db/sequelize');

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

module.exports = User;