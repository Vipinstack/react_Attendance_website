const dotenv = require('dotenv');
const cors= require('cors');
const express = require('express');
const app = express();


//database conn..
dotenv.config({ path:'./config.env'});
require('./db/conn');
const PORT = process.env.PORT;


app.use(cors()); //cross orgin request
app.use(express.json());//parse post data
const adminRoute = require('./routes/adminRoutes');
app.use('/api', adminRoute);



app.listen(PORT, ()=>{
    console.log(`Server is running is port no ${PORT}`);
})



