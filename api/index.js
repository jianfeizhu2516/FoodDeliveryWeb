import express from 'express'
import productRoutes from "./routes/products.js"
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json())
 

app.use("/api/products", productRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(8800, () => { 
  console.log('server at 8800');
});
