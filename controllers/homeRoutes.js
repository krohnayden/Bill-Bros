const router = require('express').Router();
const { Category, User, Transaction } = require('../models');
const withAuth = require('../helpers/auth');

router.get('/', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('login');
});

router.get('/', async (req, res) => {
  try {
    // Get all categories and JOIN with user data
    const categoriesData = await Category.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const categories = categoriesData.map((categories) => categories.get({ plain: true }));

    // Pass serialized data and session flag into template

    // must specify handlebar route line 31

    res.render('', { 
      categories, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/categories/:id', async (req, res) => {
  try {
    const categoriesData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const categories = categoriesData.get({ plain: true });

    res.render('categories', {
      ...categories,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route

// need to specify handlebar route line 

router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Transaction }],
    });

    const transactionData = await Transaction.findAll({
      where: {
        user_id: req.session.user_id
      }
    });

    const transactions = transactionData.map((transaction) => 
      transaction.get({ plain: true }));
    console.log('Transactions:', transactions);

    const user = userData.get({ plain: true });
    console.log(user);

    res.render('dashboard', {
      ...user,
      transactions,
      logged_in: true
    });

    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;

