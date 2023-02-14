const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const shorid = require('shortid');
let cros = require("cros");

// const { generate } = require('shortid');


const app = express();
app.use(bodyParser.json());
app.use(cros());
mongoose.connect("mongodb+srv://anwar:anwar@123@cluster0.6lwjp.mongodb.net/?retryWrites=true&w=majority"
,{
useNewUrlParser:true,
useCreateIndex :true,
useUnifiedTopology:true
}
).then(()=>console.log('connected')).catch((error)=>console.log(error))


const Product = mongoose.model("products" , new mongoose.Schema({
    _id : {type :String, default: shorid.generate},
    title : String,
    description : String,
    image : String,
    price : String,
    availableSizes : [String],
}))

app.get("/api/product",async(req,res)=> {
        const products = await Product.find({});
        res.send(products)
})



app.post("/api/products",async(req,res)=> {
    const newProduct = new Product(req.body); 
 const savedProduct = await newProduct.save();
  res.send(savedProduct)
})



app.delete("/api/products/:id",async(req,res)=>{
    const deleteProduct = await Product.findByIdAndDelete(req.params.id)
    res.send(deleteProduct)
})

const port = process.env.PORT || 5000;
app.listen(port ,()=> console.log(`sever at http://localhost:5000`))