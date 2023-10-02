import { query } from "../../lib/db";

export default async function handler(req, res) {
  let message;
  if (req.method === "GET") {
    const imagesMySql = await query({
      query: "SELECT * FROM galeria",
      values: [],
    });

    res.status(200).json({ imagesMySql: imagesMySql });
  }
  if (req.method === "DELETE") {
    const imageId = req.body.id;
    const deleteProduct = await query({
      query: "DELETE FROM galeria WHERE id = ?",
      values: [imageId],
    });
    const result = deleteProduct.affectedRows;
    if (result) {
      message = "success";
    } else {
      message = "error";
    }
    res.status(200).json({ response: { message: message, id: imageId } });
  }
  if (req.method === "POST") {
    const imageName = req.body.imagePath;
    const addProduct = await query({
      query: "INSERT INTO galeria (imagePath) VALUES (?)",
      values: [imageName],
    });
    if (addProduct.insertId) {
      message = "success";
    } else {
      message = "error";
    }
    let image = {
      id: addProduct.insertId,
      imagePath: imageName,
    };
    res.status(200).json({ response: { message: message, image: image } });
  }
}
