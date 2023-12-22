const User = require('./users');
const Category = require('./categories');
const Transaction = require('./transactions');

User.hasMany(Category, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Category.belongsTo(User, {
  foreignKey: 'user_id'
});

Category.hasMany(Transaction, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

Transaction.belongsTo(Category, {
  foreignKey: 'category_id'
});


module.exports = { User, Category, Transaction }