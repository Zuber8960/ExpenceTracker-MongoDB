const mongoose = require('mongoose');
const { UUID, UUIDV4 } = require('sequelize');
const Scheema = mongoose.Schema;

const forgotpasswordScheema = new Scheema({
    isActive : { type : Boolean, required : true},
    email : { type : String , required : true},
    id : { type : String , required : true}
});

module.exports = mongoose.model('Forgotpassword' , forgotpasswordScheema);




// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const forgotpassword = sequelize.define('forgotpassword' , {
//     id : {
//         type : Sequelize.UUID,
//         allowNull : false,
//         primaryKey : true,
//     },
//     isActive : Sequelize.BOOLEAN,
// })

// module.exports = forgotpassword;