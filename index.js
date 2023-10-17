const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
var cors = require('cors')
const getProducts = require('./controllers/product')
const productRoutes = require('./routes/product')
require('dotenv').config()
// console.log(process.env) // remove this after you've confirmed it is working

const port = process.env.PORT || 3000
const host = process.env.HOST || '0.0.0.0';

const app = express()
app.use(morgan('tiny'))
 app.use(express.json()) 
app.use(cors())

const  dbConnection=async()=>{
  let connectonURI = process.env.MONGODB_CONNECTION_URI
  await mongoose.connect(connectonURI)
  console.log('connected to db')
 }
 dbConnection().catch((err)=>console.error(err))
 
app.get("/", (req, res) => {
  res.send("nxb rest api testing ");
});

app.use('/products',productRoutes)
 
app.listen(port, host, ()=>{
  console.log('lessing........')
})