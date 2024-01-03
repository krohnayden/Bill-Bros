const router = require('express').Router();
const userRoutes = require('./user');
const categoriesRoutes = require('./categories');
const transactionRoutes = require('./transaction');

router.use('/user', userRoutes);
router.use('/categories', categoriesRoutes);
router.use('/transaction', transactionRoutes);

module.exports = router;
