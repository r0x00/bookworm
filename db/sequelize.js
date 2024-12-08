const { Sequelize } = require('sequelize');

require('dotenv').config();

class SequelizeORM {
  static sequelize;

  constructor() {
    this.sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
      host: process.env.DATABASE_HOST, 
      port: process.env.DATABASE_PORT,
      dialect: 'mysql', 
      logging: console.log
    });
  };

  async syncDatabase() {
    try {
      await this.sequelize.sync({ force: false });

      await this.sequelize.query('ALTER TABLE `Users` DROP INDEX `username`, DROP INDEX `email`');

      console.log('Database & tables created!');

      require("../api/services/DefaultServices").admin();
      require("../api/services/DefaultServices").showcase();

    } catch (error) {
      console.error('Error syncing database:', error);
    };
  };
};


const sequelize = new SequelizeORM();

sequelize.syncDatabase();

module.exports = sequelize.sequelize;
