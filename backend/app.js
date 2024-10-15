const express = require('express');
const sequelize = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api', taskRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  console.log('Database connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});

