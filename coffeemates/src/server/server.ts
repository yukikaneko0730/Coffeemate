import express from "express";
import placesRoutes from "./placesRoutes";

const app = express();

app.use("/api/places", placesRoutes);

// 他のルート…

app.listen(3001, () => {
  console.log("Server listening on 3001");
});
