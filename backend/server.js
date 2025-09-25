import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Razorpay from 'razorpay';

const app = express();
app.use(bodyParser.json());

// CORS setup from env
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || '*',
  credentials: true
}));

// Razorpay setup
const razorpay = new Razorpay({
  key_id: process.env.RP_KEY_ID,
  key_secret: process.env.RP_KEY_SECRET,
});

app.get('/', (req,res)=>res.send('Backend Running'));

app.post('/api/create-order', async (req, res) => {
  try {
    const order = await razorpay.orders.create({
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: req.body.metadata || {}
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend running on port ${port}`));
