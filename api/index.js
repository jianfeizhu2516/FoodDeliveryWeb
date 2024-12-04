import express from 'express'
import productRoutes from "./routes/products.js"
import authRoutes from "./routes/auth.js"
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import Stripe from 'stripe';
dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});
app.use('/api/products', productRoutes);
app.use("/api/auth", authRoutes);


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
app.post('/api/create-checkout-session', async (req, res) => {
  const { items } = req.body;
  console.log('Items:', items); 
  const line_items = items.map(item => ({
    price: item.price,
    quantity: item.quantity,
  }));

  try{
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/successfulPayment`,
      cancel_url: `${process.env.FRONTEND_URL}/failedPayment`,
    });
    console.log('Session created:', session); // 输出创建的 session

    res.json({ url: session.url });
  }catch(err){
    console.log('Error creating checkout session:', err);
    res.status(500).send('Internal Server Error!');
  }
  
});



app.listen(8800, () => { 
  console.log('server at 8800');
});
