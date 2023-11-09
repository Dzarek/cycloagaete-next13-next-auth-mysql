import { query } from "../../lib/db";

export default async function handler(req, res) {
  let message;
  if (req.method === "GET") {
    const rowery = await query({
      query: "SELECT * FROM rowery",
      values: [],
    });

    res.status(200).json({ rowery: rowery });
  }
  if (req.method === "POST") {
    const newBike = req.body.newBike;
    const { bikeName, bikeImg, bikeDetails, bikeInfo, bikeSize, bikePrices } =
      newBike;
    const addProduct = await query({
      query:
        "INSERT INTO rowery (name, img, details, info, size, prices) VALUES (?, ?, ?, ?, ?, ?)",
      values: [bikeName, bikeImg, bikeDetails, bikeInfo, bikeSize, bikePrices],
    });
    if (addProduct.insertId) {
      message = "success";
    } else {
      message = "error";
    }
    let bike = {
      id: addProduct.insertId,
      name: bikeName,
      img: bikeImg,
      details: bikeDetails,
      info: bikeInfo,
      size: bikeSize,
      prices: bikePrices,
    };
    res.status(200).json({ response: { message: message, bike: bike } });
  }

  // if (req.method === "PUT") {
  //   const productId = req.body.product_id;
  //   const productName = req.body.product_name;
  //   const updateProduct = await query({
  //     query: "UPDATE products SET product_name = ? WHERE product_id = ?",
  //     values: [productName, productId],
  //   });

  //   const result = updateProduct.affectedRows;
  //   if (result) {
  //     message = "success";
  //   } else {
  //     message = "error";
  //   }
  //   const product = {
  //     product_id: productId,
  //     product_name: productName,
  //   };
  //   res.status(200).json({ response: { message: message, product: product } });
  // }
  // if (req.method === "DELETE") {
  //   const productId = req.body.product_id;
  //   const deleteProduct = await query({
  //     query: "DELETE FROM products WHERE product_id = ?",
  //     values: [productId],
  //   });
  //   const result = deleteProduct.affectedRows;
  //   if (result) {
  //     message = "success";
  //   } else {
  //     message = "error";
  //   }
  //   res
  //     .status(200)
  //     .json({ response: { message: message, product_id: productId } });
  // }
}
