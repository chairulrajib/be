const express = require('express');
const PORT = 2305;
const app = express();
const cors = require('cors');
const { dbConf } = require('./src/config/db');

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.status(200).send('<h1>ESHOP API</h1>')
})

//testing mysql connection
dbConf.getConnection((err,connection)=>{
    if (err) {
        console.log(`Error mySQL Connection`, err.message)
    }
 
    console.log(`Connect MySQL ✅ : ${connection.threadId}`);
})

//config route

const {usersRouter} = require('./src/routers')
app.use('/users', usersRouter)

app.listen(PORT, () => console.log(`RUNNING API ${PORT}`))