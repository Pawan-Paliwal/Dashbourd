import Product from "../model/Product.js";
import ProductStat from "../model/ProductStat.js";

export const func = (req, res) => {
  console.log("Hey you");
};
export const getProducts = async (req, res) => {
  console.log("hey1");
  try {
    const products = await Product.find();
    console.log(products);
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );
    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
