import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./db";
import authRoutes from "./routes/authRoutes";
import pageRoutes from "./routes/pageRoutes";
import path from "path";

const app = express();

app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../src/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../src/views"));

app.use(authRoutes);
app.use(pageRoutes);

const PORT = Number(process.env.PORT || 4000);

async function main() {
  await connectDB(process.env.MONGODB_URI!);
  app.listen(PORT, "0.0.0.0", () => console.log(`✅ http://localhost:${PORT}`));
}

main().catch((err) => {
  console.error("❌ Startup error:", err);
  process.exit(1);
});