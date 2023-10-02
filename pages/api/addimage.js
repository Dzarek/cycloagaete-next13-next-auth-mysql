import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};
let pathName = "";
const readFile = (req, saveLocally) => {
  const options = {};
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/images/gallery");
    options.filename = (name, ext, path, form) => {
      pathName = Date.now().toString() + "_" + path.originalFilename;
      return pathName;
    };
  }

  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const handler = async (req, res) => {
  try {
    await fs.readdir(
      path.join(process.cwd() + "/public", "/images", "/gallery")
    );
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + "/public", "/images", "/gallery"));
  }
  await readFile(req, true);
  res.json({
    done: "ok",
    pathName: pathName,
  });
};

export default handler;
