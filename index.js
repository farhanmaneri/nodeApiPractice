const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
var cors = require('cors')

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
  
const productSchema = new mongoose.Schema({
  title: {
required: [true, 'title is missing'],
type: String
  },
  price: Number,
  description: String,
  rating: Object,
})

app.get("/", (req, res) => {
  res.send("nxb rest api testing ");
});
const Products = mongoose.model('product', productSchema)
// get function
app.get("/products", async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).send({ data: products });
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
});

//get by id
app.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if(! mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({message:"Invalid Product ID"});
    }

    const product = await Products.findOne({ _id: id });
    if (product == null) {
      return res.status(404).send({ message: "No product exist against this id" });
    } 
      res.status(200).send(product);
    
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
});



app.delete("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if(! mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({message:"Invalid Product ID"});
    }

    // Todo : Find product before deleting (done)
    const deletedProduct = await Products.findOne({_id:id})
    // console.log(deleteProduct)
    const product = await Products.deleteOne({_id:id});
    console.log(product);
    if (product.deletedCount == 0) {
      return res.status(404).send({ message: "No product exist against this id" });
    }     
    res.status(200).send({Deleted_Product:deletedProduct, message: "Product deleted successfully"});
    // Todo: send product in response (done)
    // res.status(200).send({ data:product, message: "Product deleted successfully"});    
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
});

app.post("/products/", async (req, res) => {
  try {
   
   const productData=  req.body
   console.log(productData)
   const product=new Products(productData)
   const response= await product.save()
   res.status(200).send({ data:response, message: "Product saved successfully"})
    
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
});

app.listen(port, host, ()=>{
  console.log('lessing........')
})