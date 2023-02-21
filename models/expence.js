const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenceScheema = new Schema({
  amount: { type : Number, required : true },
  description: { type : String, required : true },
  categary: { type : String, required : true },
  userId : { type : mongoose.Types.ObjectId, ref : 'User' , required : true}
})

module.exports = mongoose.model('Expence' , expenceScheema);



// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Expence = sequelize.define('expence', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   amount: Sequelize.INTEGER,
//   description: Sequelize.STRING,
//   categary: Sequelize.STRING
// });

// module.exports = Expence;
