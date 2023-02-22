const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

app.use(bodyParser.json());

app.use(cors());


const userRoutes = require('./routes/user');
const expenceRoutes = require('./routes/expence');
const purchaseRouter = require('./routes/purchase');
const premiumRouter = require('./routes/premium');
const passwordRouter = require('./routes/password');
const errorController = require('./controllers/error');
const homeController = require('./controllers/home');

app.use(express.static(path.join(__dirname, 'frontend')));


app.use('/user', userRoutes);
app.use('/expence', expenceRoutes);
app.use('/purchase', purchaseRouter);
app.use('/premium', premiumRouter);
app.use('/password' , passwordRouter);
app.get('/', homeController.homepage);
app.use(errorController.get404);


const port = process.env.port;
mongoose.connect(process.env.mongooseDatabase)
  .then(() => {
    console.log(`listening to the port:${port}`);
    app.listen(port);
  })
  .catch(err => console.log(err))
