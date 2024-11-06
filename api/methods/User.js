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
        required: true
    }, 

    email: {
        type: DataTypes.STRING,
        required: true
    },

    permission: {
        type: DataTypes.ENUM,
        enum: [ 'admin', 'common' ],
        required: true,
        defaultValue: 'common'
    }
});

module.exports = User;