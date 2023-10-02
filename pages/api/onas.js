import { query } from "../../lib/db";

export default async function handler(req, res) {
  let message;
  if (req.method === "GET") {
    const onas = await query({
      query: "SELECT info FROM onas WHERE id = 1",
      values: [],
    });

    res.status(200).json({ onas: onas });
  }
  if (req.method === "PUT") {
    const onasInfo = req.body.info;
    const updateProduct = await query({
      query: "UPDATE onas SET info = ? WHERE id = 1",
      values: [onasInfo],
    });

    const result = updateProduct.affectedRows;
    if (result) {
      message = "success";
    } else {
      message = "error";
    }
    const onas = {
      id: 1,
      info: onasInfo,
    };
    res.status(200).json({ response: { message: message, onas: onas } });
  }
}
