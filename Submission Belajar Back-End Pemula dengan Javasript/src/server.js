const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const PORT = 9000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
