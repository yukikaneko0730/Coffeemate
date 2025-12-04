import express from "express";
import placesRoutes from "./placesRoutes";

const app = express();

app.use("/api/places", placesRoutes);

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
