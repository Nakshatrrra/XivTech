const express = require('express');
const climateRoute = require('./routes/climate/climate');


const app = express();


require('dotenv').config();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/climate', climateRoute);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
  