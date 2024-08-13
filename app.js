const express = require('express');
const bodyParser = require('body-parser');
const notesRoutes = require('./routes.js/notes');
const sequelize = require('./config/database');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use('/api', notesRoutes);

// Connect to PostgreSQL
sequelize.authenticate()
  .then(() => console.log('PostgreSQL connected'))
  .catch(err => console.error('PostgreSQL connection error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
