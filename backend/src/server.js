import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
import authRouter from "./routes/authRoutes.js";
import companyRouter from "./routes/companyRoutes.js";
import ItemRoutes from "./routes/BasicMasterRoutes/ItemRoutes.js";
import CustometRoutes from "./routes/BasicMasterRoutes/CustomerRoutes.js";
import EmployeeRoutes from "./routes/BasicMasterRoutes/EmployeeRoutes.js";

dotenv.config();
connectDB();

const app = express();
// swaggerDocs(app);
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/auth", authRouter);
app.use("/api/company", companyRouter);

// Basic Master
app.use("/api/master", ItemRoutes);
app.use("/api/master", CustometRoutes);
app.use("/api/master", EmployeeRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
