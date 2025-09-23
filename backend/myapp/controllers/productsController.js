import { products } from "../data/seed.js";
import { v4 as uuidv4 } from "uuid";

/**
 * Note: currently uses in-memory array `products`.
 * Swap to DB later (Mongo/Prisma/Postgres) with minimal changes.
 */

export const getAllProducts = async (req, res) => {
  // support simple query params: ?q=shirt & ?limit=10
  const { q, limit } = req.query;
  let result = products;

  if (q) {
    const term = q.toLowerCase();
    result = result.filter(
      p => p.name.toLowerCase().includes(term) || (p.description && p.description.toLowerCase().includes(term))
    );
  }

  if (limit) result = result.slice(0, Number(limit));

  res.json({ count: result.length, data: result });
};

export const getProductById = async (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(product);
};

export const createProduct = async (req, res) => {
  const { name, price, description } = req.body;
  if (!name || price == null) {
    res.status(400);
    throw new Error("name and price are required");
  }
  const newProduct = { id: uuidv4(), name, price, description: description || "", createdAt: new Date().toISOString() };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

export const updateProduct = async (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  const { name, price, description } = req.body;
  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = price;
  if (description !== undefined) product.description = description;
  product.updatedAt = new Date().toISOString();
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) {
    res.status(404);
    throw new Error("Product not found");
  }
  const deleted = products.splice(idx, 1);
  res.json({ deleted: deleted[0] });
};
