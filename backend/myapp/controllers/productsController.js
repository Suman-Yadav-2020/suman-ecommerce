// controllers/productsController.js
import Product from "../models/Products.js";

/**
 * GET /api/products?q=&limit=
 */
export const getAllProducts = async (req, res) => {
  const { q, limit } = req.query;
  const filter = {};
  if (q) filter.$or = [
    { name: new RegExp(q, "i") },
    { description: new RegExp(q, "i") },
  ];

  const query = Product.find(filter).sort({ createdAt: -1 });
  if (limit) query.limit(Number(limit));

  const products = await query.exec();
  res.json({ count: products.length, data: products });
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(product);
};

export const createProduct = async (req, res) => {
  const { name, price, description, image, countInStock } = req.body;
  if (!name || price == null) {
    res.status(400);
    throw new Error("name and price are required");
  }
  const product = new Product({ name, price, description, image, countInStock });
  const saved = await product.save();
  res.status(201).json(saved);
};

export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  Object.assign(product, req.body);
  const updated = await product.save();
  res.json(updated);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  await product.remove();
  res.json({ message: "Product removed" });
};
