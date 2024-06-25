const express = require('express')
const  app = express()
require('dotenv').config()
const db_config = require('./config/db_config')
app.use(express.json());
const userRoute = require('./routes/userRoutse')
const adminRouts = require('./routes/adminRoutes')
const doctorRoutes = require('./routes/doctorRoutes')


app.use('/api/user',userRoute)
app.use('/api/admin',adminRouts)
app.use('/api/doctor',doctorRoutes)

const port = process.env.PORT || 5000;

console.log(process.env.mongo_url);



app.listen(port,() =>{

    console.log(`port is listning at ${port}`);


})