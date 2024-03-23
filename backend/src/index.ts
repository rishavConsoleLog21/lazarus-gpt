import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

const PORT = process.env.PORT || 3000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((error) => {
    console.error(error);
  });
