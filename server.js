const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors());
const mongoose = require('mongoose');
const userRoutes = require('./routes/userroutes');
const reportRoutes = require('./routes/reportroutes');
const PORT = 3000;
const dotenv = require('dotenv')
dotenv.config()
app.use(express.json());
mongoose.connect(process.env.MONGO_URL,{
    family: 4,
})
    .then(() => {
        console.log('Mongodb connected');
    })
    .catch(err => console.error('Error connecting to mongoDB:',err));
    app.use('/api/users',userRoutes);  
    app.use('/api/reports',reportRoutes);
app.use(express.static('public', {
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
