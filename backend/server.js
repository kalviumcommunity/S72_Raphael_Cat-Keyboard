const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = 3000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅MongoDB connected successfully'))
.catch(err => console.error('❌MongoDB connection error:', err));


app.use(express.json());
app.get('/ping', (req, res) => {
  res.send('Ping successful!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
