import dotenv from "dotenv";
import ConnnectDb from "./db/config";
import app from "./app";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 3000;

ConnnectDb()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.info(`Your port is running at http://localhost:${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error(`Error is connecting Mongodb ${err}`);
  });
