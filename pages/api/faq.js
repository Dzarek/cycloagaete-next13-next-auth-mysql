import { query } from "../../lib/db";

export default async function handler(req, res) {
  let message;
  if (req.method === "GET") {
    const faq = await query({
      query: "SELECT * FROM faq",
      values: [],
    });

    res.status(200).json({ faq: faq });
  }
  if (req.method === "POST") {
    const addFAQ = req.body.addFAQ;
    const { newTitle, newInfo } = addFAQ;
    const addProduct = await query({
      query: "INSERT INTO faq (title, info) VALUES (?, ?)",
      values: [newTitle, newInfo],
    });
    if (addProduct.insertId) {
      message = "success";
    } else {
      message = "error";
    }
    let newFAQ = {
      id: addProduct.insertId,
      title: newTitle,
      info: newInfo,
    };
    res.status(200).json({ response: { message: message, newFAQ: newFAQ } });
  }

  if (req.method === "PUT") {
    const addFAQ = req.body.addFAQ;
    const { newTitle, newInfo, faqId } = addFAQ;
    const updateProduct = await query({
      query: "UPDATE faq SET title = ?, info = ? WHERE id = ?",
      values: [newTitle, newInfo, faqId],
    });

    const result = updateProduct.affectedRows;
    if (result) {
      message = "success";
    } else {
      message = "error";
    }
    let newFAQ = {
      id: faqId,
      title: newTitle,
      info: newInfo,
    };
    res.status(200).json({ response: { message: message, newFAQ: newFAQ } });
  }
  if (req.method === "DELETE") {
    const faqId = req.body.id;
    const deleteBike = await query({
      query: "DELETE FROM faq WHERE id = ?",
      values: [faqId],
    });
    const result = deleteBike.affectedRows;
    if (result) {
      message = "success";
    } else {
      message = "error";
    }
    res.status(200).json({ response: { message: message, id: faqId } });
  }
}
