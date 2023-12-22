import fetch from 'node-fetch';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';




const app = express();

app.use(cors());

 

try{
    mongoose.connect("mongodb://127.0.0.1/mern_json_parser")
    console.log("connection successfull")
}
catch(error){
    console.log(error);
}
  
const productSchema = new mongoose.Schema({
   subCategory: {
   type: String,
   required:true

   },
   Title: {
    type:String,
    required:true
   },

  Price:{ 
    type:Number,
    requied:true
   },
  Popularity:{
    type : Number,
    required : true
  }
});

const Product = mongoose.model('Product', productSchema);


async function getPosts() {
  try {
    // Fetch data from the API
    const response = await fetch('https://s3.amazonaws.com/open-to-cors/assignment.json');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response JSON
    const product = await response.json();
    const productsData = product.products;
  //  console.log(product.products)

   for (const productId in productsData) {
    //console.log(productId)
    const productInfo = productsData[productId];
    const product = new Product({
      subCategory: productInfo.subcategory,
      Title: productInfo.title,
      Price: parseInt(productInfo.price),
      Popularity: parseInt(productInfo.popularity)
    });

   
     product.save();

   }


    
  
  } catch (error) {
    console.error('Error fetching or storing data:', error.message);


}




}
getPosts();

app.get('/product', async (req, res) => {
  try {
    console.log(1);
    const products = await Product.find().sort({ Popularity: -1 });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

    

app.listen(5000, () => {
  console.log('Server is running on port 5000');
}); 




