const router = require('express').Router();
const userRoutes = require('./userRoutes');
const categoriesRoutes = require('./categoryRoutes');
const transactionRoutes = require('./transactionRoutes');

router.use('/user', userRoutes);
router.use('/categories', categoriesRoutes);
router.use('/transaction', transactionRoutes);

module.exports = router;
