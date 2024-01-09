const User = require('./users');
const Category = require('./categories');
const Transaction = require('./transactions');

// User.hasMany(Category, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

// Category.belongsTo(User, {
//   foreignKey: 'user_id'
// });

User.hasMany(Transaction, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Transaction.belongsTo(User, {
  foreignKey: 'user_id'
});


module.exports = { User, Category, Transaction }