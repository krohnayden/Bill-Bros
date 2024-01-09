const router = require('express').Router();
const { Transaction } = require('../../models');
const withAuth = require('../../helpers/auth');

router.get('/', async (req, res) => {
  try {
    const transaction = await Transaction.findAll()
      res.status(200).json(transaction);   
  } catch (err) {
    res.status(400)
  }
}); 

router.post('/', async (req, res) => {
  try {
    const newTransaction = await Transaction.create({
      ...req.body,
    });

    res.status(200).json(newTransaction);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const transactionData = await Transaction.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!transactionData) {
      res.status(404).json({ message: 'No transaction found with this id!' });
      return;
    }

    res.status(200).json(transactionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;