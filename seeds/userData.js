const { User } = require('../models');
const sequelize = require ('../config/connection');

const userArray = [{
  name: "Jacob Williams",
  email: "email@email.com",
  password: "thispass1"
},
{
  name: "Jon Hall",
  email: "jon@email.com",
  password: "thispass1"
},
{
  name: "Ayden Krohn",
  email: "Ayden@email.com",
  password: "thispass1"
}];


User.bulkCreate(userArray)



