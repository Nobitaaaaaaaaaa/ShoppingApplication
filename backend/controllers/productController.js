import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';


//function for add product to database
const addProduct = async (req, res) => {
    try{
        const {name , description , price , category , subcategory , sizes , bestseller} = req.body;

        const image1=req.files.image1 && req.files.image1[0];
        const image2= req.files.image2 && req.files.image2[0];
        const image3= req.files.image3 && req.files.image3[0];
        const image4= req.files.image4 && req.files.image4[0];

        const images = [image1,image2,image3,image4].filter(image => image !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async(item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'auto'});

                return result.secure_url;
            })
        );

        const productData={
            name,
            description,
            price:number(price),
            category,
            subcategory,
            bestseller: bestseller === 'true' ? true : false,
            sizes: JSON.parse(sizes),
            images: imagesUrl,
            date: Date.now()
        }

        const product = new productModel(productData);
        await product.save();

        res.status(201).json({message: 'Product added successfully'});
    }catch(error){
        console.log('Error:', error);
        res.status(500).json({message: 'Error adding product', error});
    }
}

//function for list products
const listProducts = async (req, res) => {

    try{
        const products = await productModel.find({});
        res.json(products);
        
    }catch(error){
        res.status(500).json({message: 'Error fetching products', error});

    }

}

//function for removing product
const removeProduct = async (req, res) => {

    try{
        await productModel.findByIdAndDelete(req.body.id);
        res.json({message: 'Product removed successfully'});
    }
    catch(error){
        res.status(500).json({message: 'Error removing product', error});
    }

}

// function for single product details
const singleProduct = async (req, res) => {

    try{
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json(product);
    }catch(error){
        res.status(500).json({message: 'Error fetching product', error});
    }

}

export {addProduct, listProducts, removeProduct, singleProduct};

