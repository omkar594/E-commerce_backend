const Product = require("../models/product.model");
const Category = require("../models/category.model");

async function createProduct(reqData) {
  let topLevel = await Category.findOne({ name: reqData.topLevelCategory });
  if (!topLevel) {
    topLevel = new Category({
      name: reqData.topLevelCategory,
      level: 1,
    });
    await topLevel.save();
  }
  let secondLevel = await Category.findOne({
    name: reqData.secondLevelCategory,
    parentCategory: topLevel._id,
  });

  if (!secondLevel) {
    secondLevel = new Category({
      name: reqData.secondLevelCategory,
      parentCategory: topLevel._id,
      level: 2,
    });
    await secondLevel.save();
  }

  let thirdLevel = await Category.findOne({
    name: reqData.thirdLevelCategory,
    parentCategory: secondLevel._id,
  });
  if (!thirdLevel) {
    thirdLevel = new Category({
      name: reqData.thirdLevelCategory,
      parentCategory: secondLevel._id,
      level: 3,
    });
    await thirdLevel.save();
  }

  const product = new Product({
    title: reqData.title,
    color: reqData.color,
    description: reqData.description,
    discountedPrice: reqData.discountedPrice,
    discountedPercent: reqData.discountedPercent,
    imageUrl: reqData.imageUrl,
    brand: reqData.brand,
    price: reqData.price,
    size: reqData.size,
    quantity: reqData.quantity,
    category: thirdLevel._id,
  });
  return await product.save();
}

async function deleteProduct(productId) {
  const product = await findProductById(productId);

  await product.findByIdAndDelete(productId);
  return "Product deleted SuccessFully";
}

async function updateProduct(productId, reqData) {
  return await Product.findByIdAndUpdate(productId, reqData);
}

async function findProductById(id) {
  const product = await Product.findById(id).populate("category").exec();

  if (!product) {
    throw new Error("Product not found with id " + id);
  }
  return product;
}

async function getAllProducts(reqQuery) {
  let {
    category,
    color,
    size,
    minPrice,
    maxPrice,
    minDiscount,
    sort,
    stock,
    pageNumber=1, // Default to 1 if pageNumber is not provided
    pageSize = 10, // Default to 10 if pageSize is not provided
  } = reqQuery;
  console.log(reqQuery.pageNumber);
  // Ensure pageNumber and pageSize are valid non-negative integers
  pageNumber = Math.max(1, parseInt(pageNumber, 10)|| 1); // Ensure pageNumber is at least 1
  pageSize = Math.max(1, parseInt(pageSize, 10)|| 10); // Ensure pageSize is at least 1

  // Initialize query to get all products
  let query = Product.find().populate("category");

  

  try {
    // Handle category filter
    if (category) {

      const existCategory = await Category.findOne({ name: category });
      if (!existCategory) {
        console.log("Category not found");
        return { content: [], currentPage: 1, totalPages: 0 }; // Return empty if category not found
      }
      query = query.where("category").equals(existCategory._id);
    }

    if(color){
      const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));

      const colorRegex=colorSet.size>0?new RegExp([...colorSet].join("|"),"i"):null
      
        query=query.where("color").regex(colorRegex)
    }

    if(size){
      const sizeSet = new Set(size)
      console.log("try",sizeSet);
      query=query.where("size.name").in([...sizeSet]);
      
    }

    if(minPrice && maxPrice){
      query = query.where('discountedPrice').gte(minPrice).lte(maxPrice)
    }

    if(minDiscount){
      try{
        query = query.where('discountedPercent').gte(minDiscount);
      }catch(e){
        console.log("This the Error",e.message);
      }
    }

    if(stock){
      if(stock=='in_stock'){
        try{
          query=query.where("quantity").gt(0);
        }catch(e){
          console.log("This is the error",e.message)
        }
      }
      else if(stock=='out_of_stock'){
        query=query.where("quantity").gte(0);
      }
    }

    if(sort){
      const sortDirection=sort==="price_high"?-1:1;
      query = query.sort({discountedPrice:sortDirection})
    }

    // Get total count of documents matching the query (without pagination)
    const totalProducts = await Product.countDocuments(query);
    console.log("Total products matching filter: ", totalProducts);

    // Pagination logic
    const skip = (pageNumber-1) * pageSize; // Ensure skip is non-negative
    console.log(pageNumber,pageSize)
    query = query.skip(skip).limit(pageSize); // Apply pagination skip and limit


    // Fetch the products from the database
    const products = await query.exec();

    // Return paginated results
    const totalPages = Math.ceil(totalProducts / pageSize);
    // console.log("Fetched products: ", products);

    return {
      content: products,
      currentPage: pageNumber,
      totalPages: totalPages,
    };
  } catch (error) {
    console.log("Error in getAllProducts: ", error.message);
    return { content: [], currentPage: 1, totalPages: 0 }; // Return empty if any error occurs
  }
}

async function createMultipleProduct(products) {
  for (let product of products) {
    await createProduct(product);
  }
}

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  findProductById,
  createMultipleProduct,
};
