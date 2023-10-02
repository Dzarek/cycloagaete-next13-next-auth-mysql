import { query } from "../../lib/db";

export default async function handler(req, res) {
  let message;
  if (req.method === "GET") {
    const products = await query({
      query: "SELECT * FROM products",
      values: [],
    });

    res.status(200).json({ products: products });
  }
  if (req.method === "POST") {
    const productName = req.body.product_name;
    const addProduct = await query({
      query: "INSERT INTO products (product_name) VALUES (?)",
      values: [productName],
    });
    if (addProduct.insertId) {
      message = "success";
    } else {
      message = "error";
    }
    let product = {
      product_id: addProduct.insertId,
      product_name: productName,
    };
    res.status(200).json({ response: { message: message, product: product } });
  }

  if (req.method === "PUT") {
    const productId = req.body.product_id;
    const productName = req.body.product_name;
    const updateProduct = await query({
      query: "UPDATE products SET product_name = ? WHERE product_id = ?",
      values: [productName, productId],
    });

    const result = updateProduct.affectedRows;
    if (result) {
      message = "success";
    } else {
      message = "error";
    }
    const product = {
      product_id: productId,
      product_name: productName,
    };
    res.status(200).json({ response: { message: message, product: product } });
  }
  if (req.method === "DELETE") {
    const productId = req.body.product_id;
    const deleteProduct = await query({
      query: "DELETE FROM products WHERE product_id = ?",
      values: [productId],
    });
    const result = deleteProduct.affectedRows;
    if (result) {
      message = "success";
    } else {
      message = "error";
    }
    res
      .status(200)
      .json({ response: { message: message, product_id: productId } });
  }
}
