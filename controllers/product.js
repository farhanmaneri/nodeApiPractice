const mongoose = require('mongoose')
const Products = require('../models/product')
 
 // get function
 let getProducts = async  (req, res) => {
   try {
     const products = await Products.find();
     res.status(200).send({ data: products });
   } catch (error) {
     res.status(500).send({ error: error.toString() });
   }
 };
 
 //get by id
 let getProduct= async (req, res) => {
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
 };
let editProduct = async (req, res)=>{
 try{ const id = req.params.id
  if(! mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({message:"Invalid Product ID"});
  }
 
  const result = await Products.updateOne({_id: id},{
    $set:{
      title: 'farhan khan maneri',
    }
  });
  if (result.matchedCount == 0) {
    return res.status(404).send({ message: "No product exist against this id" });
  }  
  res.status(200).send({result, message:'updated successfully'})

  
}catch (error) {
  res.status(500).send({ error: error.toString() });
}

}
 
 let deleteProduct= async (req, res) => {
   try {
     const id = req.params.id;
 
     if(! mongoose.Types.ObjectId.isValid(id)) {
       return res.status(400).send({message:"Invalid Product ID"});
     }
 
     // Todo : Find product before deleting (done)
     const deletedProduct = await Products.findOne({_id:id})
     // console.log(deleteProduct)
     const product = await Products.deleteOne({_id:id});
    //  console.log(product);
     if (product.deletedCount == 0) {
       return res.status(404).send({ message: "No product exist against this id" });
     }     
     res.status(200).send({Deleted_Product:deletedProduct, message: "Product deleted successfully"});
     // Todo: send product in response (done)
     // res.status(200).send({ data:product, message: "Product deleted successfully"});    
   } catch (error) {
     res.status(500).send({ error: error.toString() });
   }
 };
 
 let createProduct= async (req, res) => {
   try {
    
    const productData=  req.body
    console.log(productData)
    const product=new Products(productData)
    const response= await product.save()
    res.status(200).send({ data:response, message: "Product saved successfully"})
     
   } catch (error) {
     res.status(500).send({ error: error.toString() });
   }
 };
 
module.exports= {getProduct,getProducts,deleteProduct,createProduct, editProduct};