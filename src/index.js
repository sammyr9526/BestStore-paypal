import express from "express";
import morgan from "morgan";
import paymentRoutes from "./routes/payment.routes.js";
import { PORT } from "./config";
import path from "path";

const app = express();

app.use(morgan("dev"));

app.use(paymentRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.listen(process.env.PORT || PORT);
console.log("Server running on port ", process.env.PORT || PORT);
