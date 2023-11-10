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

  if (req.method === "PUT") {
    const newBike = req.body.newBike;
    const {
      bikeId,
      bikeName,
      bikeImg,
      bikeDetails,
      bikeInfo,
      bikeSize,
      bikePrices,
    } = newBike;
    const updateProduct = await query({
      query:
        "UPDATE rowery SET name = ?, img = ?, details = ?, info = ?, size = ?, prices = ? WHERE id = ?",
      values: [
        bikeName,
        bikeImg,
        bikeDetails,
        bikeInfo,
        bikeSize,
        bikePrices,
        bikeId,
      ],
    });

    const result = updateProduct.affectedRows;
    if (result) {
      message = "success";
    } else {
      message = "error";
    }
    let bike = {
      id: bikeId,
      name: bikeName,
      img: bikeImg,
      details: bikeDetails,
      info: bikeInfo,
      size: bikeSize,
      prices: bikePrices,
    };
    res.status(200).json({ response: { message: message, bike: bike } });
  }
  if (req.method === "DELETE") {
    const bikeId = req.body.id;
    const deleteBike = await query({
      query: "DELETE FROM rowery WHERE id = ?",
      values: [bikeId],
    });
    const result = deleteBike.affectedRows;
    if (result) {
      message = "success";
    } else {
      message = "error";
    }
    res.status(200).json({ response: { message: message, id: bikeId } });
  }
}
