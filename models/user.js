const mongoose = require('mongoose');
const Scheema = mongoose.Schema;

const userSchema = new Scheema({
  name : {
    type : String, required : true
  },
  email : {
    type : String , required : true
  },
  isPremiumUser : {
    type : Boolean, required : true
  },
  password : {
    type : String , required : true
  }
})

module.exports = mongoose.model('User' , userSchema);








// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const User = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: {
//     type: Sequelize.TEXT,
//   },
//   email: {
//     type: Sequelize.STRING,
//     unique: true
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   isPremiumUser: Sequelize.BOOLEAN
// });

// module.exports = User;
