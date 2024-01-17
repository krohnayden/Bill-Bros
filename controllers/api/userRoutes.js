const router = require('express').Router();
const { User } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll(req.body);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
})

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    

    const user = userData.get({ plain: true });
    console.log(user);

    if (!user) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    console.log(req.body);

    const validPassword = await userData.checkPassword(req.body.password);
    console.log(validPassword);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    console.log('2');

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      
      res.json({ user: user, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
    console.log(err, 'error');
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
