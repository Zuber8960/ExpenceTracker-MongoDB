const mongoose = require('mongoose');
const Scheema = mongoose.Schema;

const FiledownloadScheema = new Scheema({
  fileURL : {  type: String, required : true },
  userId : { type : mongoose.Types.ObjectId, required : true}
})


module.exports = mongoose.model('Filedownload' , FiledownloadScheema);

// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Filedownloaded = sequelize.define('filedownloaded', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   fileURL : Sequelize.STRING
// });

// module.exports = Filedownloaded;
