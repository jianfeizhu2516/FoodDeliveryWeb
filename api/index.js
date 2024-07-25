import express from 'express'
import productRoutes from "./routes/products.js"
import authRoutes from "./routes/auth.js"
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json())
 

app.use("/api/products", productRoutes);

app.use("/api/auth", authRoutes);


app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(8800, () => { 
  console.log('server at 8800');
});
