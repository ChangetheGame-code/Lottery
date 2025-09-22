import React, { useState } from 'react';
import axios from 'axios';

export default function Shop() {
  const [cart, setCart] = useState([]);

  const checkout = async () => {
    try {
      const r = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/create-order`,
        { amount: 100, metadata: { items: cart.map(c => c.name) } }
      );
      const order = r.data;
      const options = {
        key: import.meta.env.VITE_RP_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Lottery Store",
        description: "Buy Lottery Ticket",
        order_id: order.id,
        handler: function (response) {
          alert("Payment Success: " + response.razorpay_payment_id);
        }
      };
      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    }
  };

  return (
    <div>
      <h1>Lottery Shop</h1>
      <button onClick={checkout}>Buy Ticket ₹100</button>
    </div>
  );
}
