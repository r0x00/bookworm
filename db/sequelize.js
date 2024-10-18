const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('#i@UP6dS8axcYtSTa##Z@1R@VUPXExsJhv_', 'bookworm', '#pmDP#Wi@7JtXEhn@GT#_7mrOG#ItFk_#o', {
  host: '0.0.0.0', 
  port: 3306,
  dialect: 'mysql', 
  logging: console.log, 
  // force: true
});

const syncDatabase = async () => {
  try {
      await sequelize.sync({ force: false });
      console.log('Database & tables created!');
  } catch (error) {
      console.error('Error syncing database:', error);
  }
};

syncDatabase();

module.exports = sequelize;
