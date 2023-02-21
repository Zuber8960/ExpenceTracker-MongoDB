const mongoose = require('mongoose');
const Scheema = mongoose.Schema;

const downloadScheema = new Scheema({
  paymentId : { type : String, required : true},
  orderId : { type : String, required : true},
  status : { type : String, required : true},
  userId : { type : mongoose.Types.ObjectId , required : true}
})

module.exports = mongoose.model('Download' , downloadScheema);


// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Order = sequelize.define('order', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   paymentId : Sequelize.STRING,
//   orderId : Sequelize.STRING,
//   status : Sequelize.STRING,
// });

// module.exports = Order;
