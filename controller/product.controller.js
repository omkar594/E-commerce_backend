
const productService=require("../service/product.service.js");

const createProduct =async(req,res)=>{
    
    try{
        const product = await productService.createProduct(req.body);
        console.log("&**&* OK (*(**",product)
        return res.status(201).json(product);
    }catch(e){
        return res.status(500).json({error:e.message});

    }
}

const deleteProduct=async(req,res)=>{
    const productId=req.params.id;
    try{
        const product = await productService.deleteProduct(productId);
        console.log("#check")
        return res.status(200).send(product);
    }catch(e){
        return res.status(500).send({error:e.message});
    }
}

const updateProduct=async(req,res)=>{
    const productId=req.params.id;
    try{
        const product = await  productService.updateProduct(productId,req.body);
        return res.status(200).send(product);
    }catch(e){
        return res.status(500).send({error:e.message});
    }
}

const userPrice=async(req,res)=>{
    const userPrice=req.params.price;
    const productId=req.params.id;

    try{
        const product = await productService.findProductById(productId,userPrice);
        return res.status(200).send(product);

    }catch(e){

    }

}

const findProductById=async(req,res)=>{
    const productId = req.params.id;
    try{
        const product = await productService.findProductById(productId);
        return res.status(200).send(product);
    }catch(e){
        return res.status(500).send({error:e.message});
    }
}

const getAllProducts=async(req,res)=>{
    
    try{
        const product = await productService.getAllProducts(req.query);
        return res.status(200).send(product);
    }catch(e){
        return res.status(500).send({error:e.message});
    }
}

const createMultipleProduct=async(req,res)=>{
    const productId = req.params.id;
    try{
        const product = await productService.createMultipleProduct(req.body);
        return res.status(201).send({message:"Product Created Successfully"});
    }catch(e){
        return res.status(500).send({error:e.message});
    }
}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    createMultipleProduct,
    findProductById,
}